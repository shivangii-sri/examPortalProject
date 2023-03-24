package com.exam.repo;

import com.exam.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUserName(String username);

    @Query(value = "Select * from users where id = ?1", nativeQuery = true)
    public User findByUserId(Long userId);
}
