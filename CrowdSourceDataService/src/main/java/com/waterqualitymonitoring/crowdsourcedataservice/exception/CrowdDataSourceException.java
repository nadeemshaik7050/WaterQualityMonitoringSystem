package com.waterqualitymonitoring.crowdsourcedataservice.exception;


import lombok.Data;
import org.springframework.validation.FieldError;


import java.util.List;

@Data
public class CrowdDataSourceException extends Exception{

    private final String errorMessage;
    private final String errorCode;
    private final List<String> fieldErrors;

    public CrowdDataSourceException(String errorMessage, String errorCode, List<String> fieldErrors) {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.fieldErrors = fieldErrors;
    }
    public CrowdDataSourceException(CrowdDataSourceError crowdDataSourceError, List<String> fieldErrors) {
        super(crowdDataSourceError.getErrorMessage());
        this.errorMessage = crowdDataSourceError.getErrorMessage();
        this.errorCode = crowdDataSourceError.getErrorCode();
        this.fieldErrors = fieldErrors;
    }

}
