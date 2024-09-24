package com.example.team.Mapper;

import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberMapper {

    Map<String, Object> checkId(Map<String, String> data);
}
