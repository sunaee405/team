package com.example.team.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.team.service.testService;

import jakarta.inject.Inject;

@Controller
public class TestController {
	@Inject
	private testService testService;
	
	@GetMapping("/")
	public String testhtml() {
		
		testService.testService();
		
		return "admin/index";
	}

}
