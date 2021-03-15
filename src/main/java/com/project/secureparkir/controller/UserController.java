package com.project.secureparkir.controller;

import com.project.secureparkir.model.User;
import com.project.secureparkir.service.UserServices;
import com.project.secureparkir.util.CustomErrorType;
import com.project.secureparkir.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/parkir")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    UserServices userServices;

    //Create User Data-ok
    @PostMapping("/create-user/")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        logger.info("Create data user");

        if (userServices.isNameExist(user)) {
            logger.error("user exist, you can't create the data");
            return new ResponseEntity<>(new CustomErrorType("Name "+user.getNamaUser()+" had been usage"), HttpStatus.CONFLICT);
        } else {
            if (userServices.findByUsername(user.getUsername()) == null) {
                userServices.saveUser(user); //save user
                return new ResponseEntity<>(new CustomSuccessType("Register Succes"), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(new CustomErrorType("Username had been usage!"), HttpStatus.CONFLICT);
            }
        }
    }

    //Show User Data-ok
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

    //Show User Data
    @GetMapping("/show-user/list/")
    public ResponseEntity<?> showListUser(@RequestParam("username") String username) {
        logger.info("Show data user");

        List<User> user = userServices.findListByUsername(username);
        if (user == null) {
            logger.error("user cannot found, you can't show the data");
            return new ResponseEntity<>(new CustomErrorType("Unable to show username " + username + " , because not found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    //Show User Data
    @GetMapping("/show-user/id/")
    public ResponseEntity<?> showSingleUserById(@RequestParam("id") String idUser) {
        logger.info("Show data user");

        List<User> user = userServices.findByIdUser(idUser);
        if (user == null) {
            logger.error("user cannot found, you can't show the data");
            return new ResponseEntity<>(new CustomErrorType("Unable to show idUser " + idUser + " , because not found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    //Authenticator Login-ok
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

    //Change Password Default-ok
    @PutMapping("/change-password/")
    public ResponseEntity<?> changePassword(@RequestParam("username") String username, @RequestBody User user) {
        logger.info("Change Password User");

        User isUsernameExist = userServices.findByUsername(username);
        if (isUsernameExist == null) {
            logger.error("User not found");
            return new ResponseEntity<>(new CustomErrorType("User not found"), HttpStatus.NOT_FOUND);
        } else {
            userServices.changePassword(username, user);
            return new ResponseEntity<>(new CustomSuccessType("Success Change Password"), HttpStatus.OK);
        }
    }

    //Delete Data By Id-ok
    @DeleteMapping("/user/delete/")
    public ResponseEntity<?> deleteSingleUserById(@RequestParam("id") String idUser) {
        logger.info("Delete User");

        List<User> findingId = userServices.findByIdUser(idUser);

        if (findingId == null) {
            logger.error("Unable to deleting that User, User not found");
            return new ResponseEntity<>(new CustomErrorType("Unable to deleting that user , because not found"), HttpStatus.NOT_FOUND);
        } else {
            userServices.deleteUserById(idUser);
            return new ResponseEntity<>(new CustomSuccessType("Id user ("+idUser+") deleted!"), HttpStatus.OK);
        }
    }

    //Update Data By Id-ok
    @PutMapping("/user/update/")
    public ResponseEntity<?> updateSingleUserById(@RequestParam("id") String idUser, @RequestBody User user) {
        logger.info("Update User");

        List<User> userList = userServices.findByIdUser(idUser);
        User isUsernameExist = userServices.findByUsername(user.getUsername());

        if (userList == null) {
            logger.error("user cannot found, you can't show the data");
            return new ResponseEntity<>(new CustomErrorType("Unable to update user , because not found"), HttpStatus.NOT_FOUND);
        } else {
            if (isUsernameExist == null) {
                userServices.updateByIdUser(idUser, user);
                return new ResponseEntity<>(new CustomSuccessType("Success updating "+user.getNamaUser()+""), HttpStatus.OK);
            } else if (isUsernameExist.getUsername().equalsIgnoreCase(user.getUsername())) {
                if (isUsernameExist.getIdUser().equalsIgnoreCase(user.getIdUser())) {
                    userServices.updateByIdUser(idUser, user);
                    return new ResponseEntity<>(new CustomSuccessType("Success updating "+user.getNamaUser()+""), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Unable to update user , because username "+user.getUsername()+" had been usage"), HttpStatus.CONFLICT);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Unable to update user , because username "+user.getUsername()+" had been usage"), HttpStatus.CONFLICT);
            }
        }
    }

    //Read Data By User-ok
    @GetMapping("/user/")
    public ResponseEntity<?> getData (@RequestParam Map<Object, Object> params) {
        List<User> userList;
        Map<String, Object> output = new HashMap<>();

        try {
            userList = userServices.readDataByQuery(params);
            output.put("jumlah", userServices.countAllDataByQuery(params));
            output.put("data", userList);
            return new ResponseEntity<>(output, HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(new CustomErrorType("Failed to fetching data"), HttpStatus.BAD_GATEWAY);
        }
    }
}
