package com.waterqualitymonitoring.rewardservice.service;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.exception.RatingException;
import com.waterqualitymonitoring.rewardservice.model.RatingDto;
import com.waterqualitymonitoring.rewardservice.service.helper.RatingServiceHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    private RatingServiceHelper ratingServiceHelper;
    public RatingService(RatingServiceHelper ratingServiceHelper) {
        this.ratingServiceHelper = ratingServiceHelper;
    }

    public void addRating(RatingDto ratingDto) throws RatingException {
        ratingServiceHelper.validateAddRatingRequest(ratingDto);
        ratingServiceHelper.addRating(ratingDto);
    }

    public Rating getRatingbyId(String id) throws RatingException {
        return ratingServiceHelper.getRatingById(id);
    }

    public List<Rating> getAllRatings() {
        return ratingServiceHelper.getAllRatings();
    }

    public void updateRating(RatingDto ratingDto) throws RatingException {
        ratingServiceHelper.validateAddRatingRequest(ratingDto);
        ratingServiceHelper.updateRating(ratingDto);
    }

    public void toggleActivateRating(String ratingId) throws RatingException {
        ratingServiceHelper.toggleActivateRating(ratingId);
    }

    public Integer getCountOfActiveRatings() {
        return ratingServiceHelper.getCountOfActiveRatings();
    }
}
