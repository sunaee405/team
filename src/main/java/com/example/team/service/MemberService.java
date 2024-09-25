package com.example.team.service;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.team.model.MemberEntity;
import com.example.team.persistence.MemberRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private JavaMailSender mailSender;

	public long checkId(String MEM_ID) {
		return memberRepository.countById(MEM_ID);
	}

	public long checkNickname(String MEM_NICK) {
		return memberRepository.countByNickname(MEM_NICK);
	}

	public boolean checkPhone(String phone) {
		return memberRepository.checkPhone(phone);
	}

	public void insertUser(Map<String, String> data) {
		MemberEntity member = MemberEntity.builder().MEM_ID(data.get("MEM_ID")).MEM_PW(data.get("MEM_PW"))
				.MEM_NAME(data.get("MEM_NAME")).MEM_NICK(data.get("MEM_NICK")).MEM_GENDER(data.get("MEM_GENDER"))
				.MEM_TEL(data.get("MEM_TEL")).MEM_BIRTH(data.get("MEM_BIRTH")).MEM_EMAIL(data.get("MEM_EMAIL"))
				.MEM_STATUS(data.get("MEM_STATUS")).MEM_SNS(data.get("MEM_SNS")).build();

		memberRepository.save(member);
	}

	public String checkEmail(String MEM_EMAIL) {
		return memberRepository.checkEmail(MEM_EMAIL);
	}
	
	public String checkPwEmail(String MEM_EMAIL, String MEM_ID) {
		return memberRepository.checkPwEmail(MEM_EMAIL, MEM_ID);
	}
	

	public void sendEmail(String MEM_EMAIL, String type , String randomNumber) {
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(MEM_EMAIL);

		if ("check".equals(type)) {
			message.setSubject("땡땡 사이트 인증메일 입니다.");
			message.setText("인증번호 [" + randomNumber +"]");
		} else if ("sendId".equals(type)) {
			String MEM_ID = memberRepository.checkEmail(MEM_EMAIL);
			message.setSubject("떙땡 사이트 아이디 입니다.");
			message.setText("ID:" + MEM_ID);
		}else if ("sendPw".equals(type)) {
			String MEM_PW = memberRepository.checkPwEmail(MEM_EMAIL);
			message.setSubject("떙땡 사이트 아이디 입니다.");
			message.setText("PW:" + MEM_PW);
		}
		
		mailSender.send(message);	
		
	}
	

}
