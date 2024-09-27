package com.example.team.WebSocket;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ChatSocketHandler extends TextWebSocketHandler {
//	private List<WebSocketSession> socketSessions = new ArrayList<WebSocketSession>();
	 // WebSocketSession과 채팅방 번호를 연결하는 맵
	 private final Map<String, List<WebSocketSession>> chatSession =
			 new ConcurrentHashMap<String, List<WebSocketSession>>();
	
	// 소켓연결 될때 동작하는 메서드
//	@Override
//	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//		socketSessions.add(session);
//	}
	
	// 연결된 소켓에서 메시지가 전달될때 동작하는 메서드
	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		String msg = (String) message.getPayload(); // 전달된 메시지 정보에서 메시지에 해당하는 값만 추출?
		
		// 메시지를 map으로 변환
		ObjectMapper objectMapper = new ObjectMapper();
	    Map<String, Object> data = objectMapper.readValue(msg, new TypeReference<Map<String, Object>>() {});
	    
	    String type = (String) data.get("TYPE");
	    String chaNo = String.valueOf(data.get("CHA_NO"));
	    
	    if(type.equals("setSession")) {
	    	chatSession.computeIfAbsent(chaNo, t -> new ArrayList()).add(session);
	    	
	    } else if(type.equals("chatMessage")) {
	    	
	    	System.out.println("chat chatMessage");
	    	
	    	System.out.println(chaNo);
	    	// 채팅방 번호로 해당 키값의 채팅에 등록된 모든 세션을 리스트로
	    	List<WebSocketSession> chatRooms = chatSession.get(chaNo);
	    	
	    	for(WebSocketSession cr : chatRooms) {
	    		if(chatRooms != null && !cr.isOpen()) return;
	    		cr.sendMessage(message);
	    	}
	    } 
	    
	    System.out.println(chatSession);
	}
	
	
	
	
	
//	소켓의 연결이 종료될때 동작하는 메서드 
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
//		chatSession.get(endChatNo).removeIf(sessions -> sessions.equals(session));
		
		chatSession.values().removeIf(sessions -> {
	        boolean removed = sessions.remove(session);
	        return removed && sessions.isEmpty();
	    });
	}

}
