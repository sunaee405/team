package com.example.team.persistence;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.team.model.MemberEntity;

import jakarta.transaction.Transactional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, String> {

	long countByMemId(String MemId);

	long countByMemNick(String MemNick);

	boolean existsByMemTel(String MemTel);

	String findMemIdByMemEmail(String MemEmail);

	String findMemPwByMemEmailAndMemId(String MemEmail, String MemId);

	String findMemPwByMemEmail(String MemEmail);
	
	Optional<MemberEntity> findByMemId(String MemId);
	
	@Query("SELECT m FROM MemberEntity m WHERE m.MEM_OUT < ?1") // 오늘 날자보다 이전 날자 삭제
    List<MemberEntity> findExpiredMembers(LocalDateTime currentDate);

}
