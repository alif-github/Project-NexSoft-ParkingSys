package com.project.secureparkir.repository;

import com.project.secureparkir.model.User;

import java.util.List;

public interface UserRepository {

    //CRUD Maintanance, relation to databases!

    //findLastIdUser
    User findLastIdUser();

    //Save User
    void saveUser(User user);

    //Read the Data------------------------------------------

    //Read All Data With Paggination
    List<User> findAllUserPagging(int page , int limit , String idUser, String username, String status);

    //Read the Data by id
    List<User> findByIdUser(String idUser);

    //Read the Data by Username
    User findByUsername(String username);

    //Read Data List by Username
    List<User> findListByUsername(String username);

    //Read the Data by Username
    User findByName(String name);

    //Read the Data by status
    List<User> findByStatusUser(String status);

    //Update the Data----------------------------------------
    void updateByIdUser(String idUser, User user);

    //Change Password----------------------------------------
    void changePassword(String username, User user);

    //Delete the Data----------------------------------------

    //Delete the Data (1 Data) by id
    void deleteUserById(String idUser);

    //API for Pagination
    int countingUsersRows();
}
