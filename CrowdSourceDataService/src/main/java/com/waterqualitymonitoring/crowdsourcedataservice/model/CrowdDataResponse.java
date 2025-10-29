package com.waterqualitymonitoring.crowdsourcedataservice.model;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CrowdDataResponse<T> {
    private T result;
    private String errorMessage;
    private String errorCode;
    private List<String> fieldErrors;

    public static <T> CrowdDataResponse<T> success(T result) {
        return CrowdDataResponse.<T>builder()
                .result(result)
                .build();
    }

    public static <T> CrowdDataResponse<T> error(CrowdDataSourceError crowdDataSourceError, List<String> fieldErrors) {
        return CrowdDataResponse.<T>builder()
                .errorMessage(crowdDataSourceError.getErrorMessage())
                .errorCode(crowdDataSourceError.getErrorCode())
                .fieldErrors(fieldErrors)
                .build();
    }
}
