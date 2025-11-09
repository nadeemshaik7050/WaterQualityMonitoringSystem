package com.waterqualitymonitoring.crowdsourcedataservice.data;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.*;
import org.bson.types.Binary;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedDatabase(MongoTemplate mongoTemplate) {
        return args -> {

            if (!mongoTemplate.collectionExists(User.class)) {
                mongoTemplate.createCollection(User.class);
            }

            long userCount = mongoTemplate.getCollection("user").countDocuments();
            if (userCount == 0) {
                User admin = User.builder()
                        .citizenId("C0001")
                        .firstName("Admin")
                        .lastName("User")
                        .email("admin@example.com")
                        .role("ADMIN")
                        .userName("admin")
                        .password("{bcrypt}$2a$10$hash")
                        .joinedDate(LocalDate.now())
                        .isActive(true)
                        .gender("OTHER")
                        .points(0L)
                        .numberOfReviewsGiven(0L)
                        .badge("NONE")
                        .build();

                User citizen = User.builder()
                        .citizenId("C0002")
                        .firstName("Jane")
                        .lastName("Doe")
                        .email("jane.doe@example.com")
                        .role("CITIZEN")
                        .userName("jane")
                        .password("{bcrypt}$2a$10$hash2")
                        .joinedDate(LocalDate.now())
                        .isActive(true)
                        .gender("FEMALE")
                        .points(10L)
                        .numberOfReviewsGiven(1L)
                        .badge("BRONZE")
                        .build();

                mongoTemplate.insert(admin);
                mongoTemplate.insert(citizen);
                System.out.println("Users seeded");
            }

            if (!mongoTemplate.collectionExists(WaterQualityData.class)) {
                mongoTemplate.createCollection(WaterQualityData.class);
            }

            long waterDataCount = mongoTemplate.getCollection("water_quality_data").countDocuments();
            if (waterDataCount == 0) {
                WaterQualityData sample = WaterQualityData.builder()
                        .postalCode("12345")
                        .measurements(Measurement.builder().unit("NA").value(0.0).build())
                        .observations(Observations.CLEAR)
                        .binaries(List.of(new Binary(new byte[]{1, 2, 3})))
                        .build();

                mongoTemplate.insert(sample);
                System.out.println("✅ Water quality data seeded");
            }

            if (!mongoTemplate.collectionExists(WaterQualitySubmitLog.class)) {
                mongoTemplate.createCollection(WaterQualitySubmitLog.class);
            }

            long logCount = mongoTemplate.getCollection("water_quality_data_submit_log").countDocuments();
            if (logCount == 0) {
                WaterQualitySubmitLog log = WaterQualitySubmitLog.builder()
                        .waterQualityDataId("123567890")
                        .userName("jane")
                        .citizenId("C0002")
                        .rewardsPointGiven(5L)
                        .totalRewardsPoint(15L)
                        .status("COMPLETED")
                        .submissionDate(LocalDate.now())
                        .submissionId("SUB-001")
                        .build();

                mongoTemplate.insert(log);
                System.out.println("✅ Submit log seeded");
            }
        };
    }
}