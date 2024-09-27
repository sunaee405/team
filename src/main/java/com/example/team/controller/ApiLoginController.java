package com.example.team.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.example.team.model.MemberEntity;
import com.example.team.service.MemberService;

import jakarta.servlet.http.HttpSession;

@Controller

public class ApiLoginController {

	@Autowired
	private MemberService memberService;

	@Value("${naver.client.id}")
	private String clientId;

	@Value("${naver.client.secret}")
	private String clientSecret;

	private static final String NAVER_LOGOUT_API_URL = "https://nid.naver.com/oauth2.0/token";

	public String naverLogin(@RequestParam("code") String code, @RequestParam("state") String state,
			HttpSession session) {
		String accessToken = memberService.getNaverAccessToken(code, state);
		Map<String, Object> userInfo = memberService.getNaverUserInfo(accessToken);

		session.setAttribute("accessToken", accessToken);

		Map<String, Object> response = (Map<String, Object>) userInfo.get("response");

		String memId = (String) response.get("id");
		long checkMemId = memberService.checkId(memId);

		Map<String, Object> data = new HashMap<>();

		if (checkMemId == 0) {
			data.put("MEM_ID", memId);
			data.put("MEM_NICK", "@Naver" + (String) response.get("nickname"));
			data.put("MEM_GENDER", (String) response.get("gender"));
			data.put("MEM_EMAIL", (String) response.get("email"));
			data.put("MEM_TEL", ((String) response.get("mobile")).replace("-", ""));
			data.put("MEM_NAME", (String) response.get("name"));

			String birthYear = (String) response.get("birthyear");
			String birthDay = (String) response.get("birthday");
			data.put("MEM_BIRTH", birthYear.substring(2) + birthDay.replace("-", ""));
			data.put("MEM_SNS", "T");
			data.put("MEM_STATUS", "F");
			data.put("MEM_PW", ""); 

			memberService.naverInsertUser(data);
		}

		session.setAttribute("MEM_ID", memId);

		return "member/login"; // 리디렉션할 URL을 문자열로 반환
	}

	@GetMapping("/api/logout")
	public String naverLogout(HttpSession session) {

		String accessToken = (String) session.getAttribute("accessToken");
		System.out.println(accessToken);

		if (accessToken != null) {

			RestTemplate restTemplate = new RestTemplate();

			String url = NAVER_LOGOUT_API_URL + "?grant_type=delete&client_id=" + clientId + "&client_secret="
					+ clientSecret + "&access_token=" + accessToken + "&service_provider=NAVER";

			restTemplate.exchange(url, HttpMethod.GET, null, String.class);

			session.invalidate();
		}

		// 로그아웃 후 리다이렉트
		return "myPage/main";
	}

}
