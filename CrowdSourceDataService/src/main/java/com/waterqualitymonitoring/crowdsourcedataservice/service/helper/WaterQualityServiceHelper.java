package com.waterqualitymonitoring.crowdsourcedataservice.service.helper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.feignclient.RewardsFeignClient;
import com.waterqualitymonitoring.crowdsourcedataservice.mapper.WaterQualitySubmitMapper;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.WaterQualitySubmitLogRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.utility.SubmissionIdUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class WaterQualityServiceHelper {

    private final WaterQualitySubmitLogRepository waterQualitySubmitLogRepository;
    private final RewardsFeignClient rewardsFeignClient;

    public WaterQualityServiceHelper(WaterQualitySubmitLogRepository waterQualitySubmitLogRepository, RewardsFeignClient rewardsFeignClient) {
        this.waterQualitySubmitLogRepository = waterQualitySubmitLogRepository;
        this.rewardsFeignClient = rewardsFeignClient;
    }

    public void validateRequest(WaterQualityDataRequestDto waterQualityDataRequestDto) throws CrowdDataSourceException {
        List<String> missingFields = new ArrayList<>();

        if(waterQualityDataRequestDto.getPostalCode() == null || waterQualityDataRequestDto.getPostalCode().isEmpty()) {
            missingFields.add("postalCode");
        }
        if(waterQualityDataRequestDto.getUnit()==null){
            missingFields.add("units");
        }
        if(waterQualityDataRequestDto.getObservations()==null){
            missingFields.add("observations");
        }
        if(waterQualityDataRequestDto.getValue()==null){
            missingFields.add("value");
        }
        if (!missingFields.isEmpty()) {
            throw new CrowdDataSourceException(CrowdDataSourceError.FIELD_ERRORS,missingFields);
        }
    }

    public WaterQualityDataResponseDto doSubmission(WaterQualityDataRequestDto waterQualityDataRequestDto) {
        WaterQualitySubmitLog waterQualitySubmitLog= WaterQualitySubmitMapper.INSTANCE.toSubmitLog(waterQualityDataRequestDto);
        String setSubmissionId= SubmissionIdUtility.generateSubmissionID();
        waterQualitySubmitLog.setSubmissionId(setSubmissionId);
        String rewardResponse=callExternalService();
        waterQualitySubmitLogRepository.save(waterQualitySubmitLog);
        return WaterQualityDataResponseDto.builder()
                .submissionId(setSubmissionId)
                .message(rewardResponse)
                .receiptNumber("ABCDE")
                .build();
    }

    public String callExternalService(){
        return rewardsFeignClient.callRewardService();
    }
}
