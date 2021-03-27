package com.project.secureparkir.repository;

import com.project.secureparkir.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
                            0,null,null,null,0
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
        LocalDate date = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM-dd-YY");
        member.setTglRegister(dtf.format(date));

        //Biaya Member ---> motor : 60000 ; mobil : 120000

        if (member.getIdJenis() == 1) member.setBiayaMember(60000);
        else if (member.getIdJenis() == 2) member.setBiayaMember(120000);

        //Set awal member daftar
        member.setDieditOleh("-");
        member.setTglEdit("-");
        //-------------------------------------------------------------------------------------------------

        String sql = "INSERT INTO member(idMember,namaMember,noPol," +
                "idJenis,tglRegister,status,dibuatOleh,dieditOleh,tglEdit,biayaMember) VALUES(?,?,?,?,?,?,?,?,?,?)";
        databases.update(sql,
                member.getIdMember(),
                member.getNamaMember(),
                member.getNoPol(),
                member.getIdJenis(),
                member.getTglRegister(),
                member.getStatus(),
                member.getDibuatOleh(),
                member.getDieditOleh(),
                member.getTglEdit(),
                member.getBiayaMember());
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
                                resultSet.getDouble("biayaMember"),
                                resultSet.getString("jenis"),
                                resultSet.getDouble("value")
                        )));
    }

    @Override
    public Member findByNoPlat(String noPlat) {
        String sql = "select * from member m inner join jeniskendaraan j on m.idJenis = j.idJenis and m.noPol = '"+noPlat+"'";
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
                                resultSet.getDouble("biayaMember"),
                                resultSet.getString("jenis"),
                                resultSet.getDouble("value")
                        )));
    }

    @Override
    public Member findByIdMember(String idMember) {
        String sql = "select * from member m inner join jeniskendaraan j on m.idJenis = j.idJenis and m.idMember = '"+idMember+"'";
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
                                resultSet.getDouble("biayaMember"),
                                resultSet.getString("jenis"),
                                resultSet.getDouble("value")
                        )));
    }

    @Override
    public void updateByIdMember(String idMember, Member member) {
        String sqlUpdate = "UPDATE member SET namaMember = ?, noPol = ?, " +
                "idJenis = ?, status = ?, biayaMember = ?, " +
                "dieditOleh = ?, tglEdit = ? WHERE idMember = ?";

        //Config-----------------------------------------------------------------
        if (member.getIdJenis() == 1) member.setBiayaMember(60000);
        else if (member.getIdJenis() == 2) member.setBiayaMember(120000);
        //-----------------------------------------------------------------------
        //Biaya Member ---> motor : 60000 ; mobil : 120000
        LocalDate date = LocalDate.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM-dd-YY");
        member.setTglEdit(dtf.format(date));
        //-----------------------------------------------------------------------

        databases.update(sqlUpdate,
                member.getNamaMember(),
                member.getNoPol(),
                member.getIdJenis(),
                member.getStatus(),
                member.getBiayaMember(),
                member.getDieditOleh(),
                member.getTglEdit(),
                idMember);
    }

    @Override
    public void deleteMemberById(String idMember) {
        String sqlDelete = "DELETE FROM member WHERE idMember ='" + idMember + "'";
        databases.execute(sqlDelete);
    }

    @Override
    public List<Member> readDataByQuery(String query, String pagging) {
        //id, nama, noPlat, status
        List<Member> memberList;
        memberList = databases.query("select * from member m inner join jeniskendaraan j on m.idJenis = j.idJenis "+query+" "+pagging+"",
                (resultSet, i) ->
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
                                resultSet.getDouble("biayaMember"),
                                resultSet.getString("jenis"),
                                resultSet.getDouble("value")
                        ));
        return memberList;
    }

    @Override
    public int countAllDataByQuery(String query) {
        String sql = "SELECT COUNT(namaMember) as count FROM member " + query;
        int countMember = databases.queryForObject(
                sql, Integer.class);
        return countMember;
    }

    @Override
    public int countDataMotorByQuery(String query) {
        String sql = "SELECT COUNT(namaMember) as count FROM member " + query;
        int countMember = databases.queryForObject(
                sql, Integer.class);
        return countMember;
    }

    @Override
    public int countDataCarByQuery(String query) {
        String sql = "SELECT COUNT(namaMember) as count FROM member " + query;
        int countMember = databases.queryForObject(
                sql, Integer.class);
        return countMember;
    }

    @Override
    public double sumAllData(String query) {
        String sql = "select sum(biayaMember) as biayaTotal from member "+query+"";
        double sumTotal = databases.queryForObject(
                sql, Double.class);
        return sumTotal;
    }
}
