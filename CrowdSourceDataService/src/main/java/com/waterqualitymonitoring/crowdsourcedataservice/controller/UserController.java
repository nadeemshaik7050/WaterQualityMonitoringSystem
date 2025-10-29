package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.*;
import com.waterqualitymonitoring.crowdsourcedataservice.service.UserService;
import com.waterqualitymonitoring.crowdsourcedataservice.service.WaterQualityService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crowdsource/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping(value = "/create",consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createUser (@RequestBody UserRequestDto userRequestDto) throws CrowdDataSourceException {
         userService.createUser(userRequestDto);
    }
}
