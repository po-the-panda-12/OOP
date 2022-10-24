package com.example.demo.users;

import com.example.demo.loanpass.Loanpass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
public class UsersController {
    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public List<Users> getUsers(){
        return usersService.getUsers();
    }

    @GetMapping(path = "{id}")
    public Users getUserById(@PathVariable("id") Long id){
        return usersService.getUserById(id);
    }

}