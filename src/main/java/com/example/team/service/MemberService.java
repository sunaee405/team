package com.example.team.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.team.Mapper.MemberMapper;
import com.example.team.model.DetailCodeEntity;
import com.example.team.model.MainCodeEntity;
import com.example.team.model.MemberEntity;
import com.example.team.persistence.MemberRepository;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private MemberMapper memberMapper;

	@Autowired
	private JavaMailSender mailSender;

	public long checkId(String MEM_ID) {
		return memberRepository.countByMemId(MEM_ID);
	}

	public long checkNickname(String MEM_NICK) {
		return memberRepository.countByMemNick(MEM_NICK);
	}

	 public void naverInsertUser(Map<String, Object> data) {
	        memberMapper.naverInsertUser(data);
	    }

	public boolean checkPhone(String MEM_TEL) {
		return memberRepository.existsByMemTel(MEM_TEL);
	}

	public void insertUser(Map<String, Object> data) {
		memberMapper.insertUser(data);
	}

	public Map<String, Object> checkLogin(Map<String, Object> data) {
		return memberMapper.checkLogin(data);
	}

	public String checkEmail(String MEM_EMAIL) {
		return memberMapper.checkEmail(MEM_EMAIL);
	}

	public String checkPwEmail(String MEM_EMAIL, String MEM_ID) {
		return memberRepository.findMemPwByMemEmailAndMemId(MEM_EMAIL, MEM_ID);
	}

	public void sendEmail(String MEM_EMAIL, String type, String randomNumber) {

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(MEM_EMAIL);

		if ("check".equals(type)) {
			message.setSubject("땡땡 사이트 인증메일 입니다.");
			message.setText("인증번호 [" + randomNumber + "]");
		} else if ("sendId".equals(type)) {
			String MEM_ID = memberRepository.findMemIdByMemEmail(MEM_EMAIL);
			message.setSubject("떙땡 사이트 아이디 입니다.");
			message.setText("ID:" + MEM_ID);
		} else if ("sendPw".equals(type)) {
			String MEM_PW = memberRepository.findMemPwByMemEmail(MEM_EMAIL);
			message.setSubject("떙땡 사이트 아이디 입니다.");
			message.setText("PW:" + MEM_PW);
		}

		mailSender.send(message);

	}

	public String getNaverAccessToken(String code, String state) {
		// 네이버 액세스 토큰 요청을 위한 URL 및 파라미터 설정
		String clientId = "cYuCKft0IZ1AQf3c5RSp";
		String clientSecret = "_2pPxNi4nr"; // 클라이언트 시크릿
		String redirectUri = "http://localhost:8080/naverLogin";

		String url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" + clientId
				+ "&client_secret=" + clientSecret + "&redirect_uri=" + redirectUri + "&code=" + code + "&state="
				+ state;

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

		return (String) response.getBody().get("access_token");
	}

	public Map<String, Object> getNaverUserInfo(String accessToken) {

		String url = "https://openapi.naver.com/v1/nid/me";

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

		return response.getBody();
	}
	
	public List<MemberEntity> findAll() { //채현 admin member모든 정보 가져오는 메서드
        return memberRepository.findAll();
    }
	
	public void update(Long memNo, MemberEntity member) { //채현 admin member update메서드
		String memNoStr = convertMemNoToString(memNo);
		// 데이터베이스에서 기존 엔티티 찾기
		MemberEntity existingMember = memberRepository.findById(memNoStr)
            .orElseThrow(() -> new RuntimeException("ID not found: " + memNo)); // 예외 처리

        // 기존 엔티티의 필드를 새 값으로 업데이트
		existingMember.setMemName(member.getMemName());
		existingMember.setMemPw(member.getMemPw());
        
        // 변경된 엔티티를 데이터베이스에 저장
        memberRepository.save(existingMember);

    }
	
	public MemberEntity findById(Long memNo) {
		String memNoStr = convertMemNoToString(memNo);
	    return memberRepository.findById(memNoStr)
	        .orElseThrow(() -> new RuntimeException("Member not found with id: " + memNo));
	}
	
	// 채현 MemberRepository에서 string 타입으로 되어있어서 만듦..
	// 추가 메서드: Long을 String으로 변환하는 메서드
    private String convertMemNoToString(Long memNo) {
        return memNo != null ? String.valueOf(memNo) : null;
    }

}
