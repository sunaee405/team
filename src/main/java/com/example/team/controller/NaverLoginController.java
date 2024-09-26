package com.example.team.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.team.service.MemberService;

@Controller

public class NaverLoginController {
	
	@Autowired
	private MemberService memberService;

	@GetMapping(value = "/api/naverLogin", produces = "application/json")
	public ResponseEntity<Map<String, Object>> naverLogin(@RequestParam("code") String code,
			@RequestParam("state") String state) {
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		String accessToken = memberService.getNaverAccessToken(code, state);
		Map<String, Object> userInfo = memberService.getNaverUserInfo(accessToken);
		return ResponseEntity.ok(userInfo);
	}
}
