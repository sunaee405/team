package com.example.team.controller;

import java.util.HashMap;
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
import com.example.team.service.MemberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/members")
public class MemberController {

	@Autowired
	private MemberService memberService;
	
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

	@PostMapping("/insertUser")
	public ResponseEntity<Void> insertUser(@RequestBody MemberEntity member) {
		memberService.insertUser(member);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/checkEmail")
	public ResponseEntity<String> checkEmail(@RequestBody Map<String, String> data) {
		String MEM_EMAIL = data.get("MEM_EMAIL");
		String MEM_ID = data.get("MEM_ID");
		String type = data.get("type");
		String result = "";
		if ("sendPw".equals(type)) {
			result = memberService.checkPwEmail(MEM_EMAIL, MEM_ID);
		} else {
			result = memberService.checkEmail(MEM_EMAIL);
		}
		return ResponseEntity.ok(result);
	}

	@PostMapping("/sendEmail")
	public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> data, HttpSession session) {
		String MEM_EMAIL = data.get("MEM_EMAIL");
		String type = data.get("type");
		String randomNumber = randomNumber();

		memberService.sendEmail(MEM_EMAIL, type, randomNumber);

		session.setAttribute("emailNumber", randomNumber);

		return ResponseEntity.ok().build();
	}

	
	

	private String randomNumber() {
		Random random = new Random();
		int randomCode = 1000 + random.nextInt(9000); // 1000 ~ 9999 사이의 숫자
		return String.valueOf(randomCode);
	}

}
