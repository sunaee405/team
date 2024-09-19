package com.example.team.service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.logging.LogException;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.ProductMapper;
import com.example.team.model.ProductEntity;
import com.example.team.persistence.ProductRepository;
import com.mysql.cj.log.Log;

import ch.qos.logback.classic.util.LogbackMDCAdapterSimple;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	ProductMapper productMapper;
	
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

	public void insertProduct(Map<String, Object> productData) {
		String productTitle = (String) productData.get("productTitle");
		String fileNames = (String) productData.get("fileNames");
		String categoryCode = (String) productData.get("categoryCode");
		String locationCode = (String) productData.get("locationCode");
		String stateCode = (String) productData.get("stateCode");
		String productPrice = (String) productData.get("productPrice");
		String productDescription = (String) productData.get("productDescription");
		String typeCode = (String) productData.get("typeCode");
		String negoCode = (String) productData.get("negoCode");

		// 현재 시간을 LocalDateTime으로 설정 (초까지만)
	    LocalDateTime currentDateTime = LocalDateTime.now().withNano(0);

		// 엔티티 생성 후 데이터 설정
		ProductEntity productEntity = new ProductEntity();
		productEntity.setPRO_TITLE(productTitle);
		productEntity.setPRO_IMG(fileNames); // 파일명들을 ,로 구분하여 저장
		productEntity.setPRO_CATEGORY(categoryCode);
		productEntity.setPRO_LOCATION(locationCode);
		productEntity.setPRO_STATE(stateCode);
		productEntity.setPRO_PRICE(productPrice);
		productEntity.setPRO_CONTENT(productDescription);
		productEntity.setPRO_DATE(currentDateTime);
		productEntity.setPRO_STATUS("STS1");
		productEntity.setPRO_TYPE(typeCode);
		productEntity.setPRO_NEG(negoCode);

		// 리포지토리를 통해 DB에 저장
		productRepository.save(productEntity);
	}

}
