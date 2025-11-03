package com.waterqualitymonitoring.rewardservice.repository;

import com.waterqualitymonitoring.rewardservice.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<User, String> {
    User findByCitizenId(String citizenId);
}
