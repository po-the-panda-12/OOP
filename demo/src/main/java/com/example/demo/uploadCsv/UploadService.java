package com.example.demo.uploadCsv;

import com.example.demo.users.Users;
import com.example.demo.users.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UploadService {

    private final UsersService usersService;

    public Boolean addUser(Users user){
        try{
            usersService.signUpUser(user);
        }catch(IllegalStateException msg){
            return false;
        }

        return true;
    }


}
