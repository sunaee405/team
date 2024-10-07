package com.example.team;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // 자동 탈퇴 임포트
public class TeamApplication {
	//충돌 test 
	public static void main(String[] args) {
		// 충돌확인 4시 57분
		SpringApplication.run(TeamApplication.class, args);
	}
}
