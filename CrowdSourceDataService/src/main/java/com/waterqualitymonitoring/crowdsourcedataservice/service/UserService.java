package com.waterqualitymonitoring.crowdsourcedataservice.service;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRankingDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.service.helper.UserServiceHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserServiceHelper userServiceHelper;

    public UserService(UserServiceHelper userServiceHelper) {
        this.userServiceHelper = userServiceHelper;
    }

    public void createUser(UserRequestDto userRequestDto) throws CrowdDataSourceException {
        userServiceHelper.validateCreateUserRequest(userRequestDto);
        userServiceHelper.createUser(userRequestDto);
    }


    public UserResponseDto getUser(String citizenId) throws CrowdDataSourceException {
        return userServiceHelper.getUser(citizenId);
    }

    public List<UserResponseDto> getAllUsers() {
        return userServiceHelper.getAllUsers();
    }

    public Long getUserCount() {
        return userServiceHelper.getUserCount();
    }

    public void updateUser(UserRequestDto userRequestDto) throws CrowdDataSourceException {
        userServiceHelper.updateUser(userRequestDto);
    }

    public void toggleActivateUser(String citizenId) throws CrowdDataSourceException {
        userServiceHelper.toggleActivateUser(citizenId);
    }

    public List<UserRankingDto> getUserRankings() throws CrowdDataSourceException {
        return userServiceHelper.getUserRankings();
    }
}
