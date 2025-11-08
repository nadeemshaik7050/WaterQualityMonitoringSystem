package com.waterqualitymonitoring.rewardservice.service.helper;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.entity.User;
import com.waterqualitymonitoring.rewardservice.exception.RewardException;
import com.waterqualitymonitoring.rewardservice.exception.RewardServiceError;
import com.waterqualitymonitoring.rewardservice.model.RewardRequestDto;
import com.waterqualitymonitoring.rewardservice.model.RewardResponseDto;
import com.waterqualitymonitoring.rewardservice.repository.RatingRepository;
import com.waterqualitymonitoring.rewardservice.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class RewardServiceHelper {

    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;
    public RewardServiceHelper(UserRepository userRepository, RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
    }

    public Long calculatePoints(RewardRequestDto rewardRequestDto) {
        boolean required=true;
        if(rewardRequestDto.getPostalCode()==null){
            required=false;
        }
        if (rewardRequestDto.getObservations()==null) {
            required=false;
        }
        if(rewardRequestDto.getUnit()==null ||rewardRequestDto.getValue()==null) {
            required = false;
        }
        if (rewardRequestDto.getBinaries()==null||rewardRequestDto.getBinaries().size()!=3) {
            required = false;
        }
        return required?20L:10L;
    }

    public RewardResponseDto addPointsAndBadgetoUser(Long points, RewardRequestDto rewardRequestDto) throws RewardException {
        User user=userRepository.findByCitizenId(rewardRequestDto.getCitizenId());
        if(user==null){
            throw new RewardException(RewardServiceError.USER_NOT_FOUND);
        }
        Long pointsAfter=user.getPoints()+points;
        user.setPoints(pointsAfter);
        user.setNumberOfReviewsGiven(user.getNumberOfReviewsGiven()+1);
        user.setBadge(calculateBadge(pointsAfter));
        userRepository.save(user);
        return RewardResponseDto.builder()
                .totalPoints(pointsAfter)
                .badge(user.getBadge())
                .pointsEarned(points)
                .message("Rewards added successfully")
                .status("Success")
                .build();
    }


    private String calculateBadge(Long points) throws RewardException {
        Rating rating=ratingRepository.findFirstByMinPointsLessThanEqualAndMaxPointsGreaterThanEqualAndIsActiveTrue(points,points);
        if(rating==null){
            throw new RewardException(RewardServiceError.RATING_NOT_FOUND);
        }
        return rating.getName();
    }
}
