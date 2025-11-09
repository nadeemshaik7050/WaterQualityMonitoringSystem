package com.waterqualitymonitoring.crowdsourcedataservice.entity;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@Document("water_quality_data_submit_log")
public class WaterQualitySubmitLog extends AbstractEntity implements Serializable {
    private String waterQualityDataId;
    private String userName;
    private String citizenId;
    private Long rewardsPointGiven;
    private Long totalRewardsPoint;
    private String status;
    private LocalDate submissionDate;
    private String submissionId;
}
