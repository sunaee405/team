package com.example.team.service;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.logging.LogException;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.ProductMapper;
import com.example.team.model.DetailCodeEntity;
import com.example.team.model.LikeEntity;
import com.example.team.model.MainCodeEntity;
import com.example.team.model.MemberEntity;
import com.example.team.model.PaymentEntity;
import com.example.team.model.ProductEntity;
import com.example.team.model.ReportEntity;
import com.example.team.persistence.LikedRepository;
import com.example.team.persistence.MemberRepository;
import com.example.team.persistence.PaymentRepository;
import com.example.team.persistence.ProductRepository;
import com.example.team.persistence.ReportRepository;
import com.mysql.cj.log.Log;

import ch.qos.logback.classic.util.LogbackMDCAdapterSimple;
import jakarta.inject.Inject;
import jakarta.persistence.Transient;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	LikedRepository likedRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	PaymentRepository paymentRepository;
	
	@Autowired
	ReportRepository reportRepository;
	
	@Autowired
	ProductMapper productMapper;
	
	// =================================== 상품 등록 ===================================

	public List<Map<String, Object>> getProductCategory() {
		// Mapper에서 데이터 조회
		return productMapper.getProductCategory();
	}

	public List<Map<String, Object>> getProductLocation() {
		// Mapper에서 데이터 조회
		return productMapper.getProductLocation();
	}

	public List<Map<String, Object>> getProductState() {
		return productMapper.getProductState();
	}

	public List<Map<String, Object>> getProductType() {
		return productMapper.getProductType();
	}

	public List<Map<String, Object>> getProductNego() {
		return productMapper.getProductNego();
	}

	public List<Map<String, Object>> getProductStatus() {
		return productMapper.getProductStatus();
	}
	
	public List<Map<String, Object>> getReportCategory() {
		return productMapper.getReportCategory();
	}

	public void insertProduct(Map<String, String> params) {

		int memNo = Integer.parseInt(params.get("memNo"));
		String productTitle = (String) params.get("productTitle");
		String fileNames = (String) params.get("fileNames");
		String categoryCode = (String) params.get("categoryDcoId");
		String locationCode = (String) params.get("locationDcoId");
		String stateCode = (String) params.get("stateDcoId");
		String productPrice = (String) params.get("productPrice");
		String productDescription = (String) params.get("productDescription");
		String typeCode = (String) params.get("typeDcoId");
		String negoCode = (String) params.get("negoDcoId");

		// 현재 시간을 LocalDateTime으로 설정 (초까지만)
		LocalDateTime currentDateTime = LocalDateTime.now().withNano(0);

//		Method[] methods = Class.forName("ProductEntity").getMethods();

		// 엔티티 생성 후 데이터 설정
		ProductEntity productEntity = new ProductEntity();
		productEntity.setMemNo(memNo);
		productEntity.setProTitle(productTitle);
		productEntity.setProImg(fileNames); // 파일명들을 ,로 구분하여 저장
		productEntity.setProCategory(categoryCode);
		productEntity.setProLocation(locationCode);
		productEntity.setProState(stateCode);
		productEntity.setProPrice(productPrice);
		productEntity.setProContent(productDescription);
		productEntity.setProDate(currentDateTime);
		productEntity.setProType(typeCode);
		productEntity.setProNeg(negoCode);

		// 리포지토리를 통해 DB에 저장
		productRepository.save(productEntity);
	}

	// =================================== 상품 목록 ===================================

	public List<Map<String, Object>> getSortList() {
		return productMapper.getSortList();
	}

	public Map<String, Object> getProductsSorted(int page, int size, String sortType, String categoryId,
			String locationScoId, String locationDcoId, String statusId, String searchKeyword) {
		int start = (page - 1) * size;
		List<Map<String, Object>> products = productMapper.getProductsSorted(start, size, sortType, categoryId,
				locationScoId, locationDcoId, statusId, searchKeyword);
		int totalProducts = productMapper.getTotalProducts(categoryId, locationScoId, locationDcoId, statusId, searchKeyword); 
		int totalPages = (int) Math.ceil((double) totalProducts / size);

		Map<String, Object> result = new HashMap<>();
		result.put("products", products);
		result.put("totalPages", totalPages);
		result.put("currentPage", page);
		return result;
	}

	// =================================== 상품 상세 정보

	@Transactional
	public void updateProViews(int proNo) {
		productMapper.updateProViews(proNo);
	}

	public Map<String, Object> getContentProduct(int proNo) {
		return productMapper.getContentProduct(proNo);
	}

	public List<ProductEntity> getProductByMemNo(Integer memNo) {
		return productRepository.findByMemNo(memNo);
	}

	public List<ProductEntity> getProductByProCategory(String proCategory) {
		return productRepository.findByProCategory(proCategory);
	}

	public void insertLiked(Map<String, String> params) {

		int memNo = Integer.parseInt(params.get("memNo"));
		int proNo = Integer.parseInt(params.get("proNo"));

		// 이미 찜했는지 확인
		if (!likedRepository.existsByMemNoAndProNo(memNo, proNo)) {
			LikeEntity likeEntity = new LikeEntity();
			likeEntity.setMemNo(memNo);
			likeEntity.setProNo(proNo);

			// 찜 저장
			likedRepository.save(likeEntity);
		}
	}

	@Transactional // 트랜잭션을 보장
	public void deleteLiked(Map<String, String> params) {
		int memNo = Integer.parseInt(params.get("memNo"));
		int proNo = Integer.parseInt(params.get("proNo"));

		// 찜 삭제
		likedRepository.deleteByMemNoAndProNo(memNo, proNo);
	}

	public boolean isLiked(int memNo, int proNo) {
		return likedRepository.existsByMemNoAndProNo(memNo, proNo);
	}

	public Integer getMemNoByMemId(String memId) {
		return productMapper.getMemNoByMemId(memId);
	}

	// =================================== 상품 정보 수정

	public void updateProduct(Map<String, String> params) {
		int proNo = Integer.parseInt(params.get("proNo"));
		ProductEntity productEntity = productRepository.findById(proNo)
				.orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

		productEntity.setProTitle(params.get("productTitle"));
		productEntity.setProImg(params.get("fileNames")); // 수정된 이미지 정보 저장
		productEntity.setProCategory(params.get("categoryDcoId"));
		productEntity.setProLocation(params.get("locationDcoId"));
		productEntity.setProState(params.get("stateDcoId"));
		productEntity.setProPrice(params.get("productPrice"));
		productEntity.setProContent(params.get("productDescription"));
		productEntity.setProType(params.get("typeDcoId"));
		productEntity.setProNeg(params.get("negoDcoId"));
		productEntity.setProStatus(params.get("statusDcoId"));
		;

		productRepository.save(productEntity); // 수정 내용 저장
	}

	// =================================== 상품 정보 삭제

	@Transactional
	public void deleteProduct(int proNo) {
		productRepository.deleteById(proNo);
	}

	// =================================== 상품 결제 정보 저장 

	public void insertPayment(Map<String, Object> paymentData) {
		PaymentEntity paymentEntity = PaymentEntity.builder()
				.proNo(Integer.parseInt(paymentData.get("proNo").toString())) // 값을 String으로 변환 후 Integer로 변환
				.buyMemNo(Integer.parseInt(paymentData.get("buyMemNo").toString())) // 값을 String으로 변환 후 Integer로 변환
				.selMemNo(Integer.parseInt(paymentData.get("selMemNo").toString())) // 값을 String으로 변환 후 Integer로 변환
				.payDate(LocalDateTime.now()).build();

		paymentRepository.save(paymentEntity);
	}

	public void updateAfterPayment(Map<String, Object> paymentData) {

		int proNo = Integer.parseInt(paymentData.get("proNo").toString()); // toString()으로 Object를 String으로 변환
		ProductEntity productEntity = productRepository.findById(proNo)
				.orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

		productEntity.setProStatus("STD2");
		productRepository.save(productEntity); // 상태 변경 후 저장

	}
	
//	채현 admin 메서드 ----------------------------
	public List<Map<String, Object>> getAllProductInfo() { //채현 admin product모든 정보 가져오는 메서드
		return productMapper.getAllProductInfo();
    }
	
	public Map<String, Object> getProduct(Long proNo) {
		int proNoInt = convertMemNoToInteger(proNo);
		return productMapper.getContentProduct(proNoInt);
	}
	
	public void delete(Long id) {
		int proNoInt = convertMemNoToInteger(id);
    	// ID로 메인 코드 엔티티를 찾고, 존재하지 않을 경우 예외 처리
        ProductEntity existingProduct = productRepository.findById(proNoInt)
            .orElseThrow(() -> new RuntimeException("ID not found: " + proNoInt));

        // 엔티티 삭제
        productRepository.delete(existingProduct);
    }
	
	
	// 채현 MemberRepository에서 string 타입으로 되어있어서 만듦..
	// 추가 메서드: Long을 Integer로 변환하는 메서드
    private Integer convertMemNoToInteger(Long proNo) {
        return proNo != null ? proNo.intValue() : null;
    }
    

//    public void insertReport(Map<String, String> params) {
//        
//    	Long memNo = Long.parseLong(params.get("memNo"));
//        int proNo = Integer.parseInt(params.get("proNo"));
//        String categoryCode = (String) params.get("categoryDcoId");
//        String reportDescription = (String) params.get("reportDescription");
//        
//        // MemberEntity 생성 및 memNo 설정
//        MemberEntity memberEntity = new MemberEntity();
//        memberEntity.setMemNo(memNo);  
//        
//        ProductEntity productEntity = new ProductEntity();
//        productEntity.setProNo(proNo);  
//        
//        DetailCodeEntity detailCodeEntity = new DetailCodeEntity();
//        detailCodeEntity.setDCO_ID(categoryCode);
//        
//        ReportEntity reportEntity = new ReportEntity();
//        reportEntity.setMemberNo(memberEntity);
//        reportEntity.setProductNo(productEntity);
//        reportEntity.setREP_CONTENT(reportDescription);
//        reportEntity.setSectionDetail(detailCodeEntity);        
//
//        // 리포지토리에 저장
//        reportRepository.save(reportEntity);
//    }
    
    public void insertReport(Map<String, String> params) {
        // params를 맵퍼에 그대로 전달
        productMapper.insertReport(params);
    }

	
    
	
	

	
}
