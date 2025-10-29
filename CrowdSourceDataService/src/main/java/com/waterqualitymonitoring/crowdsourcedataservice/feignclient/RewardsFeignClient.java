package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClientProperties;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "RewardsFeignClient", url = "${reward.service-base-url}", fallback = RewardsFeignClientFallback.class,configuration = FeignErrorDecoderConfig.class)
public interface RewardsFeignClient {

    @GetMapping("/getReward")
    String callRewardService();
}