package com.waterqualitymonitoring.crowdsourcedataservice.service;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.service.helper.UserServiceHelper;
import org.springframework.stereotype.Service;

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
}
