package com.project.secureparkir.repository;

import com.project.secureparkir.model.User;

import java.util.List;

public interface UserRepository {

    //CRUD Maintenance, relation to databases!

    //findLastIdUser
    User findLastIdUser();

    //Save User
    void saveUser(User user);

    //Read the Data------------------------------------------

    //Read the Data by id
    List<User> findByIdUser(String idUser);

    //Read the Data by Username
    User findByUsername(String username);

    //Read Data List by Username
    List<User> findListByUsername(String username);

    //Read the Data by Username
    User findByName(String name);

    //Update the Data----------------------------------------
    void updateByIdUser(String idUser, User user);

    //Change Password----------------------------------------
    void changePassword(String username, User user);

    //Delete the Data----------------------------------------

    //Delete the Data (1 Data) by id
    void deleteUserById(String idUser);

    //Test Tambahan (take it or leave it)
    List<User> readDataByQuery(String query, String pagging);

    int countAllDataByQuery(String query);
}
