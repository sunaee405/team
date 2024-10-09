package com.example.team.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.team.model.NewsEntity;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity, Long> {

}
