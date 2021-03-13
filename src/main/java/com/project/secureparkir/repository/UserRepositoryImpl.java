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
                (rs, rowNum) ->
                        new User(
                                rs.getString("idUser"),
                                null, null, null, null, null, null,
                                null, 0
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
    public List<User> findAllUserPagging(int page, int limit, String idUser, String username, String status) {

        List<User> userList;

        if (idUser != "") {
            String sql = "SELECT COUNT(namaUser) as count FROM user where idUser like ?";
            int numberPages;
            numberPages = databases.query(sql,
                    new Object[]{"%"+idUser+"%"},
                    (rs, rowNum) -> rs.getInt("count")).get(0);

            //validate data page
            if (page < 1) {
                page = 1;
            }
            if (page > numberPages) {
                page = numberPages;
            }

            int start = (page - 1) * limit;

            userList = databases.query("select * from user u inner join posisi p on u.idPosisi = p.idPosisi and u.idUser like ? order by posisi , namaUser ASC limit "+start+","+limit+";",
                    new Object[]{"%"+idUser+"%"},
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
                                    rs.getInt("idPosisi"),
                                    rs.getString("posisi")
                            ));
            return userList;
        } else if (username != "") {
            String sql = "SELECT COUNT(namaUser) as count FROM user where username like ?";
            int numberPages;
            numberPages = databases.query(sql,
                    new Object[]{"%"+username+"%"},
                    (rs, rowNum) -> rs.getInt("count")).get(0);

            //validate data page
            if (page < 1) {
                page = 1;
            }
            if (page > numberPages) {
                page = numberPages;
            }

            int start = (page - 1) * limit;

            userList = databases.query("select * from user u inner join posisi p on u.idPosisi = p.idPosisi and u.username like ? order by posisi , namaUser ASC limit "+start+","+limit+";",
                    new Object[]{"%"+username+"%"},
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
                                    rs.getInt("idPosisi"),
                                    rs.getString("posisi")
                            ));
            return userList;
        } else if (status != "") {
            String sql = "SELECT COUNT(namaUser) as count FROM user where status like ?";
            int numberPages;
            numberPages = databases.query(sql,
                    new Object[]{"%"+status+"%"},
                    (rs, rowNum) -> rs.getInt("count")).get(0);

            //validate data page
            if (page < 1) {
                page = 1;
            }
            if (page > numberPages) {
                page = numberPages;
            }

            int start = (page - 1) * limit;

            userList = databases.query("select * from user u inner join posisi p on u.idPosisi = p.idPosisi and u.status like ? order by posisi , namaUser ASC limit "+start+","+limit+";",
                    new Object[]{"%"+status+"%"},
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
                                    rs.getInt("idPosisi"),
                                    rs.getString("posisi")
                            ));
            return userList;
        } else {
            String sql = "SELECT COUNT(namaUser) as count FROM user";
            int numberPages;
            numberPages = databases.query(sql,
                    (rs, rowNum) -> rs.getInt("count")).get(0);

            //validate data page
            if (page < 1) {
                page = 1;
            }
            if (page > numberPages) {
                page = numberPages;
            }

            int start = (page - 1) * limit;

            userList = databases.query("select * from user u inner join posisi p on u.idPosisi = p.idPosisi order by posisi , namaUser ASC limit "+start+","+limit+";",
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
                                    rs.getInt("idPosisi"),
                                    rs.getString("posisi")
                            ));
            return userList;
        }
    }

    @Override
    public List<User> findByIdUser(String idUser) {
        String sql = "select * from user u inner join posisi p on u.idPosisi = p.idPosisi where u.idUser LIKE ?;";
        return databases.query(sql,
                new Object[]{"%"+idUser+"%"},
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
                                rs.getInt("idPosisi"),
                                rs.getString("posisi")
                        ));
    }

    @Override
    public User findByUsername(String username) {
        String sql = "select * from user u inner join posisi p on u.idPosisi = p.idPosisi where u.username = ?;";
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
                                rs.getInt("idPosisi"),
                                rs.getString("posisi")
                        ));
    }

    @Override
    public List<User> findListByUsername(String username) {
        String sql = "select * from user u inner join posisi p on u.idPosisi = p.idPosisi where u.username LIKE ?;";
        return databases.query(sql,
                new Object[]{"%"+username+"%"},
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
                                rs.getInt("idPosisi"),
                                rs.getString("posisi")
                        ));
    }

    @Override
    public User findByName(String name) {
        String sql = "select * from user u inner join posisi p on u.idPosisi = p.idPosisi and u.namaUser = '"+name+"'";
        return databases.queryForObject(sql,
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
                                rs.getInt("idPosisi"),
                                rs.getString("posisi")
                        ));
    }

    @Override
    public List<User> findByStatusUser(String status) {
        return null;
    }

    @Override
    public void updateByIdUser(String idUser, User user) {
        String sqlUpdate = "UPDATE user SET idUser = ?, namaUser = ?, email = ?, username = ?, password = ?, alamat = ?, status = ?, tglRegister = ?, idPosisi = ? " +
                "WHERE idUser = ?";
        databases.update(sqlUpdate,
                user.getIdUser(),
                user.getNamaUser(),
                user.getEmail(),
                user.getUsername(),
                user.getPassword(),
                user.getAlamat(),
                user.getStatus(),
                user.getTglRegister(),
                user.getIdPosisi(),
                idUser);
    }

    @Override
    public void changePassword(String username, User user) {
        String sql = "UPDATE user SET password = ? WHERE username = ?;";
        databases.update(sql, user.getPassword(), username);
    }

    @Override
    public void deleteUserById(String idUser) {
        String sqlDelete = "DELETE FROM user WHERE idUser ='" + idUser + "'";
        databases.execute(sqlDelete);
    }

    @Override
    public int countingUsersRows() {
        String sql = "SELECT COUNT(namaUser) as count FROM user";
        int result = databases.queryForObject(
                sql, Integer.class);
        return result;
    }

    @Override
    public List<User> readDataByQuery(String query, String pagging) {
        List<User> userList;
        userList = databases.query("select * from user u inner join posisi p on u.idPosisi = p.idPosisi "+query+" order by posisi , namaUser ASC "+pagging+"",
                (rs, i) ->
                    new User(
                            rs.getString("idUser"),
                            rs.getString("namaUser"),
                            rs.getString("email"),
                            rs.getString("username"),
                            rs.getString("password"),
                            rs.getString("alamat"),
                            rs.getBoolean("status"),
                            rs.getString("tglRegister"),
                            rs.getInt("idPosisi"),
                            rs.getString("posisi")
                    ));
        return userList;
    }

    @Override
    public int countAllDataByQuery(String query) {
        String sql = "SELECT COUNT(namaUser) as count FROM user " + query;
        int countUser = databases.queryForObject(
                sql, Integer.class);
        return countUser;
    }
}
