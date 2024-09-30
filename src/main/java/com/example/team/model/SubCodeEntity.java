package com.example.team.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "SUB_CODE")	// 테이블 이름 지정
public class SubCodeEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("ID") // JSON직렬화 시 대문자 유지
    private Long ID; // 고유 ID
	
	@Column(length = 10, unique = true)
	@JsonProperty("SCO_ID") // JSON 직렬화 시 대문자 유지
	private String SCO_ID; //서브공통코드 ID //PRS
	
	@Column(length = 20)
	@JsonProperty("SCO_VALUE") // JSON 직렬화 시 대문자 유지
	private String SCO_VALUE; //서브공통코드 VALUE //상품목록
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MCO_ID", referencedColumnName = "MCO_ID") // 외래 키 컬럼명
	@JsonProperty("mainCode") // JSON 직렬화 시 이름을 지정
    private MainCodeEntity mainCode; // 메인 코드와의 관계 MainCodeEntity의 ID를 참조
	
	
}
