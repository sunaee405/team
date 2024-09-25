package com.example.team.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.team.model.MemberEntity;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

	@Query("SELECT COUNT(m) FROM MemberEntity m WHERE m.MEM_ID = ?1")
	long countById(String MEM_ID);

	@Query("SELECT COUNT(m) FROM MemberEntity m WHERE m.MEM_NICK = ?1")
	long countByNickname(String MEM_NICK);

	@Query("SELECT COUNT(m) > 0 FROM MemberEntity m WHERE m.MEM_TEL = ?1")
	boolean checkPhone(String phone);

	@Query("SELECT m.MEM_ID FROM MemberEntity m WHERE m.MEM_EMAIL = ?1")
	String checkEmail(String MEM_EMAIL);

}
