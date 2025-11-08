package com.waterqualitymonitoring.crowdsourcedataservice.service.helper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.feignclient.RewardsFeignClient;
import com.waterqualitymonitoring.crowdsourcedataservice.mapper.WaterQualitySubmitMapper;
import com.waterqualitymonitoring.crowdsourcedataservice.model.*;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.WaterQualitySubmitLogRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.utility.WQMUtility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public WaterQualityDataResponseDto doSubmission(WaterQualityDataRequestDto waterQualityDataRequestDto) throws CrowdDataSourceException {
        WaterQualitySubmitLog waterQualitySubmitLog= WaterQualitySubmitMapper.INSTANCE.toSubmitLog(waterQualityDataRequestDto);
        String submissionId= WQMUtility.generateSubmissionID();
        waterQualitySubmitLog.setSubmissionId(submissionId);
        RewardRequestDto rewardRequestDto=createRewardRequestDto(waterQualityDataRequestDto,submissionId);
        ResponseEntity<RewardResponseDto> rewardResponse=callRewardService(rewardRequestDto);
        if (!rewardResponse.getStatusCode().is2xxSuccessful()){
            log.error("reward service call failed for submissionId: {}",submissionId);
            throw new CrowdDataSourceException(CrowdDataSourceError.REWARD_SERVICE_ERROR);
        }
        waterQualitySubmitLogRepository.save(waterQualitySubmitLog);
        return WaterQualityDataResponseDto.builder()
                .submissionId(submissionId)
                .receiptNumber("ABCDE")
                .build();
    }

    private RewardRequestDto createRewardRequestDto(WaterQualityDataRequestDto waterQualityDataRequestDto, String submissionId) {
        List<byte[]> binaries = null;
        if (waterQualityDataRequestDto.getBinaries() != null) {
            binaries = waterQualityDataRequestDto.getBinaries().stream()
                    .filter(Objects::nonNull)
                    .map(b -> b.getData())
                    .collect(Collectors.toList());
        }
        return RewardRequestDto.builder()
                .citizenId(waterQualityDataRequestDto.getCitizenId())
                .userName(waterQualityDataRequestDto.getUserName())
                .postalCode(waterQualityDataRequestDto.getPostalCode())
                .unit(waterQualityDataRequestDto.getUnit())
                .value(waterQualityDataRequestDto.getValue())
                .observations(waterQualityDataRequestDto.getObservations())
                .binaries(binaries)
                .build();
    }

    public ResponseEntity<RewardResponseDto> callRewardService(RewardRequestDto rewardRequestDto) throws CrowdDataSourceException {
        return rewardsFeignClient.callRewardService(rewardRequestDto);
    }

    public List<ReviewsResponseDto> getPreviousReviews(String citizenId) {
        List<WaterQualitySubmitLog> submitLogs=waterQualitySubmitLogRepository.findByCitizenId(citizenId);
        return submitLogs.stream()
                .map(WaterQualitySubmitMapper.INSTANCE::toReviewsResponseDto)
                .toList();
    }
}
