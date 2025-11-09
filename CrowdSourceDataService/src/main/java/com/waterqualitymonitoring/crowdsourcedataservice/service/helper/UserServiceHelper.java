package com.waterqualitymonitoring.crowdsourcedataservice.service.helper;

import com.waterqualitymonitoring.crowdsourcedataservice.config.KeycloakProperties;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.mapper.UserMapper;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRankingDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.UserRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.utility.WQMUtility;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
@Slf4j
public class UserServiceHelper {

    private final UserRepository userRepository;
    private final Keycloak keycloak;
    private final KeycloakProperties keycloakProperties;
    private final UserMapper userMapper= UserMapper.INSTANCE;

    public UserServiceHelper(UserRepository userRepository,Keycloak keycloak,KeycloakProperties keycloakProperties) {
        this.keycloak=keycloak;
        this.keycloakProperties=keycloakProperties;
        this.userRepository = userRepository;
    }
    
    public void validateCreateUserRequest(UserRequestDto userRequestDto) throws CrowdDataSourceException {
        List<String> missingFields = new ArrayList<>();

        if(userRequestDto.getEmail() == null || userRequestDto.getEmail().isEmpty()) {
            missingFields.add("email");
        }
        if(userRequestDto.getUserName()==null){
            missingFields.add("username");
        }
        if(userRequestDto.getPassword()==null){
            missingFields.add("password");
        }

        if (!missingFields.isEmpty()) {
            throw new CrowdDataSourceException(CrowdDataSourceError.FIELD_ERRORS,missingFields);
        }
    }

    public void createUser(UserRequestDto userRequestDto) throws CrowdDataSourceException {
        // Implementation for creating a user in the database
        log.info("Creating user with username: {}", userRequestDto.getUserName());

        userRequestDto.setCitizenId(createUserinKeycloak(userRequestDto));
        userRequestDto.setJoinedDate(LocalDate.now());
        userRequestDto.setPassword(WQMUtility.encryptPassword(userRequestDto.getPassword()));

        User user = userMapper.toEntity(userRequestDto);
        user.setPoints(0L);
        user.setNumberOfReviewsGiven(0L);

        userRepository.save(user);
    }

    private String createUserinKeycloak(UserRequestDto userRequestDto) throws CrowdDataSourceException {
        List<UserRepresentation> existingUsers = keycloak.realm(keycloakProperties.realm())
                .users()
                .search(userRequestDto.getUserName());
        if (!existingUsers.isEmpty()) {
            return existingUsers.get(0).getId();
        }
        UserRepresentation user = new UserRepresentation();
        user.setUsername(userRequestDto.getUserName());
        user.setEmail(userRequestDto.getEmail());
        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setEnabled(true);
        Response response = keycloak.realm(keycloakProperties.realm())
                .users()
                .create(user);
        if (response.getStatus()>=300) {
            log.error("Failed to create user in Keycloak: {}", response.getStatusInfo());
            throw new CrowdDataSourceException(CrowdDataSourceError.FAILED_TO_CREATE_USER_IN_KEYCLOAK);
        }

        String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
        if(userRequestDto.getPassword()!=null) {
            CredentialRepresentation credential = new CredentialRepresentation();
            credential.setType(CredentialRepresentation.PASSWORD);
            credential.setValue(userRequestDto.getPassword());
            credential.setTemporary(false);
            keycloak.realm(keycloakProperties.realm())
                    .users()
                    .get(userId)
                    .resetPassword(credential);
        }
        if(userRequestDto.getRole()!=null) {
            keycloak.realm(keycloakProperties.realm())
                    .users()
                    .get(userId)
                    .roles()
                    .realmLevel()
                    .add(List.of(keycloak.realm(keycloakProperties.realm())
                            .roles()
                            .get(userRequestDto.getRole())
                            .toRepresentation()));
        }
        return userId;
    }

    public UserResponseDto getUser(String citizenId) throws CrowdDataSourceException {
        User user = userRepository.findByCitizenIdAndIsActiveTrue(citizenId);
        if (user == null) {
           throw new CrowdDataSourceException(CrowdDataSourceError.USER_NOT_FOUND);
        }
        return userMapper.toDto(user);
    }

    public List<UserResponseDto> getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        List<UserResponseDto> userResponseDtos = new ArrayList<>();
        for (User user : users) {
            userResponseDtos.add(userMapper.toDto(user));
        }
        return userResponseDtos;
    }

    public Long getUserCount() {
        return userRepository.countByIsActiveTrue();
    }

    public void updateUser(UserRequestDto userRequestDto) throws CrowdDataSourceException {
        User existingUser = userRepository.findByUserNameAndIsActiveTrue(userRequestDto.getUserName());
        if (existingUser != null) {
            existingUser.setFirstName(userRequestDto.getFirstName());
            existingUser.setLastName(userRequestDto.getLastName());
            existingUser.setGender(userRequestDto.getGender());
            updateUserInKeycloak(existingUser, userRequestDto);
            userRepository.save(existingUser);
            return;
        }
        throw new CrowdDataSourceException(CrowdDataSourceError.USER_NOT_FOUND);
    }

    public void toggleActivateUser(String citizenId) throws CrowdDataSourceException {
        User user = userRepository.findByCitizenId(citizenId);
        if (user != null) {
            user.setActive(!user.isActive());
            toggleActivateUser(user);
            userRepository.save(user);
            return;
        }
        throw new CrowdDataSourceException(CrowdDataSourceError.USER_NOT_FOUND);
    }

    public void toggleActivateUser(User user) throws CrowdDataSourceException {
        // Sync with Keycloak
        if (user.getCitizenId() != null && !user.getCitizenId().isEmpty()) {
            try {
                var usersResource = keycloak.realm(keycloakProperties.realm()).users();
                var kcUserResource = usersResource.get(user.getCitizenId());
                UserRepresentation rep = kcUserResource.toRepresentation();
                rep.setEnabled(user.isActive());
                kcUserResource.update(rep);
            } catch (Exception e) {
                log.warn("Failed to update Keycloak enabled flag for user {}: {}", e.getMessage());
                throw new CrowdDataSourceException(CrowdDataSourceError.KEYCLOAK_EXTERNAL_SERVICE_ERROR );
            }
        }
    }

    private void updateUserInKeycloak(User user, UserRequestDto userRequestDto) throws CrowdDataSourceException {
        if (user.getCitizenId() == null || user.getCitizenId().isEmpty()) {
            return;
        }
        try {
            var usersResource = keycloak.realm(keycloakProperties.realm()).users();
            var kcUserResource = usersResource.get(user.getCitizenId());
            UserRepresentation rep = kcUserResource.toRepresentation();

            boolean changed = false;
            if (userRequestDto.getFirstName() != null && !userRequestDto.getFirstName().equals(rep.getFirstName())) {
                rep.setFirstName(userRequestDto.getFirstName());
                changed = true;
            }
            if (userRequestDto.getLastName() != null && !userRequestDto.getLastName().equals(rep.getLastName())) {
                rep.setLastName(userRequestDto.getLastName());
                changed = true;
            }
            if (userRequestDto.getEmail() != null && !userRequestDto.getEmail().equals(rep.getEmail())) {
                rep.setEmail(userRequestDto.getEmail());
                changed = true;
            }
            if (changed) {
                kcUserResource.update(rep);
            }

        } catch (Exception e) {
            log.warn("Failed to update Keycloak user {}: {}", user.getCitizenId(), e.getMessage());
            throw new CrowdDataSourceException(CrowdDataSourceError.KEYCLOAK_EXTERNAL_SERVICE_ERROR);
        }
    }

    public List<UserRankingDto> getUserRankings() throws CrowdDataSourceException {
        // Fetch active users sorted by points desc, then reviewCount desc
        List<User> users = userRepository.findAllByIsActiveTrue(
                Sort.by(Sort.Order.desc("points"), Sort.Order.desc("reviewCount"))
        );
        return (List<UserRankingDto>) users.stream().map(user-> UserMapper.INSTANCE.toRankingDto(user)).toList();
    }

}
