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
    public List<User> findAllUserPagging(int page, int limit, String idUser, String username, String status) {
        List<User> userList;
        try {
            userList = userRepository.findAllUserPagging(page, limit, idUser, username, status);
        } catch (Exception e) {
            userList = null;
        }
        return userList;
    }

    @Override
    public List<User> findByIdUser(String idUser) {
        List<User> user;
        try {
            user = userRepository.findByIdUser(idUser);
        } catch (Exception e) {
            user = null;
        }
        return user;
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
    public List<User> findListByUsername(String username) {
        List<User> user;
        try {
            user = userRepository.findListByUsername(username);
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
        synchronized (this) {
            userRepository.updateByIdUser(idUser, user);
        }
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
        synchronized (this) {
            userRepository.deleteUserById(idUser);
        }
    }

    @Override
    public int countingUsersRows() {
        int count = userRepository.countingUsersRows();
        return count;
    }

    @Override
    public boolean isNameExist(User user) {
        return findByName(user.getNamaUser()) != null;
    }
}
