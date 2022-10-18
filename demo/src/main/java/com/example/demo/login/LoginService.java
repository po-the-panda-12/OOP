package com.example.demo.login;

import com.example.demo.users.Users;
import com.example.demo.users.UsersRepository;
import org.springframework.context.annotation.Role;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    public LoginService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    public String login(LoginRequest loginRequest){
        Optional<Users> getUser = usersRepository.findByEmail(loginRequest.getEmail());
        Users currentUser = getUser.get();
        if( currentUser != null){
            System.out.println(currentUser.getName());
            System.out.println(currentUser.getEmail());
            System.out.println(currentUser.getPhoneNumber());

            Collection<GrantedAuthority> authorities = new HashSet<>();
//            Set<Role> roles = currentUser.getRoles();
//            for (Role role : roles)
//                authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getAuth()));
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(currentUser.getEmail(), currentUser.getPassword()));
            return "OK";
        }
        return "Not found";
    }
}
