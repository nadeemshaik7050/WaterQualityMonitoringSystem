package com.waterqualitymonitoring.crowdsourcedataservice.exception;

import com.waterqualitymonitoring.crowdsourcedataservice.model.CrowdDataResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(CrowdDataSourceException.class)
    public ResponseEntity<CrowdDataResponse<Object>> handleException(CrowdDataSourceException ex) {
        log.info("CrowdDataSourceException",ex);
        CrowdDataResponse<Object> crowdDataResponse=CrowdDataResponse.builder()
                .errorMessage(ex.getErrorMessage())
                .errorCode(ex.getErrorCode())
                .fieldErrors(ex.getFieldErrors())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(crowdDataResponse);
    }
    @ExceptionHandler(CrowdDataSourceFeignException.class)
    public ResponseEntity<CrowdDataResponse<Object>> handleFeignException(CrowdDataSourceFeignException ex) {
        log.info("CrowdDataSourceFeignException",ex);
        CrowdDataResponse<Object> crowdDataResponse=CrowdDataResponse.builder()
                .errorMessage(ex.getErrorMessage())
                .errorCode(ex.getErrorCode())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(crowdDataResponse);
    }
}
