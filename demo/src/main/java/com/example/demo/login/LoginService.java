package com.example.demo.login;

import com.example.demo.general.LoginResponse;
import com.example.demo.users.UserRole;
import com.example.demo.users.Users;
import com.example.demo.users.UsersRepository;
import org.springframework.context.annotation.Role;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;

import javax.swing.text.html.Option;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
@Service
public class LoginService {
    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public LoginService(UsersRepository usersRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.usersRepository = usersRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public LoginResponse login(LoginRequest loginRequest){
        Optional<Users> getUser = usersRepository.findByEmail(loginRequest.getEmail());
        Users currentUser = getUser.get();
        if( currentUser != null){
            UserRole currentRole = currentUser.getUserRole();
            Boolean passwordCorrect = this.bCryptPasswordEncoder.matches(loginRequest.getPassword(),currentUser.getPassword());
            if(passwordCorrect){
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(currentUser.getEmail(), currentUser.getPassword()));
                return new LoginResponse(true,"OK");
            }
            return new LoginResponse(false,"INCORRECT PASSWORD");
        }
        return new LoginResponse(false,"Not found");
    }

    public Users getLoggedUser(){
        Object test = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(test);

        return null;
    }
}
