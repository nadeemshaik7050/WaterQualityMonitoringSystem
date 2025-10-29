package com.waterqualitymonitoring.crowdsourcedataservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class WaterQualityDataResponseDto {
    //Unique receipt number for Submission
    private String receiptNumber;
    //Unique identifier of Submission
    private String submissionId;
    //failure message, if any
    private String message;
}
