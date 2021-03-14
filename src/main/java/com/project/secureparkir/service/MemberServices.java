package com.project.secureparkir.service;

import com.project.secureparkir.model.Member;

public interface MemberServices {

    //CRUD Service, validation before databases!

    //Save Member
    void saveMember(Member member);

    //Read the Data by Name
    Member findByName(String name);

    //is Member Exist
    //to check is member data exist or not
    boolean isMemberExist(Member member);
}
