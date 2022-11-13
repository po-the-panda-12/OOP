package com.example.demo.loanpass;

import com.example.demo.attractions.Attractions;
import com.example.demo.users.AppUser;
import com.example.demo.users.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.emailsender.EmailSenderService;
import com.example.demo.emailtemplate.EmailTemplate;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class LoanpassService {
    private final LoanpassRepository loanPassRepository;
    private final UserRepo userRepo;
    private final EmailSenderService emailSenderService;

    @Autowired
    public LoanpassService(LoanpassRepository loanPassRepository,UserRepo userRepo,EmailSenderService emailSenderService){
        this.loanPassRepository = loanPassRepository;
        this.userRepo = userRepo;
        this.emailSenderService = emailSenderService;
    }

    public List<Loanpass> getLoanPass(){
        return loanPassRepository.findAllLoanPassOrdered();
    }

    public List<Loanpass> getLoanPassByAttractionId(Integer attractionId){
        return loanPassRepository.findLoanPassByAttractionId(attractionId);
    }

    public void addNewLoanPass(Loanpass loanPass){
        Optional<Loanpass> loanPassOptional = loanPassRepository.findLoanPassBypassId(loanPass.getPassId());
        if(loanPassOptional.isPresent()){
            throw new IllegalStateException("passId taken");
        }
        loanPassRepository.save(loanPass);
    }

    public void deleteLoanPass(int loanPassId){
        boolean exists = loanPassRepository.existsById(loanPassId);
        if(!exists){
            throw new IllegalStateException("loanPass with id " + loanPassId + " does not exists");
        }
        loanPassRepository.deleteById(loanPassId);
    }

    @Transactional
    public void updateLoanPass(int passId, int attractionId, int passNumber, int previousLoanBy, String description)
    {
        Loanpass loanPass = loanPassRepository.findById(passId)
                .orElseThrow(() -> new IllegalStateException(
                        "loanPass with id " + passId + "does not exist"
                ));
        if (attractionId != 0 && !Objects.equals(loanPass.getAttractionId(), attractionId)){
            loanPass.setAttractionId(attractionId);
        }
        if (passNumber != 0 && !Objects.equals(loanPass.getPassNumber(), passNumber)){
            loanPass.setPassNumber(passNumber);
        }
        if (previousLoanBy != 0 && !Objects.equals(loanPass.getPreviousLoanBy(), previousLoanBy)){
            loanPass.setPreviousLoanBy(previousLoanBy);
        }
        if (description != null && description.length() > 0 && !Objects.equals(loanPass.getDescription(), description)){
            loanPass.setDescription(description);
        }
        // split
        String[] splittedString = loanPass.getDescription().split(",./");
        AppUser loanedBy = userRepo.getById((long)previousLoanBy);
        System.out.println((loanedBy));
        String status = splittedString[0];
        System.out.println("status "+splittedString[0]);
        String replacementFee = splittedString[2];
        System.out.println("replacementFee "+splittedString[2]);
        // check if expired
        System.out.println("isLost"+status == "Lost");
        if(status.equals("Lost")){
            EmailTemplate defaultTemplate = new EmailTemplate();
            defaultTemplate.setEmailTemplateName("Loan Pass Lost");
            defaultTemplate.setEmailTemplateBody("<p>Dear #borrowerName# ,</p><p>It seems that your Loan Pass with the ID #loanPassId# has been lost. " +
                    "Please pay the replacement fee $#replacementFee# .</p><p><br></p><p>Regards,</p><p>HR Department</p>");
            // formatting
            String templateTitle = defaultTemplate.getEmailTemplateName();
            String templateBody = defaultTemplate.getEmailTemplateBody();

            String recipient = loanedBy.getUsername();
            String recipientEmail = loanedBy.getEmail();

            // regex patterns
            templateBody = templateBody.replace("#borrowerName#",recipient);
            templateBody = templateBody.replace("#loanPassId#",String.valueOf(passId));
            templateBody = templateBody.replace("#replacementFee#",replacementFee);
            emailSenderService.sendEmail(recipientEmail,templateTitle,templateBody);
        }

        // check if collected
        if(status.equals("Loaned Out")){
            EmailTemplate defaultTemplate = new EmailTemplate();
            defaultTemplate.setEmailTemplateName("Loan Pass Collected");
            defaultTemplate.setEmailTemplateBody("WIP");

            // formatting
            String templateTitle = defaultTemplate.getEmailTemplateName();
            String templateBody = defaultTemplate.getEmailTemplateBody();

            String recipient = loanedBy.getUsername();
            String recipientEmail = loanedBy.getEmail();

            // regex patterns
            templateBody = templateBody.replace("#borrowerName#",recipient);
            templateBody = templateBody.replace("#loanPassId#",String.valueOf(passId));
            emailSenderService.sendEmail(recipientEmail,templateTitle,templateBody);
        }

        // check if returned
        if(status.equals("Uncollected")){
            EmailTemplate defaultTemplate = new EmailTemplate();
            defaultTemplate.setEmailTemplateName("Loan Pass Returned");
            defaultTemplate.setEmailTemplateBody("WIP");
            // formatting
            String templateTitle = defaultTemplate.getEmailTemplateName();
            String templateBody = defaultTemplate.getEmailTemplateBody();

            String recipient = loanedBy.getUsername();
            String recipientEmail = loanedBy.getEmail();

            // regex patterns
            templateBody = templateBody.replace("#borrowerName#",recipient);
            templateBody = templateBody.replace("#loanPassId#",String.valueOf(passId));
            emailSenderService.sendEmail(recipientEmail,templateTitle,templateBody);
        }
    }



}
