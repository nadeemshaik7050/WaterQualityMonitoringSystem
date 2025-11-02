package com.waterqualitymonitoring.crowdsourcedataservice.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserResponseDto {
    private String userId;
    private String userName;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private LocalDate joinedDate;
}
