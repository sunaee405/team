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

import org.apache.ibatis.logging.LogException;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.ProductMapper;
import com.example.team.model.LikeEntity;
import com.example.team.model.ProductEntity;
import com.example.team.persistence.LikedRepository;
import com.example.team.persistence.ProductRepository;
import com.mysql.cj.log.Log;

import ch.qos.logback.classic.util.LogbackMDCAdapterSimple;
import jakarta.inject.Inject;
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

	public void insertProduct(Map<String, String> params) {
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
		productEntity.setProTitle(productTitle);
		productEntity.setProImg(fileNames); // 파일명들을 ,로 구분하여 저장
		productEntity.setProCategory(categoryCode);
		productEntity.setProLocation(locationCode);
		productEntity.setProState(stateCode);
		productEntity.setProPrice(productPrice);
		productEntity.setProContent(productDescription);
		productEntity.setProDate(currentDateTime);
		productEntity.setProStatus("STD1");
		productEntity.setProType(typeCode);
		productEntity.setProNeg(negoCode);

		// 리포지토리를 통해 DB에 저장
		productRepository.save(productEntity);
	}

	// =================================== 상품 목록 ===================================

	public List<Map<String, Object>> getSortList() {
		return productMapper.getSortList();
	}

	public Map<String, Object> getProductsSorted(int page, int size, String sortType, String categoryId, String locationScoId, String locationDcoId, String searchKeyword) {
	    int start = (page - 1) * size;
	    List<Map<String, Object>> products = productMapper.getProductsSorted(start, size, sortType, categoryId, locationScoId, locationDcoId, searchKeyword);
	    int totalProducts = productMapper.getTotalProducts(categoryId, locationScoId, locationDcoId, searchKeyword); // 카테고리별로 제품 수 조회
	    int totalPages = (int) Math.ceil((double) totalProducts / size);

	    Map<String, Object> result = new HashMap<>();
	    result.put("products", products);
	    result.put("totalPages", totalPages);
	    result.put("currentPage", page);
	    return result;
	}
	
	
	// =================================== 상품 상세 정보 ===================================
	
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
	
	@Transactional  // 트랜잭션을 보장
	public void deleteLiked(Map<String, String> params) {
        int memNo = Integer.parseInt(params.get("memNo"));
        int proNo = Integer.parseInt(params.get("proNo"));

        // 찜 삭제
        likedRepository.deleteByMemNoAndProNo(memNo, proNo);
    }
	
	public boolean isLiked(int memNo, int proNo) {
	    return likedRepository.existsByMemNoAndProNo(memNo, proNo);
	}
	
	
}
