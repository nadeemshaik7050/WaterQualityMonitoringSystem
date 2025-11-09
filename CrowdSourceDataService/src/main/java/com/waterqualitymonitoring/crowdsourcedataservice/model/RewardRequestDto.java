package com.waterqualitymonitoring.crowdsourcedataservice.model;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.Observations;
import lombok.Builder;
import lombok.Data;

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
    private List<byte[]> binaries;
}
