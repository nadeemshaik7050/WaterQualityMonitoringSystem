package com.waterqualitymonitoring.crowdsourcedataservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum CrowdDataSourceError {
    FIELD_ERRORS("CDS001","Field errors"),
    SERVICE_INTERNAL_ERROR("CDS002","Crowd data source service internal error"),
    INVALID_REQUEST("CDS003","Invalid request"),
    FAILED_TO_CREATE_USER_IN_KEYCLOAK("CDS005","Failed to create user in Keycloak"),
    REWARD_SERVICE_ERROR("CDS006","Reward service error"),
    USER_NOT_FOUND("CDS004","User not found");

    private final String errorCode;
    private final String errorMessage;
}
