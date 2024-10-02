package com.example.team.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("members/{memNo}")
    public MemberEntity getMainCode(@PathVariable("memNo") Long memNo) {
        return memberService.findById(memNo); // 조회
    }
    
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
    
    @PutMapping("members/{memNo}")
    public ResponseEntity<MemberEntity> updateMember(
    		@PathVariable("memNo") Long memNo, 
    		@RequestBody Map<String, Object> updates) {
    	// 서비스 메서드를 호출하여 업데이트
        MemberEntity updatedMember = memberService.updateMember(memNo, updates);
    	
    	// 업데이트 로직
        return ResponseEntity.ok(updatedMember);
    }
    
    @PutMapping("/members/delete")
    public ResponseEntity<String> deleteMember(@RequestBody Map<String, Object> data) {
        Long memNo = Long.valueOf((String) data.get("mem_no")); // mem_no를 Long으로 변환
        memberService.updateMemberStatus(memNo, data); // 서비스 호출
        return ResponseEntity.ok("탈퇴 유예처리가 완료되었습니다.");
    }
    
    // 상태를 업데이트하는 메서드
    @PutMapping("/members/status")
    public ResponseEntity<String> updateMemberStatus(@RequestBody Map<String, Object> data) {
        Long memNo = Long.valueOf((String) data.get("mem_no"));
        memberService.cancelMemberStatus(memNo, data);
        return ResponseEntity.ok("상태가 업데이트되었습니다.");
    }
//
//    @DeleteMapping("members")
//    public void deleteMembers(@RequestBody List<Long> ids) {
//    	for (Long id : ids) {
//    		memberService.delete(id); // 각 ID로 삭제 메서드 호출
//        }
//    }

}
