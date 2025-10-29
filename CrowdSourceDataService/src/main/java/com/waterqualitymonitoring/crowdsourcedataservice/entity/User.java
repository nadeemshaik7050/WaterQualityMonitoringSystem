package com.waterqualitymonitoring.crowdsourcedataservice.entity;

import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder(toBuilder = true)
public class User extends AbstractEntity {
    private String firstName;
    private String lastName;
    private String email;
    private String userId;
    private String role;
    private String userName;
    private String password;
    private LocalDate joinedDate;
    private boolean isActive;
}
