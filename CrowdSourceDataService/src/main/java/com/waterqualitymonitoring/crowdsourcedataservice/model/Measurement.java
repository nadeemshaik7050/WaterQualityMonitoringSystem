package com.waterqualitymonitoring.crowdsourcedataservice.model;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Measurement extends AbstractEntity {
    private String unit;
    private Double value;
}
