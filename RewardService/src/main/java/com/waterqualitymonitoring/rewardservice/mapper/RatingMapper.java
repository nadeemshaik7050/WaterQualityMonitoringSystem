package com.waterqualitymonitoring.rewardservice.mapper;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.model.RatingDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RatingMapper {
    RatingMapper INSTANCE = Mappers.getMapper(RatingMapper.class);

    @Mapping(target = "isActive", constant = "true")
    Rating toEntity(RatingDto ratingDto);
}
