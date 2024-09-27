package com.example.team.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.MainCodeEntity;

@Repository
public interface MainCodeRepository extends JpaRepository<MainCodeEntity, Long> {
}
