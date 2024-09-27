package com.example.team.persistence;

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


}
