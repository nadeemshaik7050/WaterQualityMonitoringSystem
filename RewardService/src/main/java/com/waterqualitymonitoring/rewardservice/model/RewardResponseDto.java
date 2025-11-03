package com.waterqualitymonitoring.rewardservice.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RewardResponseDto {
    private Long pointsEarned;
    private Long totalPoints;
    private String badge;
    private String status;
    private String message;
}
