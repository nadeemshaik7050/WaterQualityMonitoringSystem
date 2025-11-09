package com.waterqualitymonitoring.crowdsourcedataservice.service;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.Observations;
import com.waterqualitymonitoring.crowdsourcedataservice.model.ReviewsResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.WaterQualityDataRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.service.helper.WaterQualityServiceHelper;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class WaterQualityService {
    private final WaterQualityServiceHelper waterQualityServiceHelper;

    public WaterQualityService(WaterQualityDataRepository waterQualityDataRepository, WaterQualityServiceHelper waterQualityServiceHelper) {
        this.waterQualityServiceHelper = waterQualityServiceHelper;
    }

    public WaterQualityDataResponseDto doSubmission(WaterQualityDataRequestDto waterQualityDataRequestDto) throws CrowdDataSourceException {
        waterQualityServiceHelper.validateRequest(waterQualityDataRequestDto);
        return waterQualityServiceHelper.doSubmission(waterQualityDataRequestDto);
    }

    public List<ReviewsResponseDto> getPreviousReviews(String citizenId) {
        return waterQualityServiceHelper.getPreviousReviews(citizenId);
    }

    public WaterQualityDataRequestDto createWaterQualityDataRequestDto(String postalCode, String unit, String value, String observations, String citizenId, String userName, List<MultipartFile> images) {
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
}
