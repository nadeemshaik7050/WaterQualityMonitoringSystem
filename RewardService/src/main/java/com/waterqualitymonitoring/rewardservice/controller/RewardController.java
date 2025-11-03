package com.waterqualitymonitoring.rewardservice.controller;

import com.waterqualitymonitoring.rewardservice.exception.RewardException;
import com.waterqualitymonitoring.rewardservice.model.RewardRequestDto;
import com.waterqualitymonitoring.rewardservice.model.RewardResponseDto;
import com.waterqualitymonitoring.rewardservice.service.RewardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rewards")
public class RewardController {

    private final RewardService rewardService;
    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }
    @PostMapping("/addReward")
    public ResponseEntity<RewardResponseDto> addReward(RewardRequestDto rewardRequestDto) throws RewardException {
        return ResponseEntity.status(HttpStatus.OK).body(rewardService.rewardsCalculation(rewardRequestDto));
    }
}
