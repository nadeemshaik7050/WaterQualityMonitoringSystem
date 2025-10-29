package com.waterqualitymonitoring.rewardservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rewards")
public class RewardController {
    @GetMapping("/getReward")
    public ResponseEntity<String> getReward() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Reward Service is currently unavailable. Please try again later.");
    }
}
