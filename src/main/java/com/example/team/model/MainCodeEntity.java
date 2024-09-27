package com.example.team.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder				// Bulider 패턴으로 객체 생성 가능
@NoArgsConstructor		// 기본생성자
@AllArgsConstructor		// 모든 멤버변수 초기화하는 생성자
@Data  					// get/set 및 toString 오버라이딩
@Entity 				// DB연결
@Table(name = "MAIN_CODE")	// 테이블 이름 지정
public class MainCodeEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("ID") // JSON직렬화 시 대문자 유지
    private Long ID; // 고유 ID
	
	@Column(length = 10, unique = true)// MCO_ID는 유일해야 함
	@JsonProperty("MCO_ID") // JSON 직렬화 시 대문자 유지
	private String MCO_ID; //메인공통코드 ID //MAM
	
	@Column(length = 20)
	@JsonProperty("MCO_VALUE") // JSON 직렬화 시 대문자 유지
	private String MCO_VALUE; //메인공통코드 VALUE //메인코드
	
}
