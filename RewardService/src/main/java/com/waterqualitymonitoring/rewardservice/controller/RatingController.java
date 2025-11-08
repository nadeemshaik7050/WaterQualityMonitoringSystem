package com.waterqualitymonitoring.rewardservice.controller;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.exception.RatingException;
import com.waterqualitymonitoring.rewardservice.model.RatingDto;
import com.waterqualitymonitoring.rewardservice.model.RewardServiceResponse;
import com.waterqualitymonitoring.rewardservice.service.RatingService;
import com.waterqualitymonitoring.rewardservice.service.helper.RatingServiceHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/rewards/rating")
public class RatingController {
    private final RatingService ratingService;
    private final RatingServiceHelper ratingServiceHelper;

    public RatingController(RatingService ratingService, RatingServiceHelper ratingServiceHelper) {
        this.ratingServiceHelper = ratingServiceHelper;
        this.ratingService = ratingService;
    }

    @PostMapping(value = "/add",consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> addRating( @RequestParam("name") String name,
                                             @RequestParam("minPoints") Long minPoints,
                                             @RequestParam("maxPoints") Long maxPoints,
                                             @RequestPart("image") MultipartFile image) throws IOException, RatingException {
        RatingDto ratingDto=ratingServiceHelper.createRatingDto(name, minPoints,maxPoints, image);
        ratingService.addRating(ratingDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Rating added successfully");
    }

    @GetMapping("/get/{id}")
    public RewardServiceResponse<Rating> getRatings(@PathVariable("id") String id) throws RatingException {
        return RewardServiceResponse.success(ratingService.getRatingbyId(id));
    }

    @GetMapping("/all")
    public RewardServiceResponse<List<Rating>> getRatings() {
        return RewardServiceResponse.success(ratingService.getAllRatings());
    }

    @PostMapping(value = "/update", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> updateRating( @RequestParam("name") String name,
                                                @RequestParam("minPoints") Long minPoints,
                                                @RequestParam("maxPoints") Long maxPoints,
                                                @RequestPart("image") MultipartFile image) throws RatingException, IOException {
        RatingDto ratingDto=ratingServiceHelper.createRatingDto(name, minPoints,maxPoints, image);
        ratingService.updateRating(ratingDto);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Rating updated successfully");
    }

    @GetMapping("/toggleRating")
    public void toggleActivateRating(@RequestParam String ratingId) throws RatingException {
        ratingService.toggleActivateRating(ratingId);
    }

    @GetMapping("/count")
    public RewardServiceResponse<Integer> getcount() {
        return RewardServiceResponse.success(ratingService.getCountOfActiveRatings());
    }

    @GetMapping("/getUserRating")
    public RewardServiceResponse<Rating> getUserRatings(@RequestParam String citizenId) throws RatingException {
        return RewardServiceResponse.success(ratingService.getUserRating(citizenId));
    }

}
