package com.example.team.redirect;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class RedirectController {
	
	@GetMapping("/redirect/**")
	public String redirectPage(HttpServletRequest request) {
		String pageUrl = request.getRequestURI();
		pageUrl = pageUrl.replace("/redirect", "");
		
	    return pageUrl;
	}
}
