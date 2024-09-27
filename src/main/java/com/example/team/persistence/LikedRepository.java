package com.example.team.persistence;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.LikeEntity;
import com.example.team.model.ProductEntity;



@Repository
public interface LikedRepository extends JpaRepository<LikeEntity, Integer>{
	
	// MEM_NO와 PRO_NO로 찜 존재 여부 확인
    boolean existsByMemNoAndProNo(int memNo, int proNo);

    // MEM_NO와 PRO_NO로 찜 삭제
    void deleteByMemNoAndProNo(int memNo, int proNo);

}

