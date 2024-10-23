package com.example.team.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.MyPageMapper;
import com.example.team.Mapper.ProductMapper;
import com.example.team.model.BannerImgEntity;
import com.example.team.model.ChattingEntity;
import com.example.team.model.MemberEntity;
import com.example.team.model.ProductEntity;
import com.example.team.model.QLikeEntity;
import com.example.team.model.QPaymentEntity;
import com.example.team.model.QProductEntity;
import com.example.team.persistence.BannerImgRepository;
import com.example.team.persistence.ChattingRepository;
import com.example.team.persistence.MemberRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

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
	@Autowired
	private JPAQueryFactory q;
	
	@PersistenceContext
	@Autowired
    private EntityManager entityManager;
	
	
	
	
	
	// 상품 카테고리
	public List<Map<String, Object>> getCategory() {
		return myPageMapper.getMenuCategory();
	}
	
	
	// 메인페이지 상품 리스트
	public List<ProductEntity> getMainProductList(Map<String, Object> data) {
		QProductEntity product = QProductEntity.productEntity;
		
		String type = (String)data.get("TYPE");
		
		// 정렬 타입 정의
		OrderSpecifier<?> specifier = null;
		// varchar 형으로 관리되고 있는 proPrice 정렬을 위해 정수로 활용 할 수 있도록 따로 저장
		NumberExpression<Integer>
			proPrice = Expressions.numberTemplate(Integer.class, "CAST(REPLACE({0}, ',', '') AS INTEGER)", product.proPrice);
		switch (type) {
			case "ARD2": specifier = product.proDate.desc(); break; // 최근등록
			case "ARD3": specifier = proPrice.desc(); break; // 높은가격
			case "ARD4": specifier = proPrice.asc(); break; // 낮은가격
			default: specifier = product.proViews.desc();
		}
		
		List<ProductEntity> list = q.select(product)
									.from(product)
									.where(product.proStatus.eq("STD1"))
									.orderBy(specifier)
									.limit(30)
									.fetch();
		return list;
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
	public void insertBanner(List<BannerImgEntity> bannerImgEntity) {
		bannerImgRepository.deleteAll();
		bannerImgRepository.saveAll(bannerImgEntity);
	}



	//배너 호출
	public List<BannerImgEntity> getBanner() {
		return bannerImgRepository.findAll();
	}



	// 회원탈퇴일 등록
	public void deleteMember(MemberEntity memEntity) {
		memberRepository.save(memEntity);
	}



	// 판매, 구매, 찜한 상품 개수
	public List<Map<String, Object>> getProCount(Map<String, Object> data) {
		return myPageMapper.getProCount(data); 
	}
	
	
	public void deleteChatRoom(Map<String, Object> data) {
		Long id = Long.valueOf((String)data.get("CHA_NO"));
		chattingRepository.deleteById(id);
	}

	public void InquiryDelete(int INQ_NO) {
		myPageMapper.InquiryDelete(INQ_NO);
	}








}
