package com.waterqualitymonitoring.crowdsourcedataservice.repository;

import com.waterqualitymonitoring.crowdsourcedataservice.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    List<User> findByIsActiveTrue();
    User findByCitizenIdAndIsActiveTrue(String citizenId);
    User findByUserNameAndIsActiveTrue(String userName);
    User findByCitizenId(String citizenId);
    Long countByIsActiveTrue();
    List<User> findAllByIsActiveTrue(Sort by);
}
