package com.example.team.redirect;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

//@Component
//@WebFilter(urlPatterns = "/**")
//public class AjaxFilter implements Filter {
//
//	@Override
//	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//			throws IOException, ServletException {
//		HttpServletRequest httpRequest = (HttpServletRequest) request;
//
//		String rHeader = httpRequest.getHeader("X-Requested-With"); // ajax
//		String contentType = httpRequest.getContentType();
//		String url = httpRequest.getRequestURI();
//		
//		System.out.println(url);
//		// 필터 예외 조건
//		boolean check = url.startsWith("/api/") || 
//		                url.startsWith("/images/") || 
//		                url.matches(".*\\..+") || 
//		                url.startsWith("/chat") || 
//		                url.equals("/favicon.ico") || 
//		                url.startsWith("/main-web/") || 
//		                url.startsWith("/redirect/") || 
//		                url.equals("/") || 
//		                url.startsWith("/static/") ||
//		                "application/json".equalsIgnoreCase(contentType) ||
//		                "multipart/form-data".equals(contentType) ||
//		                "XMLHttpRequest".equals(rHeader) ||
//		                url.startsWith("/error");
//		
//		if(check) {
//			chain.doFilter(request, response);
//			return;
//		}
//		
//		
//		// 조건에 맞지 않는 주소요청일 경우 redirect 붙여서 재요청
//		RequestDispatcher dispatcher = httpRequest.getRequestDispatcher("/redirect" + url);
//		dispatcher.forward(request, response); // 요청을 포워딩
//	}
//}
