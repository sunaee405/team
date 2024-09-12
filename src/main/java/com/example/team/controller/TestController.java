package com.example.team.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.team.service.testService;

import jakarta.inject.Inject;

@Controller
@RequestMapping("/admin/*")
public class TestController {
	@Inject
	private testService testService;
	
	@GetMapping("/")
	public String testhtml() {
		testService.testService();
		
		return "testhtml";
	}
	
	@GetMapping("/index")
	public String index() {
		
		return "index";
	}
	
	@GetMapping("/tables")
	public String tables() {
		
		return "tables";
	}
	
	@GetMapping("/charts")
	public String charts() {	
		
		return "charts";
	}

}
