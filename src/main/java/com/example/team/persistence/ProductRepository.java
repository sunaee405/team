package com.example.team.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.ProductEntity;


@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long>{
}

