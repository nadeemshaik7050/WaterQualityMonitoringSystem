package com.waterqualitymonitoring.rewardservice.exception;

import lombok.Data;

import java.util.List;

@Data
public class RatingException extends Exception{
    private final String errorMessage;
    private final String errorCode;
    private final List<String> fieldErrors;

    public RatingException(String errorCode, String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.fieldErrors = null;
    }

    public RatingException(RewardServiceError error,List<String> fieldErrors) {
        super(error.getErrorMessage());
        this.errorMessage = error.getErrorMessage();
        this.errorCode = error.getErrorCode();
        this.fieldErrors = fieldErrors;
    }

    public RatingException(RewardServiceError error) {
        super(error.getErrorMessage());
        this.errorMessage = error.getErrorMessage();
        this.errorCode = error.getErrorCode();
        this.fieldErrors = null;
    }
}
