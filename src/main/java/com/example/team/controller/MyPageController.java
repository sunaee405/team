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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.ChattingEntity;
import com.example.team.service.MyPageService;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	
	// 공통코드 불러오기
	@GetMapping("/getDetailCode")
	public ResponseEntity<?> getDetailCode() {
		Map<String, Object> code = myPageService.getDetailCode();
		System.out.println(code);
		return ResponseEntity.ok().body(code);
	}
	
	
	// 상단영역 카테고리 불러오기
	@GetMapping("/getCategory")
	public ResponseEntity getCategory() {
		List<Map<String, Object>> categoryList = myPageService.getCategory();
		
		return ResponseEntity.ok().body(categoryList);
	}
	
	
	
	// 메인페이지 상품메뉴 생성
	@GetMapping("/getMainProductList")
	public ResponseEntity<?> getMainProductList(@RequestParam Map<String, Object> data) {
		
		List<Map<String, Object>> productList = myPageService.getMainProductList(data);
		
		if(!productList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(productList);
		} else {
			return ResponseEntity.badRequest().body("emptyList");
		}
	}
	
	
	
	// 세션에서 값 가져오기
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
		int user1 = Integer.parseInt((String)data.get("SELMEMBER"));
//		int user2 = session.getAttribute("memberNum");
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
