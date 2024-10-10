package com.example.team.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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
@Table(name = "NEWS")	// 테이블 이름 지정
public class NewsEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("NEW_NO") // JSON직렬화 시 대문자 유지
    private Long NEW_NO; // 고유 ID
	
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "NEW_SECTION", referencedColumnName = "DCO_ID") // 외래 키 컬럼명
	@JsonProperty("detailCode") // JSON 직렬화 시 이름을 지정
    private DetailCodeEntity detailCode;
	
	@Column(length = 100)
	@JsonProperty("NEW_NAME") 
	private String NEW_NAME; 
	
	@Column(length = 5000)
	@JsonProperty("NEW_CONTENT") 
	private String NEW_CONTENT;
	
	@Column
	@JsonProperty("NEW_DATE") 
	private LocalDateTime NEW_DATE;
	
	@PrePersist
    public void prePersist() {
        this.NEW_DATE = LocalDateTime.now();
    }
	
}
