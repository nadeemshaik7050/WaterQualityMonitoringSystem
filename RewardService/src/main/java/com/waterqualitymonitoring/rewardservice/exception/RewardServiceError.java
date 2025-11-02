package com.waterqualitymonitoring.rewardservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RewardServiceError {
    INVALID_RATING("R001", "The provided rating is invalid."),
    FIELD_ERRORS("R002", "There are field errors in the request or missing some fields."),
    RATING_NOT_FOUND("R003", "The requested rating was not found."),
    IO_EXCEPTION("R004", "An I/O error occurred while processing the request.");
    private final String errorCode;
    private final String errorMessage;
}
