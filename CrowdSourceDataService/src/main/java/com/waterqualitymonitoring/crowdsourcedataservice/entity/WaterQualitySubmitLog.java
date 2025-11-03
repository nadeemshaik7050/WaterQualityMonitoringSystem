package com.waterqualitymonitoring.crowdsourcedataservice.entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class WaterQualitySubmitLog extends AbstractEntity implements Serializable {
    private WaterQualityData waterQualityData;
    private String userName;
    private String citizenId;
    private Long rewardsPointGiven;
    private Long totalRewardsPoint;
    private String status;
    private LocalDateTime submitTime;
    private Long currentRank;
    private String submissionId;
}
