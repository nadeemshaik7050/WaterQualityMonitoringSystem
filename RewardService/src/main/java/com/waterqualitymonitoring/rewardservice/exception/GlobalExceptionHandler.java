package com.waterqualitymonitoring.rewardservice.exception;

import com.waterqualitymonitoring.rewardservice.model.RewardServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    public ResponseEntity<RewardServiceResponse<Object>> handleRatingException(RatingException ex) {
        log.info("CrowdDataSourceException",ex);
        RewardServiceResponse<Object> rewardServiceResponse=RewardServiceResponse.builder()
                .errorMessage(ex.getErrorMessage())
                .errorCode(ex.getErrorCode())
                .fieldErrors(ex.getFieldErrors())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rewardServiceResponse);
    }
}
