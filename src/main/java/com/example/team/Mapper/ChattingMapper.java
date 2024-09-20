package com.example.team.Mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.example.team.model.ChattingEntity;

@Mapper
@Repository
public interface ChattingMapper {
	List<ChattingEntity> getChatRoom(Map<String, Object> data);
	Integer insertChatRoom(Map<String, Object> data);
	Integer updateChat(Map<String, Object> data);
}
