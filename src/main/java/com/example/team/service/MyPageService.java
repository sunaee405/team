package com.example.team.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.MyPageMapper;
import com.example.team.Mapper.ProductMapper;
import com.example.team.model.ChattingEntity;
import com.example.team.persistence.ChattingRepository;

@Service
public class MyPageService {
	
	@Autowired
	private ChattingRepository chattingRepository;
	@Autowired
	private MyPageMapper myPageMapper;
	@Autowired
	private ProductMapper productMapper;
	
	
	// 상품 카테고리
	public List<Map<String, Object>> getCategory() {
		return productMapper.getProductCategory();
	}
	
	
	
	
	// 메인페이지 상품 리스트
	public List<Map<String, Object>> getMainProductList(Map<String, Object> data) {
		
		return myPageMapper.getMainProductList(data);
	}
	
	// 해당 회원들간의 채팅방이 있는지 찾기
	public List<ChattingEntity> getChatRoom(Map<String, Object> data) {
		List<ChattingEntity> chattingEntity = myPageMapper.getChatRoom(data);
		
		return chattingEntity;
	}
	
	// 채팅룸 생성
	public void insertChatRoom(Map<String, Object> data) {
		myPageMapper.insertChatRoom(data);
	}

	// 채팅룸 대화 업데이트
	public Boolean updateChat(Map<String, Object> data) {
		 return myPageMapper.updateChat(data) == 1 ? true : false;
	}



	// 공통코드 호출
	public Map<String, Object> getDetailCode() {
		return myPageMapper.getDetailCode();
	}


}
