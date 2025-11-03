package com.waterqualitymonitoring.crowdsourcedataservice.utility;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.UUID;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class WQMUtility {
    public static String generateSubmissionID(){
        return UUID.randomUUID().toString();
    }


    public static String encryptPassword(String password) {
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("password must not be null or blank");
        }
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }
}
