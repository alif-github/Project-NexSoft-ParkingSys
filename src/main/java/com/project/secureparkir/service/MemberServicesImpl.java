package com.project.secureparkir.service;

import com.project.secureparkir.model.Member;
import com.project.secureparkir.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("memberService")
public class MemberServicesImpl implements MemberServices {

    @Autowired
    MemberRepository memberRepository;

    @Override
    public void saveMember(Member member) {
        //untuk mensinkronkan penulisan data ke memori
        synchronized (this) {
            memberRepository.saveMember(member);
        }
    }

    @Override
    public Member findByName(String name) {
        Member member;
        try {
            member = memberRepository.findByName(name);
        } catch (Exception e) {
            member = null;
        }
        return member;
    }

    @Override
    public Member findByNoPlat(String noPlat) {
        Member member;
        try {
            member = memberRepository.findByNoPlat(noPlat);
        } catch (Exception e) {
            member = null;
        }
        return member;
    }

    @Override
    public Member findByIdMember(String idMember) {
        Member member;
        try {
            member = memberRepository.findByIdMember(idMember);
        } catch (Exception e) {
            member = null;
        }
        return member;
    }

    @Override
    public List<Member> readDataByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";
            String pagging = "";

            ArrayList<String> whereQuery = new ArrayList<>();
            ArrayList<String> pageQuery = new ArrayList<>();

            if (params.containsKey("idMember") && !String.valueOf(params.get("idMember")).isBlank())
                whereQuery.add("idMember LIKE '%"+params.get("idMember")+"%'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol LIKE '%"+params.get("noPol")+"%'");
            if (params.containsKey("namaMember") && !String.valueOf(params.get("namaMember")).isBlank())
                whereQuery.add("namaMember LIKE '%"+params.get("namaMember")+"%'");
            if (params.containsKey("status") && !String.valueOf(params.get("status")).isBlank())
                whereQuery.add("status="+params.get("status")+"");
            if (params.containsKey("limit") && !String.valueOf(params.get("limit")).isBlank())
                pageQuery.add(" LIMIT "+params.get("limit"));
            if (params.containsKey("offset") && !String.valueOf(params.get("offset")).isBlank())
                pageQuery.add(" OFFSET "+params.get("offset"));

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);
            if (!pageQuery.isEmpty()) {
                pagging += String.join(" ", pageQuery);
            }
            return memberRepository.readDataByQuery(query,pagging);
        }
    }

    @Override
    public int countAllDataByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idMember") && !String.valueOf(params.get("idMember")).isBlank())
                whereQuery.add("idMember LIKE '%"+params.get("idMember")+"%'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol LIKE '%"+params.get("noPol")+"%'");
            if (params.containsKey("namaMember") && !String.valueOf(params.get("namaMember")).isBlank())
                whereQuery.add("namaMember LIKE '%"+params.get("namaMember")+"%'");
            if (params.containsKey("status") && !String.valueOf(params.get("status")).isBlank())
                whereQuery.add("status="+params.get("status")+"");

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return memberRepository.countAllDataByQuery(query);
        }
    }

    @Override
    public void updateByIdMember(String idMember, Member member) {
        synchronized (this) {
            memberRepository.updateByIdMember(idMember, member);
        }
    }

    @Override
    public void deleteMemberById(String idMember) {
        synchronized (this) {
            memberRepository.deleteMemberById(idMember);
        }
    }

    @Override
    public double sumAllData(String date) {
        return 0;
    }

    @Override
    public boolean isMemberExist(Member member) {
        return findByName(member.getNamaMember()) != null;
    }

    @Override
    public boolean isNoPlatExist(Member member) {
        return findByNoPlat(member.getNoPol()) != null;
    }
}
