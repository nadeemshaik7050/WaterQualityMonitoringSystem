package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardResponseDto;
import org.springframework.stereotype.Component;

@Component
public class RewardsFeignClientFallback implements  RewardsFeignClient{
    @Override
    public RewardResponseDto callRewardService(RewardRequestDto rewardRequestDto) throws CrowdDataSourceException {
        return RewardResponseDto.builder().build();
    }
}
