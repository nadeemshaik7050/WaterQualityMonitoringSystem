package com.waterqualitymonitoring.crowdsourcedataservice.service;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceException;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.repository.WaterQualityDataRepository;
import com.waterqualitymonitoring.crowdsourcedataservice.service.helper.WaterQualityServiceHelper;
import org.springframework.stereotype.Service;

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
}
