package com.example.team.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.team.Mapper.testMapper;
import com.mysql.cj.log.Log;

import jakarta.inject.Inject;

@Service
public class testService {

	@Autowired
	testMapper mapper;
	
	public void testService() {
		List<Map<String, Object>> str = mapper.find();
		System.out.println(str);
	}
	

}
