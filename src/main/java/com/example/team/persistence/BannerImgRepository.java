package com.example.team.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.BannerImgEntity;

@Repository
public interface BannerImgRepository extends JpaRepository<BannerImgEntity, Integer> {
	
}
