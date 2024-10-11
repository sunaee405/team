package com.example.team.persistence;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.ChattingEntity;

@Repository
public interface ChattingRepository extends JpaRepository<ChattingEntity, Long> {
}
