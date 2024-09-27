package com.example.team.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "DETAIL_CODE")	// 테이블 이름 지정
public class DetailCodeEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID; // 고유 ID
	
	@Column(length = 10)
	private String DCO_ID; //상세공통코드 ID
	
	@Column(length = 20)
	private String DCO_VALUE; //상세공통코드 VALUE 
	
	@ManyToOne
    @JoinColumn(name = "SCO_ID") // 외래 키 컬럼명
    private SubCodeEntity subCode; // 서브 코드와의 관계
}
