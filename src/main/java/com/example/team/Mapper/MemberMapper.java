package com.example.team.Mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.team.model.MemberEntity;

import kotlinx.serialization.descriptors.StructureKind.MAP;

@Mapper
@Repository
public interface MemberMapper {

	String checkEmail(String MEM_EMAIL);

	public void insertUser(Map<String, Object> data);

	Map<String, Object> checkLogin(Map<String, Object> data);

	public void naverInsertUser(Map<String, Object> data);

	String sendEmailId(String mEM_EMAIL); 

	String sendEmailPw(String mEM_EMAIL);

	public void kakaoInsertUser(Map<String, Object> params);

	String checkPwEmail(Map<String, String> data);

	List<Map<String, Object>> selectTable(String MEM_NO);

	Map<String, Object> SelectMember(String MEM_NO);

	public void InsertInquiry(Map<String, Object> data);

	List<Map<String, Object>> SelectNews();
	
//	채현
	List<Map<String, Object>> getAllInquiry();

	Map<String, Object> getInquiry(int INQ_NO);

	public void insertAnswer(Map<String, Object> insert);
	
	public void deleteAnswer(int ANS_NO);

	public void updateAnswer(Map<String, Object> update);
	
	public void deleteInq(int INQ_NO);
	
}
