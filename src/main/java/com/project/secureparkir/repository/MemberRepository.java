package com.project.secureparkir.repository;

import com.project.secureparkir.model.Member;

public interface MemberRepository {

    //CRUD Maintanance, relation to databases!

    //findLastIdUser
    Member findLastIdMember();

    //Save Member
    void saveMember(Member member);

    //Read the Data by Name
    Member findByName(String name);
}
