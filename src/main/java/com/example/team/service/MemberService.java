package com.example.team.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.model.MemberEntity;
import com.example.team.persistence.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public long checkId(String MEM_ID) {
        return memberRepository.countById(MEM_ID);
    }

    public long checkNickname(String MEM_NICK) {
        return memberRepository.countByNickname(MEM_NICK);
    }
    
    public boolean checkPhone(String phone) {
        return memberRepository.checkPhone(phone);
    }

    public void insertUser(Map<String, String> data) {
        MemberEntity member = MemberEntity.builder()
            .MEM_ID(data.get("MEM_ID"))    
            .MEM_PW(data.get("MEM_PW"))      
            .MEM_NAME(data.get("MEM_NAME"))   
            .MEM_NICK(data.get("MEM_NICK"))   
            .MEM_GENDER(data.get("MEM_GENDER"))
            .MEM_TEL(data.get("MEM_TEL"))       
            .MEM_BIRTH(data.get("MEM_BIRTH")) 
            .MEM_EMAIL(data.get("MEM_EMAIL"))    
            .MEM_STATUS(data.get("MEM_STATUS"))  
            .MEM_SNS(data.get("MEM_SNS"))        
            .build();

        memberRepository.save(member);
    }
}
