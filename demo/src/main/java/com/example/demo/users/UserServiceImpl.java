package com.example.demo.users;

import com.example.demo.attractions.Attractions;
import com.example.demo.emailtemplate.EmailTemplate;
import com.example.demo.emailsender.EmailSenderService;
import com.example.demo.users.RoleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService{
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailValidator emailValidator;
    private final EmailSenderService emailSenderService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.error("User found in the database : {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getUserRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                authorities);
    }

    @Override
    public AppUser saveUser(AppUser user) throws IllegalStateException{
        log.info("saving new user {} to the database", user.getUsername());
        boolean isValidEmail = emailValidator.test(user.getEmail());

//        try {
//            Optional<AppUser> userCheck = userRepo.findByEmail(user.getEmail());
//            log.info("saving new user {} to the database hahaha", userCheck.isPresent());
//            if (userCheck.isPresent()){
//                throw new IllegalStateException("email is already taken");
//            }
//        }
//        catch (IllegalStateException e) {
//            throw new IllegalStateException("email is already taken");
//        }

        if (user.getUsername() == ""){
            throw new IllegalStateException("username cannot be empty");
        }

        if(!isValidEmail){
            throw new IllegalStateException("Invalid email");
        }

        Optional<AppUser> userCheck = userRepo.findByEmail(user.getEmail());
        log.info("saving new user {} to the database hahaha", userCheck.isPresent());
        if (userCheck.isPresent()){
            throw new IllegalStateException("email is already taken");
        }

        if (user.getPassword().length() >= 8) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepo.save(user);
        } else {
            log.error("Your password is too short " + user.getPassword().length());
            throw new IllegalStateException("Your password is too short");
        }

    }

    @Override
    public UserRole saveRole(UserRole role) {
        log.info("saving new role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("saving new role {} to user {} to the database", roleName, username);
        AppUser user = userRepo.findByUsername(username);
        UserRole role = roleRepo.findByName(roleName);
        user.getUserRoles().add(role);
    }

    @Override
    public AppUser getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepo.findByUsername(username);
    }

    public Optional<AppUser> getById(Long id){
        return userRepo.findById(id);

    }

    @Override
    public List<AppUser> getUsers() {
        log.info("Fetching user all users");
        return userRepo.findAll();
    }

    @Override
    public void deleteUser(Long id){
//        boolean exists = userRepo.existsById(id);
//        if (!exists){
//            throw new IllegalStateException("User with id " + id + " does not exists");
//
//        }
        userRepo.deleteById(id);
    }

}