package com.example.demo.login;

import com.example.demo.general.LoginResponse;
import com.example.demo.users.Users;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path= "api/v1/login")
@AllArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public LoginResponse login(@RequestBody LoginRequest request){
        return loginService.login(request);

    }
    @GetMapping(path = "/logged")
    public Users getLoggedUser(){
        return loginService.getLoggedUser();
    }
}
