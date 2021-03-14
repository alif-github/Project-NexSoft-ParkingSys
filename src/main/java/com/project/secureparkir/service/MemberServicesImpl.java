package com.project.secureparkir.service;

import com.project.secureparkir.model.Member;
import com.project.secureparkir.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public boolean isMemberExist(Member member) {
        return findByName(member.getNamaMember()) != null;
    }
}
