package com.example.team.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.ChattingMapper;
import com.example.team.model.ChattingEntity;
import com.example.team.persistence.ChattingRepository;

@Service
public class MyPageService {
	
	@Autowired
	private ChattingRepository chattingRepository;
	
	@Autowired
	private ChattingMapper chattingMapper;
	
	
	// 해당 회원들간의 채팅방이 있는지 찾기
	public List<ChattingEntity> getChatRoom(Map<String, Object> data) {
		List<ChattingEntity> chattingEntity = chattingMapper.getChatRoom(data);
		
		return chattingEntity;
	}
	
	// 채팅룸 생성
	public void insertChatRoom(Map<String, Object> data) {
		chattingMapper.insertChatRoom(data);
	}

	// 채팅룸 대화 업데이트
	public Boolean updateChat(Map<String, Object> data) {
		 return chattingMapper.updateChat(data) == 1 ? true : false;
	}

}
