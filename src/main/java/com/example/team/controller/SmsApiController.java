package com.example.team.controller;

import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.team.service.MemberService;

import jakarta.servlet.http.HttpSession;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@RestController
public class SmsApiController {

	private final DefaultMessageService messageService;

	@Autowired
	private MemberService memberService;

	public SmsApiController(@Value("${coolsms.api_key}") String apiKey,
			@Value("${coolsms.api_secret}") String apiSecret) {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	@PostMapping("/send-message")
	public String sendMessage(@RequestBody Map<String, String> requestData, HttpSession session) {
		String phone = requestData.get("phone");

		if (memberService.checkPhone(phone)) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 등록된 전화번호입니다.");
		}

		String randomNumber = randomNumber();

		Message message = new Message();
		message.setFrom("01030738895");
		message.setTo(phone);
		message.setText("본인인증 메시지입니다. 인증번호: [" + randomNumber + "]");
		
		this.messageService.sendOne(new SingleMessageSendingRequest(message));

		session.setAttribute("verificationCode", randomNumber);
		 
		try {
			return randomNumber;
		} catch (Exception e) {
			e.printStackTrace();
			return "Failed to send message: " + e.getMessage();
		}
	}

	private String randomNumber() {
		Random random = new Random();
		int randomCode = 1000 + random.nextInt(9000); // 1000 ~ 9999 사이의 숫자
		return String.valueOf(randomCode);
	}

}
