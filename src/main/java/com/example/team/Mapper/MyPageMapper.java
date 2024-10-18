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
	
	// 세션에 저장된 id로 회원정보 받아오기
//	Map<String, Object> getSession(String MEM_ID);
	
	// 메인페이지 상품 리스트
	List<Map<String, Object>> getMainProductList(Map<String, Object> data);
	
	// 채팅룸 검색
	List<ChattingEntity> getChatRoom(Map<String, Object> data);
	
	// 채팅방 생성
	Integer insertChatRoom(Map<String, Object> data);
	
	// 채팅 대화내역 업데이트
	Integer updateChat(Map<String, Object> data);
	
	// 회원의 채팅 목록 검색
	List<Map<String, Object>> getChatList(Map<String, Object> data);
	
	// 마이페이지 회원 상품 목록
	List<Map<String, Object>> getDetailMyProduct(Map<String, Object> data);

	List<Map<String, Object>> getProCount(Map<String, Object> data);

	public void InquiryDelete(int INQ_NO);
	List<Map<String, Object>> getMenuCategory();

	void deleteInq(int INQ_NO);
	
	
}
