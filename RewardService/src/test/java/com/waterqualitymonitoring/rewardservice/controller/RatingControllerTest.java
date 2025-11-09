// File: src/test/java/com/waterqualitymonitoring/rewardservice/controller/RatingControllerTest.java
package com.waterqualitymonitoring.rewardservice.controller;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import com.waterqualitymonitoring.rewardservice.model.RatingDto;
import com.waterqualitymonitoring.rewardservice.service.RatingService;
import com.waterqualitymonitoring.rewardservice.service.helper.RatingServiceHelper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RatingController.class)
class RatingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RatingService ratingService;

    @MockBean
    private RatingServiceHelper ratingServiceHelper;

    @Test
    void addRating_createsRating() throws Exception {
        MockMultipartFile image = new MockMultipartFile("image", "test.png", "image/png", new byte[]{1, 2});
        RatingDto dto = RatingDto.builder()
                .name("Gold")
                .minPoints(100L)
                .maxPoints(199L)
                .isActive(true)
                .build();
        Mockito.when(ratingServiceHelper.createRatingDto(anyString(), anyLong(), anyLong(), any(MultipartFile.class)))
                .thenReturn(dto);

        mockMvc.perform(multipart("/rewards/rating/add")
                        .file(image)
                        .param("name", "Gold")
                        .param("minPoints", "100")
                        .param("maxPoints", "199"))
                .andExpect(status().isCreated())
                .andExpect(content().string("Rating added successfully"));

        Mockito.verify(ratingService, times(1)).addRating(dto);
    }

    @Test
    void updateRating_updatesRating() throws Exception {
        MockMultipartFile image = new MockMultipartFile("image", "upd.png", "image/png", new byte[]{3});
        RatingDto dto = RatingDto.builder()
                .name("Silver")
                .minPoints(50L)
                .maxPoints(99L)
                .isActive(true)
                .build();
        Mockito.when(ratingServiceHelper.createRatingDto(anyString(), anyLong(), anyLong(), any(MultipartFile.class)))
                .thenReturn(dto);

        mockMvc.perform(multipart("/rewards/rating/update")
                        .file(image)
                        .param("name", "Silver")
                        .param("minPoints", "50")
                        .param("maxPoints", "99"))
                .andExpect(status().isAccepted())
                .andExpect(content().string("Rating updated successfully"));

        Mockito.verify(ratingService, times(1)).updateRating(dto);
    }

    @Test
    void getRatingById_returnsRating() throws Exception {
        Rating rating = Rating.builder().id("123").name("Bronze").minPoints(0L).maxPoints(99L).isActive(true).build();
        Mockito.when(ratingService.getRatingbyId("123")).thenReturn(rating);

        mockMvc.perform(get("/rewards/rating/get/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Bronze"));
    }

    @Test
    void getAllRatings_returnsList() throws Exception {
        Rating r1 = Rating.builder().id("1").name("Bronze").minPoints(0L).maxPoints(99L).isActive(true).build();
        Rating r2 = Rating.builder().id("2").name("Silver").minPoints(100L).maxPoints(199L).isActive(true).build();
        Mockito.when(ratingService.getAllRatings()).thenReturn(List.of(r1, r2));

        mockMvc.perform(get("/rewards/rating/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));
    }

    @Test
    void toggleActivateRating_callsService() throws Exception {
        mockMvc.perform(get("/rewards/rating/toggleRating").param("ratingId", "123"))
                .andExpect(status().isOk());

        Mockito.verify(ratingService, times(1)).toggleActivateRating("123");
    }

    @Test
    void getCount_returnsCount() throws Exception {
        Mockito.when(ratingService.getCountOfActiveRatings()).thenReturn(5);

        mockMvc.perform(get("/rewards/rating/count"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(5));
    }

    @Test
    void getUserRating_returnsRating() throws Exception {
        Rating rating = Rating.builder().id("R1").name("Gold").minPoints(200L).maxPoints(299L).isActive(true).build();
        Mockito.when(ratingService.getUserRating("citizen1")).thenReturn(rating);

        mockMvc.perform(get("/rewards/rating/getUserRating").param("citizenId", "citizen1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Gold"));
    }
}
