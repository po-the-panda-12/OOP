package com.example.demo.successloan;
import java.time.LocalDateTime;  // Import the LocalDateTime class
import java.time.format.DateTimeFormatter;  // Import the DateTimeFormatter class
import com.example.demo.attractions.Attractions;
import com.example.demo.attractions.AttractionsService;
import com.example.demo.emailsender.EmailSenderService;
import com.example.demo.emailtemplate.EmailTemplate;
import com.example.demo.users.UserRepo;
import com.example.demo.users.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SuccessloanService {
    private final SuccessloanRepository successloanRepository;
    private final UserService userService;
    private final EmailSenderService emailSenderService;
    private final AttractionsService attractionsService;

    public SuccessloanService(SuccessloanRepository successloanRepository,
                              UserService userService,EmailSenderService emailSenderService,
                              AttractionsService attractionsService) {
        this.successloanRepository = successloanRepository;
        this.userService = userService;
        this.emailSenderService = emailSenderService;
        this.attractionsService = attractionsService;
    }

    public List<Successloan> getSuccessloan() {
        return successloanRepository.findAll();
    }

    public List<Successloan> getSuccessloanByAttractionId(Integer id) {
        return successloanRepository.findSuccessloanByAttractionId(id);
    }

    public List<Successloan> getSuccessloanByAttractionIdAndMonthAndYear(Integer id, String month, String year) {
        return successloanRepository.findSuccessloanByAttractionIdAndMonthAndYear(id, month, year);
    }
    public List<Successloan> getSuccessloanByAttractionIdAndMonthAndYearAndDay(Integer id, String month, String year, String day) {
        return successloanRepository.findSuccessloanByAttractionIdAndMonthAndYearAndDay(id, month, year, day);
    }
    public List<Successloan> getSuccessloanByStaffIdandAttractionIdAndMonthAndYearAndDay(Integer id, Integer attractionId, String month, String year, String day) {
        return successloanRepository.findSuccessloanByStaffIdAndAttractionIdAndMonthAndYearAndDay(id, attractionId, month, year, day);
    }

    public List<Successloan> getSuccessloanByStaffId(Integer id) {
        return successloanRepository.findSuccessloanByStaffId(id);
    }

    public List<Successloan> getSuccessloanByStaffIdAndMonthAndYear(Integer id, String month, String year) {
        return successloanRepository.findSuccessloanByStaffIdAndMonthAndYear(id, month, year);
    }



    public void addNewSuccessloan(Successloan successloan) {
        Optional<Successloan> successloanOptional = successloanRepository.findSuccessloanBySuccessLoanId(successloan.getSuccessLoanId());
        if (successloanOptional.isPresent()) {
            throw new IllegalStateException("Successloan ID taken");
        }
        successloanRepository.save(successloan);

        System.out.println("CREATED");
        EmailTemplate defaultTemplate = new EmailTemplate();
        defaultTemplate.setEmailTemplateName("Loanpass Confirmation");
        defaultTemplate.setEmailTemplateBody("<p>Dear #borrowerName#, </p><p>We are pleased to inform that your booking to #attractionName# is confirmed as follows:</p><p>Date of Visit : #dateOfVisit# (1 day only) </p><p>Membership ID : #corpPassNo#</p><p>For any change in visit date, you are required to cancel your booking (at least 1 day before) </p><p>and to submit a new booking in the system. </p><p>Attached is the Corporate Membership letter to #attractionName#. Please check that the details are accurate. </p><p>Please take note of the following on the day of your visit to #attractionName# :</p><p>Present this email, the attached corporate membership letter and your staff pass at the entrance of #attractionName# </p><p>Entry is strictly based on your details in this email and corporate membership letter. </p><ul><li>Your presence is required on the day of visit. Entry will be denied without staff’s presence. </li><li>Your booking is non-transferable. Entry is strictly based on the details in this email and Corporate Membership letter. </li><li>Visit date is strictly based on the date stated in this email and Corporate Membership letter. </li><li>Staff found abusing the Corporate Membership letter will be subject to disciplinary actions.</li><li>Enjoy your visit to &nbsp;#attractionName#</li></ul><p>Warm regards,</p><p>HR Department&nbsp;</p><p><br></p>\n");
        // formatting
        DateTimeFormatter dateFormatObject = DateTimeFormatter.ofPattern("E, MMM dd yyyy");
        Attractions selectedAttraction = attractionsService.getAttractions().get(successloan.getAttractionId());

        String templateTitle = defaultTemplate.getEmailTemplateName();
        String templateBody = defaultTemplate.getEmailTemplateBody();

        String recipient = "Siang Meng";
        String recipientEmail = "sm.lee.2020@smu.edu.sg";
        String attractionName = selectedAttraction.getName();
        String corpPassNo = "N/A";

        // supposed to get attraction
        // get userID

        LocalDateTime visitDate = LocalDateTime.of(Integer.parseInt(successloan.getYear()),Integer.parseInt(successloan.getMonth())
                ,Integer.parseInt(successloan.getDay()),0,0);

        String visitDateInString = visitDate.format(dateFormatObject);
        // regex patterns
        templateBody = templateBody.replace("#borrowerName#",recipient);
        templateBody = templateBody.replace("#attractionName#",attractionName);
        templateBody = templateBody.replace("#corpPassNo#",corpPassNo);
        templateBody = templateBody.replace("#dateOfVisit#",visitDateInString);
        emailSenderService.sendEmail(recipientEmail,templateTitle,templateBody);
        System.out.println("EMAIL SENT");
    }



    public void deleteSuccessloan(Integer successloanId) {
        boolean exists = successloanRepository.existsById(successloanId);
        if (!exists) {
            throw new IllegalStateException("Successloan with ID " + successloanId + " does not exist");
        }
        successloanRepository.deleteById(successloanId);
    }



}
