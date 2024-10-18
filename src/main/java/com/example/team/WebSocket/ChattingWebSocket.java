package com.example.team.WebSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocket
public class ChattingWebSocket implements WebSocketConfigurer {
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new ChatSocketHandler(), "/chat") // "/chat" 엔드포인트에 핸들러 등록
        		.setAllowedOrigins("http://localhost:8080", "http://c2d2404t12.itwillbs.com")
        		.withSockJS();
	}

}
