package com.waterqualitymonitoring.crowdsourcedataservice.service.helper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualityData;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.feignclient.RewardsFeignClient;
import com.waterqualitymonitoring.crowdsourcedataservice.mapper.WaterQualitySubmitMapper;
import com.waterqualitymonitoring.crowdsourcedataservice.model.*;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.WaterQualityDataRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.WaterQualitySubmitLogRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.utility.WQMUtility;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class WaterQualityServiceHelper {

    private final WaterQualityDataRepository waterQualityDataRepository;
    private final WaterQualitySubmitLogRepository waterQualitySubmitLogRepository;
    private final RewardsFeignClient rewardsFeignClient;


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
        WaterQualityData waterQualityData= WaterQualitySubmitMapper.INSTANCE.toWaterQualityData(waterQualityDataRequestDto);
        String waterQualityDataId = waterQualityDataRepository.save(waterQualityData).getId();
        String submissionId= WQMUtility.generateSubmissionID();

        WaterQualitySubmitLog waterQualitySubmitLog= WaterQualitySubmitMapper.INSTANCE.toSubmitLog(waterQualityDataRequestDto);

        waterQualitySubmitLog.setWaterQualityDataId(waterQualityDataId);
        waterQualitySubmitLog.setSubmissionId(submissionId);
        waterQualitySubmitLog.setSubmissionDate(LocalDate.now());

        RewardRequestDto rewardRequestDto=createRewardRequestDto(waterQualityDataRequestDto,submissionId);
        ResponseEntity<RewardResponseDto> rewardResponse=callRewardService(rewardRequestDto);
        if (!rewardResponse.getStatusCode().is2xxSuccessful()){
            log.error("reward service call failed for submissionId: {}",submissionId);
            throw new CrowdDataSourceException(CrowdDataSourceError.REWARD_SERVICE_ERROR);
        }

        RewardResponseDto rewardResponseDto=rewardResponse.getBody();

        waterQualitySubmitLog.setStatus(rewardResponseDto.getStatus());
        waterQualitySubmitLog.setRewardsPointGiven(rewardResponseDto.getCurrentPoints());
        waterQualitySubmitLog.setTotalRewardsPoint(rewardResponseDto.getTotalPoints());

        waterQualitySubmitLogRepository.save(waterQualitySubmitLog);
        return WaterQualityDataResponseDto.builder()
                .submissionId(submissionId)
                .message(rewardResponseDto.getMessage())
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
        List<ReviewsResponseDto> reviewsResponseDtos=new ArrayList<>();
        for (WaterQualitySubmitLog log : submitLogs) {
            WaterQualityData waterQualityData = waterQualityDataRepository.findById(log.getWaterQualityDataId()).orElse(null);
            if (waterQualityData != null) {
                ReviewsResponseDto reviewsResponseDto = ReviewsResponseDto.builder()
                        .waterQualityData(waterQualityData)
                        .reviewDate(log.getSubmissionDate())
                        .pointsAwarded(log.getRewardsPointGiven())
                        .submissionId(log.getSubmissionId())
                        .citizenId(log.getCitizenId())
                        .build();
                reviewsResponseDtos.add(reviewsResponseDto);
            }
        }
        return reviewsResponseDtos;
    }
}
