package com.project.secureparkir.service;

import com.project.secureparkir.model.Member;

import java.util.List;
import java.util.Map;

public interface MemberServices {

    //CRUD Service, validation before databases!

    //Save Member
    void saveMember(Member member);

    //Read the Data by Name
    Member findByName(String name);

    //Read the Data by Name
    Member findByNoPlat(String noPlat);

    //Read Data by query
    List<Member> readDataByQuery(Map<Object, Object> params);

    //Count Data by query
    int countAllDataByQuery(Map <Object, Object> params);

    //is Member Exist
    //to check is member data exist or not
    boolean isMemberExist(Member member);

    //is Member Exist
    //to check is member data exist or not
    boolean isNoPlatExist(Member member);
}
