package com.waterqualitymonitoring.crowdsourcedataservice.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserRankingDto {
    private String userName;
    private Long totalPoints;
    private Long numberOfReviewsGiven;
}
