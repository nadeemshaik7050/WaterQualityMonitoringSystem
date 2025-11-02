package com.waterqualitymonitoring.rewardservice.repository;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends CrudRepository<Rating,String> {
    List<Rating> findByIsActiveTrue();
    Rating findByIdAndIsActiveTrue(String id);
}
