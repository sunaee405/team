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

@Component
@WebFilter(urlPatterns = "/**")
public class AjaxFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String rHeader = httpRequest.getHeader("X-Requested-With"); // ajax
		String url = httpRequest.getRequestURI();
		
        // 이미지 요청 제외
        if (url.startsWith("/images/")) {
            chain.doFilter(request, response);
            return;
        }
        
        if (url.matches(".*\\..+")) {
        	 chain.doFilter(request, response); // 요청을 계속 진행
             return;
        }
        
        
        // 웹소켓 핸드셰이크 요청을 무시
        if (url.startsWith("/chat")) {
            chain.doFilter(request, response);
            
            return;
        }
        
        
        if(url.equals("/favicon.ico") || url.startsWith("/main-web/")) {
        	response.getWriter().write("");
        	return;
        }

//         조건에 맞는 URL은 필터링에서 제외
        if (url.startsWith("/redirect/") || url.equals("/") || url.startsWith("/static/")) {
            chain.doFilter(request, response); // 요청을 계속 진행
            return;
        }


		// AJAX 요청이 아니고 오류 페이지가 아닌 경우 URL 포워딩
		if (!"XMLHttpRequest".equals(rHeader) && !url.startsWith("/error")) {
			RequestDispatcher dispatcher = httpRequest.getRequestDispatcher("/redirect" + url);
			dispatcher.forward(request, response); // 요청을 포워딩
		} else {
			chain.doFilter(request, response); // AJAX 요청 또는 오류 페이지인 경우 요청을 계속 진행
		}

		
	}

	
}
