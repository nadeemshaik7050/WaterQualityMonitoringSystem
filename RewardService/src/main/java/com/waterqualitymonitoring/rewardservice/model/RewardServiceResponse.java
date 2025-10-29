package com.waterqualitymonitoring.rewardservice.model;

import com.waterqualitymonitoring.rewardservice.exception.RewardServiceError;
import lombok.Builder;
import lombok.Data;

import java.util.List;
@Data
@Builder
public class RewardServiceResponse<T> {
    private T result;
    private String errorMessage;
    private String errorCode;
    private List<String> fieldErrors;

    public static <T> RewardServiceResponse<T> success(T result) {
        return RewardServiceResponse.<T>builder()
                .result(result)
                .build();
    }

    public static <T> RewardServiceResponse<T> error(RewardServiceError rewardServiceError, List<String> fieldErrors) {
        return RewardServiceResponse.<T>builder()
                .errorMessage(rewardServiceError.getErrorMessage())
                .errorCode(rewardServiceError.getErrorCode())
                .fieldErrors(fieldErrors)
                .build();
    }

}
