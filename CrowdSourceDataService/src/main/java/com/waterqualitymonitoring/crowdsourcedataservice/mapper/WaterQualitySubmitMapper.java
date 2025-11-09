package com.waterqualitymonitoring.crowdsourcedataservice.mapper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualityData;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import com.waterqualitymonitoring.crowdsourcedataservice.entity.Measurement;
import com.waterqualitymonitoring.crowdsourcedataservice.model.ReviewsResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface WaterQualitySubmitMapper {

    WaterQualitySubmitMapper INSTANCE = Mappers.getMapper(WaterQualitySubmitMapper.class);

    WaterQualitySubmitLog toSubmitLog(WaterQualityDataRequestDto waterQualityDataRequestDto);

    default WaterQualityData toWaterQualityData(WaterQualityDataRequestDto waterQualityDataRequestDto){
        return mapRequestToObj(waterQualityDataRequestDto);
    }

    default WaterQualityData mapRequestToObj(WaterQualityDataRequestDto waterQualityDataRequestDto) {
        return WaterQualityData.builder()
                .postalCode(waterQualityDataRequestDto.getPostalCode())
                .measurements(Measurement.builder().unit(waterQualityDataRequestDto.getUnit()).value(waterQualityDataRequestDto.getValue()).build())
                .observations(waterQualityDataRequestDto.getObservations())
                .binaries(waterQualityDataRequestDto.getBinaries())
                .build();
    }
}
