package com.waterqualitymonitoring.crowdsourcedataservice.mapper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualityData;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import com.waterqualitymonitoring.crowdsourcedataservice.model.Measurement;
import com.waterqualitymonitoring.crowdsourcedataservice.model.Observations;
import com.waterqualitymonitoring.crowdsourcedataservice.model.ReviewsResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface WaterQualitySubmitMapper {

    WaterQualitySubmitMapper INSTANCE = Mappers.getMapper(WaterQualitySubmitMapper.class);

    @Mapping(target = "waterQualityData",expression = "java(mapRequestToObj(waterQualityDataRequestDto))")
    WaterQualitySubmitLog toSubmitLog(WaterQualityDataRequestDto waterQualityDataRequestDto);

    default WaterQualityData mapRequestToObj(WaterQualityDataRequestDto waterQualityDataRequestDto) {
        return WaterQualityData.builder()
                .postalCode(waterQualityDataRequestDto.getPostalCode())
                .measurements(Measurement.builder().unit("Na").value(1.00).build())
                .observations(Observations.CLEAR)
                .build();
    }

    @Mapping(source = "rewardsPointGiven", target = "pointsAwarded")
    @Mapping(source = "submitTime", target = "reviewDate", dateFormat = "yyyy-MM-dd")
    ReviewsResponseDto toReviewsResponseDto(WaterQualitySubmitLog submitLog);
}
