package com.example.team.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.MyPageMapper;
import com.example.team.Mapper.ProductMapper;
import com.example.team.model.BannerImgEntity;
import com.example.team.model.ChattingEntity;
import com.example.team.model.MemberEntity;
import com.example.team.persistence.BannerImgRepository;
import com.example.team.persistence.ChattingRepository;
import com.example.team.persistence.MemberRepository;

@Service
public class MyPageService {
	
	@Autowired
	private ChattingRepository chattingRepository;
	@Autowired
	private MyPageMapper myPageMapper;
	@Autowired
	private ProductMapper productMapper;
	@Autowired
	private MemberRepository memberRepository; 
	@Autowired
	private BannerImgRepository bannerImgRepository;
	
	
	
	
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
	public String getDetailCode() {
		return myPageMapper.getDetailCode();
	}


	// 세션에 저장된 id로 회원정보
	public Optional<MemberEntity> getSession(String data) {
		return memberRepository.findByMemId(data);
	}


	// 회원정보를 통해 채팅리스트 저장
	public List<Map<String, Object>> getChatList(Map<String, Object> data) {
		return myPageMapper.getChatList(data);
	}

	public List<Map<String, Object>> getDetailMyProduct(Map<String, Object> data) {
		return myPageMapper.getDetailMyProduct(data);
	}



	//비밀번호 변경
	public void updateMemData(MemberEntity memEntity) {
		memberRepository.save(memEntity);
	}



	// 배너저장
	public void insertBanner(BannerImgEntity bannerImgEntity) {
		bannerImgRepository.save(bannerImgEntity);
	}



	//배너 호출
	public List<BannerImgEntity> getBanner() {
		return bannerImgRepository.findAll();
	}



	// 회원탈퇴일 등록
	public void deleteMember(MemberEntity memEntity) {
		memberRepository.save(memEntity);
	}








}
