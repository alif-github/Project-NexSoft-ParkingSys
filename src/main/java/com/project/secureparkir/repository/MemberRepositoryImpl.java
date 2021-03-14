package com.project.secureparkir.repository;

import com.project.secureparkir.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository("memberRepository")
public class MemberRepositoryImpl implements MemberRepository {

    @Autowired
    JdbcTemplate databases; //connect to database

    @Override
    public Member findLastIdMember() {
        String querySql = "SELECT idMember FROM member ORDER BY idMember DESC LIMIT 1";
        return databases.queryForObject(querySql,
                (rs, rowNum) ->
                    new Member(
                            rs.getString("idMember"),
                            null,null,null,null,
                            0,null,null,null
                    ));
    }

    @Override
    public void saveMember(Member member) {
        //-------------------------------------------------------------------------------------------------
        // FORMAT ID untuk id Member
        //-------------------------------------------------------------------------------------------------
        //because the ID is set unique and suit with request user, we made the special configure ID

        String lastID = "MEMBER-000";
        String newID;

        try {
            //get return last id
            lastID = findLastIdMember().getIdMember();
        } catch (Exception e) {
            System.out.println("Message Error Not Found");
        } finally {
            int idNum = Integer.parseInt(lastID.substring(7)); //parsing to integer
            int idNumNext = idNum + 1; //id plus 1
            String idParsing = String.valueOf(idNumNext); //id parsing to string
            int lengthIdParsing = idParsing.length(); //sum length
            if (lengthIdParsing == 2) {
                newID = "MEMBER-" + "0" + idParsing;
            } else if (lengthIdParsing <= 1) {
                newID = "MEMBER-" + "00" + idParsing;
            } else {
                newID = "MEMBER-" + idParsing;
            }
        }

        //-------------------------------------------------------------------------------------------------
        member.setIdMember(newID);
        member.setStatus(true); //when first time made in, status automatic true(active)
        member.setTglRegister(String.valueOf(new Date())); //date automatic generate today date and current time
        //-------------------------------------------------------------------------------------------------

        String sql = "INSERT INTO member(idMember,namaMember,noPol," +
                "idJenis,tglRegister,status,dibuatOleh,dieditOleh,tglEdit) VALUES(?,?,?,?,?,?,?,?,?)";
        databases.update(sql,
                member.getIdMember(),
                member.getNamaMember(),
                member.getNoPol(),
                member.getIdJenis(),
                member.getTglRegister(),
                member.getStatus(),
                member.getDibuatOleh(),
                member.getDieditOleh(),
                member.getTglEdit());
    }

    @Override
    public Member findByName(String name) {
        String sql = "select * from member m inner join jeniskendaraan j on m.idJenis = j.idJenis and m.namaMember = '"+name+"'";
        return databases.queryForObject(sql,
                ((resultSet, i) ->
                        new Member(
                                resultSet.getString("idMember"),
                                resultSet.getString("namaMember"),
                                resultSet.getString("tglRegister"),
                                resultSet.getBoolean("status"),
                                resultSet.getString("noPol"),
                                resultSet.getInt("idJenis"),
                                resultSet.getString("dibuatOleh"),
                                resultSet.getString("dieditOleh"),
                                resultSet.getString("tglEdit"),
                                resultSet.getString("jenis"),
                                resultSet.getDouble("value")
                        )));
    }
}
