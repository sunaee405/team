package com.example.team.Mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.team.model.ChattingEntity;

@Mapper
@Repository
public interface MyPageMapper {
	
	// 코드 호출
	String getDetailCode();
	
	// 메인페이지 상품 리스트
	List<Map<String, Object>> getMainProductList(Map<String, Object> data);
	
	// 채팅룸 검색
	List<ChattingEntity> getChatRoom(Map<String, Object> data);
	
	// 채팅방 생성
	Integer insertChatRoom(Map<String, Object> data);
	
	// 채팅 대화내역 업데이트
	Integer updateChat(Map<String, Object> data);

	
}
