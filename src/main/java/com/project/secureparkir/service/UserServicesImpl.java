package com.project.secureparkir.service;

import com.project.secureparkir.model.User;
import com.project.secureparkir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    public boolean isNameExist(User user) {
        return findByName(user.getNamaUser()) != null;
    }

    @Override
    public List<User> readDataByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";
            String pagging = "";

            ArrayList<String> whereQuery = new ArrayList<>();
            ArrayList<String> pageQuery = new ArrayList<>();

            if (params.containsKey("idUser") && !String.valueOf(params.get("idUser")).isBlank())
                whereQuery.add("idUser LIKE '%"+params.get("idUser")+"%'");
            if (params.containsKey("username") && !String.valueOf(params.get("username")).isBlank())
                whereQuery.add("username LIKE '%"+params.get("username")+"%'");
            if (params.containsKey("status") && !String.valueOf(params.get("status")).isBlank())
                whereQuery.add("status="+params.get("status")+"");
            if (params.containsKey("posisi") && !String.valueOf(params.get("posisi")).isBlank())
                whereQuery.add("posisi='"+params.get("posisi")+"'");
            if (params.containsKey("limit") && !String.valueOf(params.get("limit")).isBlank())
                pageQuery.add(" LIMIT "+params.get("limit"));
            if (params.containsKey("offset") && !String.valueOf(params.get("offset")).isBlank())
                pageQuery.add(" OFFSET "+params.get("offset"));

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);
            if (!pageQuery.isEmpty()) {
                pagging += String.join(" ", pageQuery);
            }
            return userRepository.readDataByQuery(query,pagging);
        }
    }

    @Override
    public int countAllDataByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idUser") && !String.valueOf(params.get("idUser")).isBlank())
                whereQuery.add("idUser LIKE '%"+params.get("idUser")+"%'");
            if (params.containsKey("username") && !String.valueOf(params.get("username")).isBlank())
                whereQuery.add("username LIKE '%"+params.get("username")+"%'");
            if (params.containsKey("status") && !String.valueOf(params.get("status")).isBlank())
                whereQuery.add("status="+params.get("status")+"");
            if (params.containsKey("posisi") && !String.valueOf(params.get("posisi")).isBlank())
                whereQuery.add("posisi='"+params.get("posisi")+"'");

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return userRepository.countAllDataByQuery(query);
        }
    }
}
