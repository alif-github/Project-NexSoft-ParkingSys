package com.project.secureparkir.controller;

import com.project.secureparkir.model.Member;
import com.project.secureparkir.service.MemberServices;
import com.project.secureparkir.util.CustomErrorType;
import com.project.secureparkir.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        if (memberServices.isMemberExist(member) || memberServices.isNoPlatExist(member)) {
            logger.error("member exist, you can't create the data");
            return new ResponseEntity<>(new CustomErrorType("Data exist!"), HttpStatus.CONFLICT);
        } else {
            memberServices.saveMember(member); //save member
            return new ResponseEntity<>(new CustomSuccessType("Member success added!"), HttpStatus.CREATED);
        }
    }

    //Read Data By Member-ok
    @GetMapping("/read-member/")
    public ResponseEntity<?> getData (@RequestParam Map<Object, Object> params) {
        List<Member> memberList;
        Map<String, Object> output = new HashMap<>();

        try {
            memberList = memberServices.readDataByQuery(params);
            output.put("jumlah", memberServices.countAllDataByQuery(params));
            output.put("data", memberList);
            return new ResponseEntity<>(output, HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(new CustomErrorType("Failed to fetching data"), HttpStatus.BAD_GATEWAY);
        }
    }
}
