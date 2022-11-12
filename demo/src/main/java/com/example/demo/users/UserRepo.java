package com.example.demo.users;

import com.example.demo.users.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    Optional<AppUser> findByEmail(String email);

}
