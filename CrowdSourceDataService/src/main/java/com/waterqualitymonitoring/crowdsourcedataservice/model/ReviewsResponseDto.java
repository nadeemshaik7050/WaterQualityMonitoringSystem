package com.waterqualitymonitoring.crowdsourcedataservice.model;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualityData;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ReviewsResponseDto {
    private String citizenId;
    private String submissionId;
    private Long pointsAwarded;
    private LocalDate reviewDate;
    private WaterQualityData waterQualityData;
}
