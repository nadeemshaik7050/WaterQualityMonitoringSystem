package com.waterqualitymonitoring.rewardservice.data;

import com.waterqualitymonitoring.rewardservice.entity.Rating;
import org.bson.types.Binary;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDate;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedDatabase(MongoTemplate mongoTemplate) {
        return args -> {

            if (!mongoTemplate.collectionExists(Rating.class)) {
                mongoTemplate.createCollection(Rating.class);
            }

            long ratingsCount = mongoTemplate.getCollection("ratings").countDocuments();
            if (ratingsCount == 0) {

                Rating rating= Rating.builder()
                        .name("Bronze")
                        .minPoints(0L)
                        .maxPoints(99L)
                        .image(new Binary(new byte[]{1, 2, 3}))
                        .isActive(true).build();

                mongoTemplate.insert(rating);
                System.out.println("Ratings seeded");
            }
        };
    }
}
