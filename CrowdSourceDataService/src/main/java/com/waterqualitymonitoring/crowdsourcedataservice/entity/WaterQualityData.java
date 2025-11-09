package com.waterqualitymonitoring.crowdsourcedataservice.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Document("water_quality_data")
public class WaterQualityData extends AbstractEntity {
    private String postalCode;
    private Measurement measurements;
    private Observations observations;
    private List<Binary> binaries;
}
