package com.waterqualitymonitoring.rewardservice.model;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;

@Data
@Builder
public class RatingDto {
    private String name;
    private Long points;
    private Binary image;
}
