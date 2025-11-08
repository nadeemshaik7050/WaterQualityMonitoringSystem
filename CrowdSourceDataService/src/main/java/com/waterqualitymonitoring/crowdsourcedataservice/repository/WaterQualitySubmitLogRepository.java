package com.waterqualitymonitoring.crowdsourcedataservice.repository;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.WaterQualitySubmitLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterQualitySubmitLogRepository extends CrudRepository<WaterQualitySubmitLog, String> {
    List<WaterQualitySubmitLog> findByCitizenId(String citizenId);
}
