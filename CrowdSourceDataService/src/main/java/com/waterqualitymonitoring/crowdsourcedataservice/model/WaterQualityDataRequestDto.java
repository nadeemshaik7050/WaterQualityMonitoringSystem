package com.waterqualitymonitoring.crowdsourcedataservice.model;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;

import java.util.List;

@Data
@Builder
public class WaterQualityDataRequestDto {
    private String postalCode;
    private String unit;
    private Double value;
    private Observations observations;
    private List<Binary> binaries;
    private String userId;
    private String userName;
}
