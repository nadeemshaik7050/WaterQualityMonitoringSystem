package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.*;
import com.waterqualitymonitoring.crowdsourcedataservice.service.WaterQualityService;
import org.bson.types.Binary;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/crowddata/waterquality")
public class WaterQualityController {

    private final WaterQualityService waterQualityService;

    public WaterQualityController(WaterQualityService waterQualityService) {
        this.waterQualityService = waterQualityService;
    }

    @PostMapping(value = "/submit",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CrowdDataResponse<WaterQualityDataResponseDto> submitWaterQualityData (@RequestParam("postalCode") String postalCode,
                                                                                  @RequestParam("unit") String unit,
                                                                                  @RequestParam("value") String value,
                                                                                  @RequestParam("observations") String observations,
                                                                                  @RequestParam("citizenId") String citizenId,
                                                                                  @RequestParam("userName") String userName,
                                                                                  @RequestPart(name="binaries",required = false) List<MultipartFile> images) throws CrowdDataSourceException {
        List<MultipartFile> safeImages = (images == null) ? java.util.Collections.emptyList() : images;
        WaterQualityDataRequestDto waterQualityDataRequestDto = waterQualityService.createWaterQualityDataRequestDto(postalCode, unit, value, observations, citizenId, userName, safeImages);
        return CrowdDataResponse.success(waterQualityService.doSubmission(waterQualityDataRequestDto));
    }

    @GetMapping("/previousReviews")
    public CrowdDataResponse<List<ReviewsResponseDto>> getPreviousReviews (@RequestParam String citizenId) throws CrowdDataSourceException {
        return CrowdDataResponse.success(waterQualityService.getPreviousReviews(citizenId));
    }
}
