package com.waterqualitymonitoring.rewardservice.exception;

import com.waterqualitymonitoring.rewardservice.model.RewardServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RatingException.class)
    public ResponseEntity<RewardServiceResponse<Object>> handleRatingException(RatingException ex) {
        log.info("RatingException",ex);
        RewardServiceResponse<Object> rewardServiceResponse=RewardServiceResponse.builder()
                .errorMessage(ex.getErrorMessage())
                .errorCode(ex.getErrorCode())
                .fieldErrors(ex.getFieldErrors())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rewardServiceResponse);
    }
}
