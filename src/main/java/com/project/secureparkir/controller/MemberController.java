package com.project.secureparkir.controller;

import com.project.secureparkir.model.Member;
import com.project.secureparkir.model.User;
import com.project.secureparkir.service.MemberServices;
import com.project.secureparkir.util.CustomErrorType;
import com.project.secureparkir.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class MemberController {

    public static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    MemberServices memberServices;

    //Create Member Data-ok
    @PostMapping("/create-member/")
    public ResponseEntity<?> createUser(@Valid @RequestBody Member member) {
        logger.info("Create data member");

        if (memberServices.isMemberExist(member)) {
            logger.error("member exist, you can't create the data");
            return new ResponseEntity<>(new CustomErrorType("Name "+member.getNamaMember()+" had been usage"), HttpStatus.CONFLICT);
        } else {
            memberServices.saveMember(member); //save member
            return new ResponseEntity<>(new CustomSuccessType("Member success added!"), HttpStatus.CREATED);
        }
    }
}
