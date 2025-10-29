package com.waterqualitymonitoring.rewardservice.repository;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends CrudRepository<Rating,String> {
}
