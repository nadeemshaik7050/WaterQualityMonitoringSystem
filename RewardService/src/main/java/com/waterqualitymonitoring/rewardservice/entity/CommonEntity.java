package com.waterqualitymonitoring.rewardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public abstract class CommonEntity implements Serializable {
    @CreatedBy
    private String creator;
    @CreatedDate
    private LocalDateTime creationDate;
    @LastModifiedBy
    private String modifier;
    @LastModifiedDate
    private LocalDateTime modificationDate;
}
