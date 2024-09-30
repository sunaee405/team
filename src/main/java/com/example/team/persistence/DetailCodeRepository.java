package com.example.team.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.DetailCodeEntity;

@Repository
public interface DetailCodeRepository extends JpaRepository<DetailCodeEntity, Long> {

}
