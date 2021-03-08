package com.project.secureparkir.service;

import com.project.secureparkir.model.User;
import com.project.secureparkir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServicesImpl implements UserServices {

    @Autowired
    UserRepository userRepository;

    //Password Encoder to encryp the data
    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public void saveUser(User user) {
        //untuk mensinkronkan penulisan data ke memori
        synchronized (this) {
            //encoder password sebelum masuk database
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.saveUser(user);
        }
    }

    @Override
    public List<User> findAllUserPagging(int page, int limit) {
        return null;
    }

    @Override
    public User findByIdUser(String idUser) {
        return null;
    }

    @Override
    public User findByUsername(String username) {
        User user;
        try {
            user = userRepository.findByUsername(username);
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @Override
    public User findByName(String name) {
        User user;
        try {
            user = userRepository.findByName(name);
        } catch (Exception e) {
            user = null;
        }
        return user;
    }

    @Override
    public List<User> findByStatusUser(String status) {
        return null;
    }

    @Override
    public void updateByIdUser(String idUser, User user) {

    }

    @Override
    public void changePassword(String username, User user) {
        synchronized (this) {
            //encoder password sebelum masuk database
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.changePassword(username,user);
        }
    }

    @Override
    public void deleteUserById(String idUser) {

    }

    @Override
    public int countingUsersRows() {
        return 0;
    }

    @Override
    public boolean isUserExist(User user) {
        return findByName(user.getNamaUser()) != null;
    }
}
