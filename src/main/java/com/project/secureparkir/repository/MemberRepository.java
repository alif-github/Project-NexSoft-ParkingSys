package com.project.secureparkir.repository;

import com.project.secureparkir.model.Member;

import java.util.List;
import java.util.Map;

public interface MemberRepository {

    //CRUD Maintenance, relation to databases!

    //findLastIdUser
    Member findLastIdMember();

    //Save Member
    void saveMember(Member member);

    //Read the Data by Name
    Member findByName(String name);

    //Read the Data by noPlat
    Member findByNoPlat(String noPlat);

    //Read the Data by idMember
    Member findByIdMember(String idMember);

    //Update the Data
    void updateByIdMember(String idMember, Member member);

    //Delete the Data (1 Data) by id
    void deleteMemberById(String idMember);

    //Read Data by Query
    List<Member> readDataByQuery(String query, String pagging);

    //Count Daya by Query
    int countAllDataByQuery(String query);

    //Count Data Motor Member by query
    int countDataMotorByQuery(String query);

    //Count Data Car Member by query
    int countDataCarByQuery(String query);

    //Sum money income from member
    double sumAllData(String query);
}
