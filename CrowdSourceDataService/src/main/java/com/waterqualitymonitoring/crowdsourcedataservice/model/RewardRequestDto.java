package com.waterqualitymonitoring.crowdsourcedataservice.model;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualityData;
import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;

import java.util.List;

@Data
@Builder
public class RewardRequestDto {
    private String citizenId;
    private String userName;
    private String postalCode;
    private String unit;
    private Double value;
    private Observations observations;
    private List<Binary> binaries;
}
