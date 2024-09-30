package com.example.team.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.MemberEntity;
import com.example.team.persistence.MemberRepository;
import com.example.team.service.MemberService;

@RestController
@RequestMapping("/admin/*")
public class AdminController {
	
	@Autowired
    private MemberService memberService;
	
	@GetMapping("members")
    public List<MemberEntity> getAllMemberEntities() {
        return memberService.findAll();
    }

//    @GetMapping("/{ID}")
//    public MainCodeEntity getMainCode(@PathVariable Long ID) {
//        return mainCodeService.findById(ID); // 조회
//    }
    
//    @PostMapping("members")
//    public void insertdetailCode(@RequestBody List<MemberEntity> members) {
//    	memberService.save(members); 
//    }
//
    @PutMapping("members")
    public void updateMembers(@RequestBody List<MemberEntity> members) {
    	System.out.println("Received subCodes: " + members);
        for (MemberEntity member : members) {
        	memberService.update(member.getMemNo(), member); // 각 디테일코드 업데이트
        }
    }
//
//    @DeleteMapping("members")
//    public void deleteMembers(@RequestBody List<Long> ids) {
//    	for (Long id : ids) {
//    		memberService.delete(id); // 각 ID로 삭제 메서드 호출
//        }
//    }

}
