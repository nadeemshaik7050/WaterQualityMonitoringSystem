package com.waterqualitymonitoring.crowdsourcedataservice.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private String password;
    private LocalDate joinedDate;
}
