package com.waterqualitymonitoring.rewardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.bson.types.Binary;

@Data
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Rating extends AbstractEntity{
    private String name;
    private Long minPoints;
    private Long maxPoints;
    private Binary image;
    private boolean isActive;
}
