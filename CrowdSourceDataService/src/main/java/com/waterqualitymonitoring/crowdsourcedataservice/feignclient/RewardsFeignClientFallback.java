package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class RewardsFeignClientFallback implements  RewardsFeignClient{
    @Override
    public ResponseEntity<RewardResponseDto> callRewardService(RewardRequestDto rewardRequestDto){
        return ResponseEntity.status(500)
                .body(RewardResponseDto.builder()
                        .message("Reward Service is currently unavailable Or Encountered Some error. Please try again later.")
                        .status("FAILED")
                        .currentPoints(0L)
                        .build());
    }
}
