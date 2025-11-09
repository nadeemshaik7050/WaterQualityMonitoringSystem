package com.waterqualitymonitoring.crowdsourcedataservice.repository;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualityData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterQualityDataRepository extends CrudRepository<WaterQualityData, String> {
}
