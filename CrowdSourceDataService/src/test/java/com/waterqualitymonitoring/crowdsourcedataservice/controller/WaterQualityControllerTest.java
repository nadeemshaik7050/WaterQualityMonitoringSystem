package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.model.ReviewsResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.service.WaterQualityService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = WaterQualityController.class)
@ActiveProfiles("test")
class WaterQualityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WaterQualityService waterQualityService;

    @Test
    @DisplayName("Multipart submission builds DTO and invokes service")
    void submit_ok() throws Exception {
        MockMultipartFile img = new MockMultipartFile("binaries","photo.jpg","image/jpeg","abc".getBytes());
        when(waterQualityService.doSubmission(any())).thenReturn(
                WaterQualityDataResponseDto.builder().submissionId("S1").message("Test").build()
        );

        mockMvc.perform(multipart("/crowddata/waterquality/submit")
                        .file(img)
                        .param("postalCode","12345")
                        .param("unit","pH")
                        .param("value","7.2")
                        .param("observations","Clear")
                        .param("citizenId","C1")
                        .param("userName","john"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.submissionId").value("S1"));

        ArgumentCaptor<com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto> captor =
                ArgumentCaptor.forClass(com.waterqualitymonitoring.crowdsourcedataservice.model.WaterQualityDataRequestDto.class);
        verify(waterQualityService).doSubmission(captor.capture());
        assertThat(captor.getValue().getCitizenId()).isEqualTo("C1");
        assertThat(captor.getValue().getBinaries()).hasSize(1);
    }

    @Test
    @DisplayName("Previous reviews returns sorted (service already handles ordering)")
    void previousReviews_ok() throws Exception {
        LocalDate now = LocalDate.now();
        when(waterQualityService.getPreviousReviews("C7")).thenReturn(
                List.of(
                        ReviewsResponseDto.builder().submissionId("S2").reviewDate(now).build(),
                        ReviewsResponseDto.builder().submissionId("S3").reviewDate(now).build()
                )
        );

        mockMvc.perform(get("/crowddata/waterquality/previousReviews").param("citizenId","C7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].submissionId").value("S2"));

        verify(waterQualityService).getPreviousReviews("C7");
    }
}