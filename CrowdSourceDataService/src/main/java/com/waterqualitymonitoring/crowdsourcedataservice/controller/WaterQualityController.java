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
                                                                                  @RequestPart("binaries") List<MultipartFile> images) throws CrowdDataSourceException {
        WaterQualityDataRequestDto waterQualityDataRequestDto = createWaterQualityDataRequestDto(postalCode, unit, value, observations, citizenId, userName, images);
        return CrowdDataResponse.success(waterQualityService.doSubmission(waterQualityDataRequestDto));
    }

    private WaterQualityDataRequestDto createWaterQualityDataRequestDto(String postalCode, String unit, String value, String observations, String citizenId, String userName, List<MultipartFile> images) {
            return WaterQualityDataRequestDto.builder()
                    .postalCode(postalCode)
                    .unit(unit)
                    .value(Double.parseDouble(value))
                    .observations(Observations.valueOf(observations))
                    .citizenId(citizenId)
                    .userName(userName)
                    .binaries(convertMultipartFilesToBinaryList(images))
                    .build();
    }

    private List<Binary> convertMultipartFilesToBinaryList(List<MultipartFile> images) {
        return images.stream().map(file -> {
            try {
                return new Binary(file.getBytes());
            } catch (Exception e) {
                throw new RuntimeException("Error converting file to binary", e);
            }
        }).toList();
    }

    @GetMapping("/previousReviews")
    public CrowdDataResponse<List<ReviewsResponseDto>> getPreviousReviews (@RequestParam String citizenId) throws CrowdDataSourceException {
        return CrowdDataResponse.success(waterQualityService.getPreviousReviews(citizenId));
    }
}
