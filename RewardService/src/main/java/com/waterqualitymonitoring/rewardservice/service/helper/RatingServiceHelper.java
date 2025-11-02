package com.waterqualitymonitoring.rewardservice.service.helper;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.exception.RatingException;
import com.waterqualitymonitoring.rewardservice.exception.RewardServiceError;
import com.waterqualitymonitoring.rewardservice.mapper.RatingMapper;
import com.waterqualitymonitoring.rewardservice.model.RatingDto;
import com.waterqualitymonitoring.rewardservice.repository.RatingRepository;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class RatingServiceHelper {
    private final RatingRepository ratingRepository;
    public RatingServiceHelper(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }
    public void validateAddRatingRequest(RatingDto ratingDto) throws RatingException {
        List<String> missingFields = new ArrayList<>();

        if(ratingDto.getName() == null || ratingDto.getName().isEmpty()) {
            missingFields.add("name");
        }
        if(ratingDto.getPoints()==null){
            missingFields.add("points");
        }
        if(ratingDto.getImage()==null){
            missingFields.add("image");
        }

        if (!missingFields.isEmpty()) {
            throw new RatingException(RewardServiceError.FIELD_ERRORS,missingFields);
        }
    }

    public void addRating(RatingDto ratingDto) {
        // Implementation for adding a rating in the database
        Rating rating= RatingMapper.INSTANCE.toEntity(ratingDto);
        ratingRepository.save(rating);
    }

    public RatingDto createRatingDto(String name, Long points, MultipartFile image) throws IOException {
        return RatingDto.builder()
                .name(name)
                .points(points)
                .image(new Binary(image.getBytes()))
                .isActive(true)
                .build();
    }

    public Rating getRatingById(String id) throws RatingException {
        Rating rating=ratingRepository.findByIdAndIsActiveTrue(id);
        if(rating==null){
            throw new RatingException(RewardServiceError.RATING_NOT_FOUND);
        }
        return rating;
    }

    public List<Rating> getAllRatings() {
        return new ArrayList<>(ratingRepository.findByIsActiveTrue());
    }

    public void updateRating(RatingDto ratingDto) {
        Rating rating= RatingMapper.INSTANCE.toEntity(ratingDto);
        ratingRepository.save(rating);
    }

    public void toggleActivateRating(String ratingId) throws RatingException {
        Rating rating = ratingRepository.findById(ratingId).orElse(null);
        if (rating != null) {
            rating.setActive(!rating.isActive());
            ratingRepository.save(rating);
            return;
        }
        throw new RatingException(RewardServiceError.RATING_NOT_FOUND);
    }
}
