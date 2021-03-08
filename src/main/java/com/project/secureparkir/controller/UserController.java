package com.project.secureparkir.controller;

import com.project.secureparkir.model.User;
import com.project.secureparkir.service.UserServices;
import com.project.secureparkir.util.CustomErrorType;
import com.project.secureparkir.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/parkir")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    UserServices userServices;

    //Create User Data
    @PostMapping("/create-user/")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        logger.info("Create data user");

        if (userServices.isUserExist(user)) {
            logger.error("user exist, you can't create the data");
            return new ResponseEntity<>(new CustomErrorType("Name : " + user.getNamaUser() + " had been usage!"),
                    HttpStatus.CONFLICT);
        } else {
            if (userServices.findByUsername(user.getUsername()) == null) {
                userServices.saveUser(user); //save user
                User userAfterSave = userServices.findByIdUser(user.getIdUser()); //showing user after save
                return new ResponseEntity<>(new CustomSuccessType("Register Succes"), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(new CustomErrorType("Username had been usage!"),
                        HttpStatus.CONFLICT);
            }
        }
    }

    //Show User Data
    @GetMapping("/show-user/")
    public ResponseEntity<?> showSingleUserWithDataLogin(@RequestParam("username") String username) {
        logger.info("Show data user");

        User user = userServices.findByUsername(username);
        if (user == null) {
            logger.error("user cannot found, you can't show the data");
            return new ResponseEntity<>(new CustomErrorType("Unable to show username " + username + " , because not found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    //Authenticator Login
    @GetMapping("/auth/")
    public ResponseEntity<?> authUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        logger.info("check login");

        User user = userServices.findByUsername(username);
        if (user == null) {
            logger.error("user cannot found, you can't show the data");
            return new ResponseEntity<>(new CustomErrorType("Unable Login, Please check your username and password"), HttpStatus.NOT_FOUND);
        } else {
            String getPasswordDb = user.getPassword();

            //Check password
            Boolean isPassword = encoder.matches(password, getPasswordDb);

            //Check password default
            Boolean isPasswordDefault = encoder.matches("User1234", getPasswordDb);

            if (isPassword) {
                if (isPasswordDefault) {
                    return new ResponseEntity<>(new CustomErrorType("Password Default"), HttpStatus.BAD_REQUEST);
                } else {
                    return new ResponseEntity<>(new CustomSuccessType("Login Success"), HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Unable Login, Please check your username and password"), HttpStatus.NOT_FOUND);
            }
        }
    }

    //Change Password Default
    @PutMapping("/change-password/")
    public ResponseEntity<?> changePassword(@RequestParam("username") String username, @RequestBody User user) {
        logger.info("Change Password User");

        User isUsernameExist = userServices.findByUsername(username);
        if (isUsernameExist == null) {
            logger.error("User not found");
            return new ResponseEntity<>(new CustomErrorType("User not found"), HttpStatus.NOT_FOUND);
        } else {
            String getPasswordDb = isUsernameExist.getPassword();

            //Check password
            Boolean isPassword = encoder.matches("User1234", getPasswordDb);
            if (isPassword) {
                userServices.changePassword(username, user);
                return new ResponseEntity<>(new CustomSuccessType("Success Change Password"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomErrorType("Unable Change Password"), HttpStatus.BAD_REQUEST);
            }
        }
    }

    //Cek password isDefault?
    @GetMapping("/cek-default-password/")
    public ResponseEntity<?> isDefaultPassword(@RequestParam("username") String username) {
        User isUsernameExist = userServices.findByUsername(username);
        if (isUsernameExist == null) {
            logger.error("User not found");
            return new ResponseEntity<>(new CustomErrorType("User not found"), HttpStatus.NOT_FOUND);
        } else {
            String getPasswordDb = isUsernameExist.getPassword();

            //Check password
            Boolean isPassword = encoder.matches("User1234", getPasswordDb);
            if (isPassword) {
                return new ResponseEntity<>(new CustomSuccessType("Detected Default Password"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomErrorType("Undetected Default Password"), HttpStatus.BAD_REQUEST);
            }
        }
    }
}
