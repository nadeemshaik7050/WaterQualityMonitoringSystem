package com.waterqualitymonitoring.crowdsourcedataservice.utility;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SubmissionIdUtility {
    public static String generateSubmissionID(){
        return UUID.randomUUID().toString();
    }
}
