package com.example.team.Mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.team.model.ProductEntity;

@Mapper
@Repository
public interface ProductMapper {

	List<Map<String, Object>> getProductCategory();

	List<Map<String, Object>> getProductLocation();

	List<Map<String, Object>> getProductState();

	List<Map<String, Object>> getProductType();

	List<Map<String, Object>> getProductNego();

	List<Map<String, Object>> getSortList();

	// 페이징 처리를 위한 메서드 수정
	List<Map<String, Object>> getProductsSorted(@Param("start") int start, @Param("size") int size, @Param("sortType") String sortType);

	// 총 제품 개수 조회 메서드
	int getTotalProducts();

}
