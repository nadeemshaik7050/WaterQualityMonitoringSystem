package com.waterqualitymonitoring.crowdsourcedataservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum CrowdDataSourceError {
    FIELD_ERRORS("CDS001","Field errors"),
    SERVICE_INTERNAL_ERROR("CDS002","Crowd data source service internal error"),
    INVALID_REQUEST("CDS003","Invalid request");

    private final String errorCode;
    private final String errorMessage;
}
