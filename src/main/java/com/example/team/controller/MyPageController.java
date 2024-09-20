package com.example.team.controller;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.ChattingEntity;
import com.example.team.service.MyPageService;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	
	
	@GetMapping("/getSession")
	public String getSession(HttpSession session) {
//		String memberNum = (String) session.getAttribute("memberNum");
		String memberNum = "2";
		return memberNum;
	}
	
	
	
	// 채팅방 채팅로그 업데이트
	@PostMapping("/updateChat")
	public ResponseEntity<?> updateChat(@RequestBody Map<String, Object> data, HttpSession session) {
//		String userId = session.getAttribute("memberNum");
		final String userId = "2";
		
		System.out.println(data);
		
		data.put("USERID", userId);
		
		boolean check = myPageService.updateChat(data);
		
		System.out.println(check);
		
		if(check) {
			List<ChattingEntity> chattingEntity = myPageService.getChatRoom(data);
			return ResponseEntity.ok(chattingEntity);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failedUpdate");
		}
	}
	
	
	
	
	
	// 채팅방 값 찾기 + 값 없으면 채팅방 생성
	@PostMapping("/chatRoom")
	public ResponseEntity<?> getChatRoom(@RequestBody Map<String, Object> data, HttpSession session) {
//		int user2 = session.getAttribute("memberNum");
		int user1 = Integer.parseInt((String)data.get("user1"));
		int user2 = 2;
		
		
		if(user1 > user2) {
			int num = user1;
			user1 = user2;
			user2 = num;
		}
		data.put("CHA_MEM1", user1);
		data.put("CHA_MEM2", user2);
		
		List<ChattingEntity> chattingEntity = myPageService.getChatRoom(data);
		if(chattingEntity == null) {
			myPageService.insertChatRoom(data);
			chattingEntity = myPageService.getChatRoom(data);
		}

		return ResponseEntity.status(HttpStatus.OK).body(chattingEntity);
	}
	
	
	

}
