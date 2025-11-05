package com.waterqualitymonitoring.rewardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "ratings")
@CompoundIndex(name = "unique_min_max_idx", def = "{'minPoints': 1, 'maxPoints': 1}", unique = true)
public class Rating extends AbstractEntity{
    private String name;
    private Long minPoints;
    private Long maxPoints;
    private Binary image;
    private boolean isActive;
}
