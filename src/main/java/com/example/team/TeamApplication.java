package com.example.team;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // 자동 탈퇴 임포트
public class TeamApplication extends SpringBootServletInitializer {  
	public static void main(String[] args) {
		SpringApplication.run(TeamApplication.class, args);
	}

	// TODO
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(TeamApplication.class);
	}
}
