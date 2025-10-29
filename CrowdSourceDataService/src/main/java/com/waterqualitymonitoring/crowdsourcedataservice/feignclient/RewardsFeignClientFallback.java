package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import org.springframework.stereotype.Component;

@Component
public class RewardsFeignClientFallback implements  RewardsFeignClient{
    @Override
    public String callRewardService() {
        return "Failed to connect to Reward Service";
    }
}
