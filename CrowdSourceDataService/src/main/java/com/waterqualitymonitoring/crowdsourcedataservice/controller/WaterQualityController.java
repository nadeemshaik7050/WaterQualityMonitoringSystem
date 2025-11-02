package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.CrowdDataResponse;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.service.WaterQualityService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crowddata/waterquality")
public class WaterQualityController {

    private final WaterQualityService waterQualityService;

    public WaterQualityController(WaterQualityService waterQualityService) {
        this.waterQualityService = waterQualityService;
    }

    @PostMapping(value = "/submit",consumes = MediaType.APPLICATION_JSON_VALUE)
    public CrowdDataResponse<WaterQualityDataResponseDto> submitWaterQualityData (@RequestBody WaterQualityDataRequestDto waterQualityDataRequestDto) throws CrowdDataSourceException {
        return CrowdDataResponse.success(waterQualityService.doSubmission(waterQualityDataRequestDto));
    }
}
