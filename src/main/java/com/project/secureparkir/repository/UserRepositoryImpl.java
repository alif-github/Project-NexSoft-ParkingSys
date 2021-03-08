package com.project.secureparkir.repository;

import com.project.secureparkir.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository("userRepository")
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    JdbcTemplate databases; //connect to database

    @Override
    public User findLastIdUser() {
        String querySql = "SELECT idUser FROM user ORDER BY idUser DESC LIMIT 1";
        return databases.queryForObject(querySql,
                (rs,rowNum) ->
                    new User(
                            rs.getString("idUser"),
                            null,null,null,null,null,null,
                            null,0
                    ));
    }

    @Override
    public void saveUser(User user) {
        //-------------------------------------------------------------------------------------------------
        // FORMAT ID untuk id user
        //-------------------------------------------------------------------------------------------------
        //because the ID is set unique and suit with request user, we made the special configure ID
        String lastID = "SID-000";
        String newID;

        try {
            //get return last id
            lastID = findLastIdUser().getIdUser();
        } catch (Exception e) {
            System.out.println("Message Error Not Found");
        } finally {
            int idNum = Integer.parseInt(lastID.substring(4)); //parsing to integer
            int idNumNext = idNum + 1; //id plus 1
            String idParsing = String.valueOf(idNumNext); //id parsing to string
            int lengthIdParsing = idParsing.length(); //sum length
            if (lengthIdParsing == 2) {
                newID = "SID-" + "0" + idParsing;
            } else if (lengthIdParsing <= 1) {
                newID = "SID-" + "00" + idParsing;
            } else {
                newID = "SID-" + idParsing;
            }
        }
        //-------------------------------------------------------------------------------------------------
        user.setIdUser(newID);
        user.setStatus(false); //when first time made in, status automatic false(non-active)
        user.setTglRegister(String.valueOf(new Date())); //date automatic generate today date and current time
        //-------------------------------------------------------------------------------------------------

        String sql = "INSERT INTO user(idUser,namaUser,email," +
                "username,password,alamat,status,tglRegister,idPosisi) VALUES(?,?,?,?,?,?,?,?,?)";
        databases.update(sql,
                user.getIdUser(),
                user.getNamaUser(),
                user.getEmail(),
                user.getUsername(),
                user.getPassword(),
                user.getAlamat(),
                user.getStatus(),
                user.getTglRegister(),
                2);
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
        String sql = "SELECT * FROM user WHERE username = ?";
        return databases.queryForObject(sql,
                new Object[]{username},
                (rs, rowNum) ->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("email"),
                                rs.getString("username"),
                                rs.getString("password"),
                                rs.getString("alamat"),
                                rs.getBoolean("status"),
                                rs.getString("tglRegister"),
                                rs.getInt("idPosisi")
                        ));
    }

    @Override
    public User findByName(String name) {
        String sql = "SELECT * FROM user WHERE namaUser = ?";
        return databases.queryForObject(sql,
                new Object[]{name},
                (rs, rowNum) ->
                        new User(
                                rs.getString("idUser"),
                                rs.getString("namaUser"),
                                rs.getString("email"),
                                rs.getString("username"),
                                rs.getString("password"),
                                rs.getString("alamat"),
                                rs.getBoolean("status"),
                                rs.getString("tglRegister"),
                                rs.getInt("idPosisi")
                        ));
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
        String sql = "UPDATE user SET password = ? WHERE username = ?;";
        databases.update(sql, user.getPassword(), username);
    }

    @Override
    public void deleteUserById(String idUser) {

    }

    @Override
    public int countingUsersRows() {
        return 0;
    }
}
