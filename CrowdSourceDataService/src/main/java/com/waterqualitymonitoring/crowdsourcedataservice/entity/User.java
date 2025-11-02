package com.waterqualitymonitoring.crowdsourcedataservice.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@Document("user")
public class User extends AbstractEntity {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    @Field("userName")
    private String userName;
    private String password;
    private LocalDate joinedDate;
    private boolean isActive;
    private String gender;
}
