package com.waterqualitymonitoring.crowdsourcedataservice.repository;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WaterQualitySubmitLogRepository extends CrudRepository<WaterQualitySubmitLog, Long> {
}
