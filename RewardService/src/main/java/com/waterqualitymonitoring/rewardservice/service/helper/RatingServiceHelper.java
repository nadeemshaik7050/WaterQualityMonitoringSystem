package com.waterqualitymonitoring.rewardservice.service.helper;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.entity.User;
import com.waterqualitymonitoring.rewardservice.exception.RatingException;
import com.waterqualitymonitoring.rewardservice.exception.RewardServiceError;
import com.waterqualitymonitoring.rewardservice.mapper.RatingMapper;
import com.waterqualitymonitoring.rewardservice.model.RatingDto;
import com.waterqualitymonitoring.rewardservice.repository.RatingRepository;
import com.waterqualitymonitoring.rewardservice.repository.UserRepository;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class RatingServiceHelper {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    public RatingServiceHelper(RatingRepository ratingRepository, UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository=userRepository;
    }
    public void validateAddRatingRequest(RatingDto ratingDto) throws RatingException {
        List<String> missingFields = new ArrayList<>();

        if(ratingDto.getName() == null || ratingDto.getName().isEmpty()) {
            missingFields.add("name");
        }
        if(ratingDto.getMinPoints()==null || ratingDto.getMaxPoints()==null){
            missingFields.add("points");
        }
        if(ratingDto.getImage()==null){
            missingFields.add("image");
        }

        if (!missingFields.isEmpty()) {
            throw new RatingException(RewardServiceError.FIELD_ERRORS,missingFields);
        }
    }

    public void addRating(RatingDto ratingDto) throws RatingException {
        // Implementation for adding a rating in the database
        Rating rating = RatingMapper.INSTANCE.toEntity(ratingDto);
        try {
            Rating existingRating = ratingRepository.findByMinPointsAndMaxPoints(ratingDto.getMinPoints(), ratingDto.getMaxPoints());
            if (existingRating != null) {
                throw new RatingException(RewardServiceError.RATING_ALREADY_EXISTS);
            }
            ratingRepository.save(rating);
        } catch (Exception e) {
            throw new RatingException(((Integer)e.hashCode()).toString(),e.getMessage());

        }
    }

    public RatingDto createRatingDto(String name, Long minPoints,Long maxPoints, MultipartFile image) throws IOException {
        return RatingDto.builder()
                .name(name)
                .minPoints(minPoints)
                .maxPoints(maxPoints)
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
        return new ArrayList<>((Collection) ratingRepository.findAll());
    }

    public void updateRating(RatingDto ratingDto) throws RatingException {

        try {
            Rating existingRating = ratingRepository.findByName(ratingDto.getName());
            Rating inRange=ratingRepository.findByMinPointsAndMaxPoints(ratingDto.getMinPoints(), ratingDto.getMaxPoints());
            if (inRange!=null) {
                throw new RatingException(RewardServiceError.RATING_ALREADY_EXISTS);
            }
            existingRating.setName(ratingDto.getName());
            existingRating.setMinPoints(ratingDto.getMinPoints());
            existingRating.setMaxPoints(ratingDto.getMaxPoints());
            existingRating.setImage(ratingDto.getImage());
            ratingRepository.save(existingRating);
        } catch (Exception e) {
            throw new RatingException(((Integer)e.hashCode()).toString(),e.getMessage());

        }
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

    public Integer getCountOfActiveRatings() {
        return ratingRepository.findByIsActiveTrue().size();
    }

    public Rating getUserRating(String citizenId) throws RatingException {
        User user=userRepository.findByCitizenId(citizenId);
        if(user==null) {
            throw new RatingException(RewardServiceError.USER_NOT_FOUND);
        }
        Long points=user.getPoints();
        Rating rating=ratingRepository.findFirstByMinPointsLessThanEqualAndMaxPointsGreaterThanEqualAndIsActiveTrue(points,points);
        if(rating==null){
            throw new RatingException(RewardServiceError.RATING_NOT_FOUND);
        }
        return rating;
    }
}
