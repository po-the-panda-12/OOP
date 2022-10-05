package com.example.demo.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;
import java.util.*;
@Repository
@Transactional(readOnly = true)
public interface UsersRepository
        extends JpaRepository<Users,Long>{
    Optional <Users> findByEmail(String email);
    @Transactional
    @Modifying
    @Query("UPDATE Users a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableUser(String email);
}