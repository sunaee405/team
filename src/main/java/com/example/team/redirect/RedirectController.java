package com.example.team.redirect;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Order(10)
@Controller
public class RedirectController {
	
//	@GetMapping("/**")
//	public String redirectPage(HttpServletRequest request) {
//		String pageUrl = request.getRequestURI();
//	    return pageUrl;
//	}
	
	@GetMapping("/redirect/**")
	public String redirectPage(HttpServletRequest request) {
		String pageUrl = request.getRequestURI();
		pageUrl = pageUrl.replace("/redirect", "");
		
	    return pageUrl;
	}
}
