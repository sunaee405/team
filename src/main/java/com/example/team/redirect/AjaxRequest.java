//package com.example.team.redirect;
//
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//@Component
//public class AjaxRequest implements HandlerInterceptor {
//	
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//		
//		String rHeader = request.getHeader("X-Requested-With"); // ajax 요청인지 확인
//    	String url = request.getRequestURI();
//    	if(url.startsWith("/redirect/") || url.equals("/") || url.startsWith("/static/")) return true;
//    	
//    	if(!"XMLHttpRequest".equals(rHeader) && !url.startsWith("/error")) {
//    	}
//        return true;
//	}
//}
