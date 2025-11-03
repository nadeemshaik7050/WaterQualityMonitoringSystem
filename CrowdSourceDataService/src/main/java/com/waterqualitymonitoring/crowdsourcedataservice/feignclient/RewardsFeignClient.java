package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "RewardsFeignClient", url = "${reward.service-base-url}", fallback = RewardsFeignClientFallback.class,configuration = FeignErrorDecoderConfig.class)
public interface RewardsFeignClient {

    @PostMapping("/addReward")
    ResponseEntity<RewardResponseDto> callRewardService(RewardRequestDto rewardRequestDto) throws CrowdDataSourceException;

}