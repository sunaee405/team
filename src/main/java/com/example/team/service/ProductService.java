package com.example.team.service;

import java.util.ArrayList;
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
	
	public void insertProduct(Map<String, Object> productData) {
        String productTitle = (String) productData.get("productTitle");
        String fileNames = (String) productData.get("fileNames");
        String categoryCode = (String) productData.get("categoryCode");
        String locationCode = (String) productData.get("locationCode");

        // 엔티티 생성 후 데이터 설정
        ProductEntity productEntity = new ProductEntity();
        productEntity.setPRO_TITLE(productTitle);
        productEntity.setPRO_IMG(fileNames); // 파일명들을 ,로 구분하여 저장
        productEntity.setPRO_CATEGORY(categoryCode);
        productEntity.setPRO_LOCATION(locationCode);
        
        // 리포지토리를 통해 DB에 저장
        productRepository.save(productEntity);
    }

	public List<Map<String, Object>> getProductCategory() {
		 // Mapper에서 데이터 조회
        return productMapper.getProductCategory();
	}
	
	public List<Map<String, Object>> getProductLocation() {
		 // Mapper에서 데이터 조회
       return productMapper.getProductLocation();
	}
	
	
	

}
