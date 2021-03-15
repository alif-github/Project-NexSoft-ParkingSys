package com.project.secureparkir.repository;

import com.project.secureparkir.model.Member;

import java.util.List;

public interface MemberRepository {

    //CRUD Maintanance, relation to databases!

    //findLastIdUser
    Member findLastIdMember();

    //Save Member
    void saveMember(Member member);

    //Read the Data by Name
    Member findByName(String name);

    //Read the Data by noPlat
    Member findByNoPlat(String noPlat);

    //Read Data by Query
    List<Member> readDataByQuery(String query, String pagging);

    //Count Daya by Query
    int countAllDataByQuery(String query);
}
