package com.example.team.redirect;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoHandlerFoundException.class)
    public void handleRedirectException(HttpServletRequest request, HttpServletResponse response, NoHandlerFoundException e) 
            throws Exception {
    	String requestUri = request.getRequestURI();
    	boolean check = requestUri.startsWith("/main-web/") || requestUri.startsWith("/favicon.ico");
    	
    	if(check) {
    		 // 404 상태 코드 설정
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    		return;
    	}
        String redirectUrl = "/redirect" + requestUri;
        System.out.println(redirectUrl);
        // RequestDispatcher를 사용하여 포워딩
        RequestDispatcher dispatcher = request.getRequestDispatcher(redirectUrl);
        dispatcher.forward(request, response);
    }
}