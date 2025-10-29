package com.waterqualitymonitoring.crowdsourcedataservice.service.helper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.mapper.UserMapper;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class UserServiceHelper {

    private final UserRepository userRepository;
    private final UserMapper userMapper= UserMapper.INSTANCE;

    public UserServiceHelper(UserRepository userRepository) {
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

    public void createUser(UserRequestDto userRequestDto) {
        // Implementation for creating a user in the database
        log.info("Creating user with username: {}", userRequestDto.getUserName());
        User user = userMapper.toEntity(userRequestDto);
        userRepository.save(user);
    }
}
