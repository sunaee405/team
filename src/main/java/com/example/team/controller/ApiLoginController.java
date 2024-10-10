package com.example.team.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.example.team.service.MemberService;

import jakarta.servlet.http.HttpSession;

@Controller
public class ApiLoginController {

    @Autowired
    private MemberService memberService;

    // 네이버 관련 설정
    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    private static final String NAVER_LOGOUT_API_URL = "https://nid.naver.com/oauth2.0/token";

    private String kakaoRestApiKey = "9038616c194abcd2d7ff4da3c0065b70";
    private String kakaoRedirectUri = "http://localhost:8080/api/kakaoLoginButton"; // 리디렉션 URI 수정

    @GetMapping(value = "/api/naverLogin")
    public String naverLogin(@RequestParam("code") String code, @RequestParam("state") String state,
                             HttpSession session) {
        // 세션에 accessToken이 이미 있는지 확인
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken == null) {
            // 세션에 없으면 새로 발급
            accessToken = memberService.getNaverAccessToken(code, state);
            session.setAttribute("accessToken", accessToken);
        }

        // 사용자 정보 가져오기
        Map<String, Object> userInfo = memberService.getNaverUserInfo(accessToken);
        Map<String, Object> response = (Map<String, Object>) userInfo.get("response");

        String memId = (String) response.get("id");
        long checkMemId = memberService.checkId(memId);

        Map<String, Object> data = new HashMap<>();

        // 회원 정보가 없을 경우 회원 가입 처리
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

        // 세션에 사용자 ID 저장
        session.setAttribute("MEM_ID", memId);

        return "redirect:/myPage/main";  // 리디렉션할 페이지
    }

    @GetMapping("/api/naverLogout")
    public String naverLogout(HttpSession session) {
        String accessToken = (String) session.getAttribute("accessToken");
        if (accessToken != null) {
            RestTemplate restTemplate = new RestTemplate();

            String url = NAVER_LOGOUT_API_URL + "?grant_type=delete&client_id=" + naverClientId + "&client_secret="
                    + naverClientSecret + "&access_token=" + accessToken + "&service_provider=NAVER";

            restTemplate.exchange(url, HttpMethod.GET, null, String.class);

            // 세션 무효화
            session.invalidate();
        }

        // 로그아웃 후 리다이렉트
        return "redirect:/myPage/main";
    }

    // 카카오 로그인 추가
    @GetMapping("/api/kakaoLogin") // 카카오 로그인 요청
    public String kakaoLogin() {
        String kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize" +
                "?client_id=" + kakaoRestApiKey +
                "&redirect_uri=" + kakaoRedirectUri +
                "&response_type=code";

        // 카카오 로그인 페이지로 리디렉션
        return "redirect:" + kakaoLoginUrl;
    }

    @GetMapping("/api/kakaoLoginButton") // 카카오 리디렉션 URI
    public String kakaoLoginButton(@RequestParam("code") String code, HttpSession session) {
        String kakaoTokenUrl = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code" +
                               "&client_id=" + kakaoRestApiKey +
                               "&redirect_uri=" + kakaoRedirectUri +
                               "&code=" + code;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(kakaoTokenUrl, null, Map.class);
        Map<String, Object> tokenInfo = response.getBody();
        
        String accessToken = (String) tokenInfo.get("access_token");
        session.setAttribute("kakaoAccessToken", accessToken);
        
        // 사용자 정보 요청
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
        Map<String, Object> userInfo = userInfoResponse.getBody();
        
        // 사용자 정보를 기반으로 처리
        Map<String, Object> kakaoAccount = (Map<String, Object>) userInfo.get("kakao_account");
        String kakaoId = String.valueOf(userInfo.get("id")); 
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile"); 
        String name = (String) profile.get("nickname"); 
        
        long checkMemId = memberService.checkId(kakaoId);
        
        if (checkMemId == 0) {
        	Map<String, Object> params = new HashMap<>();
        	params.put("kakaoId", kakaoId);
            params.put("name", name);
            params.put("MEM_SNS", "T");
            params.put("MEM_NICK", "@KAKAO" + name);
            
            memberService.kakaoInsertUser(params);
        }
        
        session.setAttribute("MEM_ID", kakaoId);
        
        return "redirect:/myPage/main"; // 리디렉션할 페이지
    }

    @GetMapping("/api/kakaoLogout")
    public String kakaoLogout(HttpSession session) {
        String accessToken = (String) session.getAttribute("kakaoAccessToken");
        if (accessToken != null) {
            String kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.exchange(kakaoLogoutUrl, HttpMethod.POST, entity, String.class);

            // 세션 무효화
            session.invalidate();
        }
        return "redirect:/myPage/main";
    }
}
