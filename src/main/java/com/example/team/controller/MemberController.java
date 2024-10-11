package com.example.team.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.MemberEntity;
import com.example.team.persistence.MemberRepository;
import com.example.team.service.MemberService;

import jakarta.servlet.http.HttpSession;
import retrofit2.http.GET;

@RestController
@RequestMapping("/members")
public class MemberController {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private MemberService memberService;
	
	//아이디 유무 체크
	@PostMapping("/checkId")
	public ResponseEntity<Map<String, Integer>> checkIdAndNickname(@RequestBody Map<String, String> data) {
		String MEM_ID = data.get("id");
		String MEM_NICK = data.get("nickname");

		long idCount = memberService.checkId(MEM_ID);
		long nicknameCount = memberService.checkNickname(MEM_NICK);

		Map<String, Integer> result = new HashMap<>();
		result.put("idCount", (int) idCount);
		result.put("nicknameCount", (int) nicknameCount);

		return ResponseEntity.ok(result);
	}
	
	// 로그인
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Map<String, Object> data, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> checkLogin = memberService.checkLogin(data);
		if (checkLogin != null) {

			session.setAttribute("MEM_ID", checkLogin.get("MEM_ID"));
			response.put("success", true);
			response.put("MEM_ID", checkLogin.get("MEM_ID"));

		} else {

			response.put("success", false);
		}

		return response;
	}
	
	// 회원가입시 값 넣기
	@PostMapping("/insertUser")
	public ResponseEntity<Void> insertUser(@RequestBody Map<String, Object> data ) {
		memberService.insertUser(data);
		return ResponseEntity.ok().build();
	}
	
	//이메일 중복여부 
	@PostMapping("/checkEmail")
	public ResponseEntity<String> checkEmail(@RequestBody Map<String, String> data) {
		String MEM_EMAIL = data.get("MEM_EMAIL");
		String MEM_ID = data.get("MEM_ID");
		String type = data.get("type");
		String result = "";
		if ("sendPw".equals(type)) {
			result = memberService.checkPwEmail(data);
		} else {
			result = memberService.checkEmail(MEM_EMAIL);
		}
		return ResponseEntity.ok(result);
	}
	
	// 메일보내기 
	@PostMapping("/sendEmail")
	public ResponseEntity<Map<String, String>> sendEmail(@RequestBody Map<String, String> data, HttpSession session) {
		String randomNumber = randomNumber();
		memberService.sendEmail(data, randomNumber);

		session.setAttribute("emailNumber", randomNumber);
		
		Map<String, String> response = new HashMap<>();
		response.put("emailNumber", randomNumber);
		System.out.println("response:"+response);
		return  ResponseEntity.ok(response);
	}
	
	// 회원 문의 테이블값 가져오기 
	@GetMapping("/selectTable")
	public ResponseEntity<List<Map<String, Object>>> selectTable(@RequestParam("MEM_NO") String MEM_NO) {
	    List<Map<String, Object>> data = memberService.selectTable(MEM_NO);
	    System.out.println(data);
	    
	    
	    return ResponseEntity.ok(data);
	}
	
	@GetMapping("/SelectNews")
	public ResponseEntity<List<Map<String, Object>>> SelectNews() {
	    List<Map<String, Object>> data = memberService.SelectNews();
	    System.out.println(data);
	    
	    
	    return ResponseEntity.ok(data);
	}
	
	
	private String randomNumber() {
		Random random = new Random();
		int randomCode = 1000 + random.nextInt(9000); // 1000 ~ 9999 사이의 숫자
		return String.valueOf(randomCode);
	}

}
