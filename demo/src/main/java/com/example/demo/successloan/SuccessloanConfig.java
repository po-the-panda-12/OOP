package com.example.demo.successloan;

import com.example.demo.loanpass.Loanpass;
import com.example.demo.loanpass.LoanpassRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SuccessloanConfig {

    @Bean
    CommandLineRunner commandLineRunnerSuccess(SuccessloanRepository repository) {
        return args -> {
            Successloan successloan1 = new Successloan(
                    1,
                    1,
                    1,
                    "10",
                    "2022"
            );

            Successloan successloan2 = new Successloan(
                    2,
                    2,
                    2,
                    "10",
                    "2022"
            );

            Successloan successloan3 = new Successloan(
                    3,
                    3,
                    3,
                    "10",
                    "2022"
            );

            Successloan successloan4 = new Successloan(
                    4,
                    1,
                    3,
                    "7",
                    "2022"
            );

            Successloan successloan5 = new Successloan(
                    5,
                    2,
                    3,
                    "3",
                    "2021"
            );

            Successloan successloan6 = new Successloan(
                6,
                1,
                3,
                "6",
                "2021"
            );

            Successloan successloan7 = new Successloan(
                7,
                5,
                3,
                "6",
                "2021"
            );

            Successloan successloan8 = new Successloan(
                8,
                4,
                2,
                "12",
                "2022"
            );

            Successloan successloan9 = new Successloan(
                    9,
                    4,
                    2,
                    "12",
                    "2022"
            );

            Successloan successloan10 = new Successloan(
                    10,
                    4,
                    3,
                    "12",
                    "2022"
            );

            repository.saveAll(
                    List.of(successloan1, successloan2, successloan3,successloan4,successloan5,successloan6,successloan7,successloan8,successloan9,successloan10)
            );
        };
    }
}

