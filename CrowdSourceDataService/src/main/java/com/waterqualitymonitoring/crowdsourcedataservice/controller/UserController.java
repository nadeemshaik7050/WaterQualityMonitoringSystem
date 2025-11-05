package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.*;
import com.waterqualitymonitoring.crowdsourcedataservice.service.UserService;
import com.waterqualitymonitoring.crowdsourcedataservice.service.WaterQualityService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crowddata/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/create",consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createUser (@RequestBody UserRequestDto userRequestDto) throws CrowdDataSourceException {
         userService.createUser(userRequestDto);
    }

    @GetMapping("/get")
    public CrowdDataResponse<UserResponseDto> getUser(@RequestParam String citizenId) throws CrowdDataSourceException {
        return CrowdDataResponse.success(userService.getUser(citizenId));
    }

    @GetMapping("/allUsers")
    @PreAuthorize("hasRole('wqm-admin')")
    public CrowdDataResponse<List<UserResponseDto>> getAllUsers() throws CrowdDataSourceException {
        return CrowdDataResponse.success(userService.getAllUsers());
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('wqm-admin')")
    public CrowdDataResponse<Long> getUserCount() {
        return CrowdDataResponse.success(userService.getUserCount());
    }

    @PostMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('wqm-admin')")
    public void updateUser(@RequestBody UserRequestDto userRequestDto) throws CrowdDataSourceException {
        userService.updateUser(userRequestDto);
    }

    @GetMapping("/toggleActivate")
    @PreAuthorize("hasRole('wqm-admin')")
    public void toggleActivateUser(@RequestParam String citizenId) throws CrowdDataSourceException {
        userService.toggleActivateUser(citizenId);
    }

    @GetMapping("/rankings")
    public CrowdDataResponse<List<UserRankingDto>> getUserRankings() throws CrowdDataSourceException {
        return CrowdDataResponse.success(userService.getUserRankings());
    }

}
