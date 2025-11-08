package com.waterqualitymonitoring.rewardservice.service;

import com.waterqualitymonitoring.rewardservice.exception.RewardException;
import com.waterqualitymonitoring.rewardservice.model.RewardRequestDto;
import com.waterqualitymonitoring.rewardservice.model.RewardResponseDto;
import com.waterqualitymonitoring.rewardservice.service.helper.RewardServiceHelper;
import org.springframework.stereotype.Service;

@Service
public class RewardService {

    public final RewardServiceHelper rewardServiceHelper;

    public RewardService(RewardServiceHelper rewardServiceHelper) {
        this.rewardServiceHelper = rewardServiceHelper;
    }

    public RewardResponseDto rewardsCalculation(RewardRequestDto rewardRequestDto){
        Long points = rewardServiceHelper.calculatePoints(rewardRequestDto);
        try {
            return rewardServiceHelper.addPointsAndBadgetoUser(points,rewardRequestDto);
        } catch (RewardException e) {
            throw new RuntimeException(e);
        }
    }
}
