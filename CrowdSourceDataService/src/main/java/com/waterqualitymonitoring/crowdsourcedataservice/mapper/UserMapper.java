package com.waterqualitymonitoring.crowdsourcedataservice.mapper;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRankingDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.lang.annotation.Target;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "isActive", constant = "true")
    User toEntity(UserRequestDto userRequestDto);

    @Mapping(target = "userName", source = "userName")
    @Mapping(target = "points", source = "points")
    @Mapping(target = "numberOfReviewsGiven", source = "numberOfReviewsGiven")
    @Mapping(target = "isActive", source = "active")
    UserResponseDto toDto(User user);

    @Mapping(target = "totalPoints", source = "points")
    @Mapping(target = "numberOfReviewsGiven", source = "numberOfReviewsGiven")
    UserRankingDto toRankingDto(User user);
}
