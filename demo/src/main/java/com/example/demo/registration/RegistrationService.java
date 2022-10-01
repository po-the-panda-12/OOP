package com.example.demo.registration;

import com.example.demo.users.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final UsersService usersService;
    private final EmailValidator emailValidator;
    public String register(RegistrationRequest request){
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("Invalid email");
        }
        return usersService.signUpUser(
                new Users(
                        request.getName(),
                        request.getEmail(),
                        request.getPhoneNumber(),
                        request.getPassword(),
                        UserRole.user,
                        false,
                        true

                )
        );
    }
}
