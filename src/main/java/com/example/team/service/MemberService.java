package com.example.team.service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
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
	
	public void kakaoInsertUser(Map<String, Object> parmas) {
		memberMapper.kakaoInsertUser(parmas);
	}


	public Map<String, Object> checkLogin(Map<String, Object> data) {
		return memberMapper.checkLogin(data);
	}

	public String checkEmail(String MEM_EMAIL) {
		return memberMapper.checkEmail(MEM_EMAIL);
	}

	public String checkPwEmail(Map<String, String> data) {
		return memberMapper.checkPwEmail(data);
	}

	public void sendEmail(Map<String, String> data, String randomNumber ) {
		String MEM_EMAIL = data.get("MEM_EMAIL");
		String type = data.get("type");
		
		System.out.println("data:" +data);
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(MEM_EMAIL);
		if ("check".equals(type)) {
			message.setSubject("땡땡 사이트 인증메일 입니다.");
			message.setText("인증번호 [" + randomNumber + "]");
		} else if ("sendId".equals(type)) {
			String ResutMEM_ID = memberMapper.sendEmailId(MEM_EMAIL);
			message.setSubject("떙땡 사이트 아이디 입니다.");
			message.setText("ID:" + ResutMEM_ID);
		} else if ("sendPw".equals(type)) {
			String MEM_PW = memberMapper.checkPwEmail(data);
			message.setSubject("떙땡 사이트 비밀번호 입니다.");
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
	
//	채현 admin 메서드 ----------------------
	
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
	
	public MemberEntity updateMember(Long memNo, Map<String, Object> updates) {
		String memNoStr = convertMemNoToString(memNo);
		// 해당 회원을 DB에서 조회
        MemberEntity existingMember = memberRepository.findById(memNoStr)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // 업데이트할 필드가 있으면 기존 회원 정보 업데이트
        if (updates.containsKey("mem_tel")) {
            existingMember.setMemTel((String) updates.get("mem_tel"));
        }
        if (updates.containsKey("mem_name")) {
            existingMember.setMemName((String) updates.get("mem_name"));
        }
        if (updates.containsKey("mem_birth")) {
            existingMember.setMemBirth((String) updates.get("mem_birth"));
        }
        // 필요에 따라 다른 필드들도 추가

        // DB에 저장
        return memberRepository.save(existingMember);
    }
	
	public void updateMemberStatus(Long memNo, Map<String, Object> updates) {
		String memNoStr = convertMemNoToString(memNo);
		MemberEntity member = memberRepository.findById(memNoStr)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));

		// 탈퇴 유예 처리 로직
		if (updates.containsKey("mem_respite")) {
		    OffsetDateTime memRespite = OffsetDateTime.parse((String) updates.get("mem_respite"));
		    member.setMEM_RESPITE(memRespite.toLocalDateTime()); // 탈퇴 유예 시작 시간
		}
        // 탈퇴 유예 시작 시간 설정
        member.setMEM_RESPITE(LocalDateTime.now());
        // mem_out은 프론트엔드에서 받은 값을 사용
        if (updates.containsKey("mem_out")) {
            OffsetDateTime memOut = OffsetDateTime.parse((String) updates.get("mem_out"));
            member.setMEM_OUT(memOut.toLocalDateTime()); // 탈퇴 완료 시간
        }
        // 탈퇴 여부 변경
        if (updates.containsKey("mem_status")) {
            String memStatus = (String) updates.get("mem_status");
            member.setMEM_STATUS(memStatus); // 상태값 설정
        }

        memberRepository.save(member); // 업데이트된 회원 정보 저장
    }
	
	public void cancelMemberStatus(Long memNo, Map<String, Object> updates) {
		String memNoStr = convertMemNoToString(memNo);
	    MemberEntity member = memberRepository.findById(memNoStr)
	            .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다."));
	    member.setMEM_RESPITE(null); // 유예 시간 초기화
	    member.setMEM_OUT(null); // 탈퇴 시간 초기화
	    member.setMEM_STATUS("F"); // 상태를 F로 변경
	    memberRepository.save(member);
	}
	
	
    
    // 탈퇴@Scheduled(cron = "0 0 0 * * ?")
    // 매일 자정에 실행될 메서드(fixedRate = 60000)//1분마다
    @Scheduled(fixedRate = 60000) // 매일 자정
    public void removeExpiredMembers() {
        LocalDateTime now = LocalDateTime.now();
        List<MemberEntity> expiredMembers = memberRepository.findExpiredMembers(now);
        memberRepository.deleteAll(expiredMembers); // 만료된 회원 삭제
    }
    
    // 채현 MemberRepository에서 string 타입으로 되어있어서 만듦..
 	// 추가 메서드: Long을 String으로 변환하는 메서드
     private String convertMemNoToString(Long memNo) {
         return memNo != null ? String.valueOf(memNo) : null;
     }

	public List<Map<String, Object>> selectTable(String MEM_NO) {
		return memberMapper.selectTable(MEM_NO);
		
	}

}
