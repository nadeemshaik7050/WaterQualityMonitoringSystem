package com.waterqualitymonitoring.crowdsourcedataservice.entity;

import com.waterqualitymonitoring.crowdsourcedataservice.model.Measurement;
import com.waterqualitymonitoring.crowdsourcedataservice.model.Observations;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@Document("water_quality_data")
public class WaterQualityData extends AbstractEntity {
    private String postalCode;
    private Measurement measurements;
    private Observations observations;
    private List<Binary> binaries;
}
