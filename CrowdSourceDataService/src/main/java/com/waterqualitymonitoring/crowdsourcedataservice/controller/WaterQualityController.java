package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.CrowdDataResponse;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.service.WaterQualityService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/crowddata/waterquality")
public class WaterQualityController {

    private final WaterQualityService waterQualityService;

    public WaterQualityController(WaterQualityService waterQualityService) {
        this.waterQualityService = waterQualityService;
    }

    @PostMapping(value = "/submit",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CrowdDataResponse<WaterQualityDataResponseDto> submitWaterQualityData (@RequestBody WaterQualityDataRequestDto waterQualityDataRequestDto) throws CrowdDataSourceException {
        return CrowdDataResponse.success(waterQualityService.doSubmission(waterQualityDataRequestDto));
    }

    @GetMapping("/previousReviews")
    public CrowdDataResponse<WaterQualityDataResponseDto> getPreviousReviews (@RequestParam String citizenId) throws CrowdDataSourceException {
        return CrowdDataResponse.success(waterQualityService.getPreviousReviews(citizenId));
    }
}
