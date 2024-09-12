package com.example.team.Mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ProductMapper {
	
	List<Map<String, Object>> getProductCategory();
	
	List<Map<String, Object>> getProductLocation();
	
	
	
	
}
