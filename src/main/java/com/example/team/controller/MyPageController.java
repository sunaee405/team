package com.example.team.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpSession;

@RestController
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	
	// 공통코드 불러오기
	public Map<String, Object> getDetailCode() {
		
		String jsonStr = myPageService.getDetailCode();
		Map<String, Object> code = new HashMap<String, Object>();
		try {
			code = objectMapper.readValue(jsonStr, new TypeReference<Map<String, Object>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return code;
	}
	
			
	
	// 테이블 공통코드 변환
	public <T> T transCode(Object data) {
	    try {
	    	
	    	System.out.println(data);
			Map<String, Object> code = getDetailCode();
			
			String str = data.toString();

		    // 키를 | 로 구분해 정규표현식에 사용할 문자열 패턴 생성
		    String regex = String.join("|", code.keySet());
		    
		    // 정규표현식 패턴
		    Pattern pattern = Pattern.compile(regex);
		    
		    // 치환
		    String result = pattern.matcher(str).replaceAll(match -> {
		        String matchedKey = match.group();
		        return code.get(matchedKey).toString();
		    });
		    
		    result = result.replaceAll("(\\w+)=([\\s\\S]*?)(?=,|\\})", "\"$1\":\"$2\"") // 키에 큰따옴표 추가
				    	   .replaceAll("=\"\"", ": \"\"") // 빈 값 처리
				    	   .replaceAll("=(\\d+)", ": $1") // 숫자는 그대로 유지
				    	   .replaceAll("=(\\w+)", ": \"$1\""); // 문자열 값에 큰따옴표 추가
		    
		    System.out.println(result);
		    
		    if (data instanceof Map) {
	            return (T) objectMapper.readValue(result, Map.class);
	        } else if (data instanceof List) {
	        	
	            return (T) objectMapper.readValue(result, List.class);
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
		}
	    
		return (T) "실패";
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
		
		productList = transCode(productList);
		
		if(productList != null && !productList.isEmpty()) {
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
		
		
		data.put("USERID", userId);
		
		boolean check = myPageService.updateChat(data);
		
		
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
		
		if(chattingEntity == null || chattingEntity.size() == 0) {
			myPageService.insertChatRoom(data);
			chattingEntity = myPageService.getChatRoom(data);
		}
		

		return ResponseEntity.status(HttpStatus.OK).body(chattingEntity);
	}
	
	
	

}
