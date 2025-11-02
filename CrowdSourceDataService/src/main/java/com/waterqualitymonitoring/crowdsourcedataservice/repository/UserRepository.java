package com.waterqualitymonitoring.crowdsourcedataservice.repository;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    List<User> findByIsActiveTrue();
    User findByUserIdAndIsActiveTrue(String userId);
    User findByUserNameAndIsActiveTrue(String userName);
    User findByUserId(String userId);
    Long countByIsActiveTrue();
}
