package com.example.team.redirect;

import org.springframework.aop.framework.AbstractAdvisingBeanPostProcessor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Order(10)
@Controller
public class RedirectController {
	
	@GetMapping("/redirect/**")
	public String redirectPage(HttpServletRequest request) {
		
		System.out.println("리다이렉트 컨트롤러");
		
		String pageUrl = request.getRequestURI();
		pageUrl = pageUrl.replace("/redirect", "");
		
		
	    return pageUrl;
	}
	
	
}
