package com.example.demo.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;
import java.util.*;
@Repository
@Transactional(readOnly = true)
public interface UsersRepository
        extends JpaRepository<Users,Long>{
    Optional <Users> findByEmail(String email);
}