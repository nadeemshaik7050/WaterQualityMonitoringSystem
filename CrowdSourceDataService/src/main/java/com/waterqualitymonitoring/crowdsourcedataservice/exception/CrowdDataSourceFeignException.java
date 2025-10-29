package com.waterqualitymonitoring.crowdsourcedataservice.exception;

import lombok.Data;

@Data
public class CrowdDataSourceFeignException extends Exception{
    private final String errorMessage;
    private final String errorCode;

    public CrowdDataSourceFeignException(String errorMessage, String errorCode) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }

    public CrowdDataSourceFeignException(CrowdDataSourceError crowdDataSourceError) {
        super(crowdDataSourceError.getErrorMessage());
        this.errorMessage = crowdDataSourceError.getErrorMessage();
        this.errorCode = crowdDataSourceError.getErrorCode();
    }
}
