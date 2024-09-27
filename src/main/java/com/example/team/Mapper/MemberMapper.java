package com.example.team.Mapper;

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
}
