package com.example.team.persistence;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.ProductEntity;



@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>{
	
	// 조회수 기준으로 정렬
    Page<ProductEntity> findAllByOrderByProViewsDesc(Pageable pageable);
	
	
}

