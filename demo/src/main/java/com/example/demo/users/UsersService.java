package com.example.demo.users;

import com.example.demo.loanpass.Loanpass;
import com.example.demo.loanpass.LoanpassRepository;
import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UsersService implements UserDetailsService {
    private final static String USER_NOT_FOUND_MESSAGE =
            "User with email %s not found";
    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    public List<Users> getUsers(){
        return usersRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return usersRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND_MESSAGE,email)
                )
        );
    }

    public String signUpUser(Users newUser){
        boolean userExists = usersRepository.findByEmail(newUser.getEmail())
                .isPresent();
        if (userExists){
            throw new IllegalStateException("Email already exists");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);
        usersRepository.save(newUser);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                newUser
        );
        confirmationTokenService.saveConfirmationToken(
                confirmationToken);

//        send email
        return token;
    }
    public int enableUser(String email) {
        return usersRepository.enableUser(email);
    }

    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(() -> new IllegalStateException("User with id " + id + " does not exist"));
    }
}
