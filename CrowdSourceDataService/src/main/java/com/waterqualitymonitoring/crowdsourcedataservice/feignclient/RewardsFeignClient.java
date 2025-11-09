package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.RewardResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "reward-service",url = "${api-gateway.url}", fallback = RewardsFeignClientFallback.class,configuration = {FeignErrorDecoderConfig.class,FeignAuthConfig.class})
public interface RewardsFeignClient {

    @PostMapping("/rewards/addReward")
    ResponseEntity<RewardResponseDto> callRewardService(@RequestBody RewardRequestDto rewardRequestDto);

}