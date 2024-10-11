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
@Table(name = "REPORT")	// 테이블 이름 지정
public class ReportEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("REP_NO") // JSON직렬화 시 대문자 유지
    private Long REP_NO; // 고유 ID
	
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "MEM_NO", referencedColumnName = "MEM_NO") // 외래 키 컬럼명
	@JsonProperty("memberNo") // JSON 직렬화 시 이름을 지정
    private MemberEntity memberNo;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PRO_NO", referencedColumnName = "PRO_NO") // 외래 키 컬럼명
	@JsonProperty("productNo") // JSON 직렬화 시 이름을 지정
    private ProductEntity productNo; 
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "REP_SECTION", referencedColumnName = "DCO_ID") // 외래 키 컬럼명
	@JsonProperty("sectionDetail") // JSON 직렬화 시 이름을 지정
    private DetailCodeEntity sectionDetail; 

	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "REP_RESULT", referencedColumnName = "DCO_ID") // 외래 키 컬럼명
	@JsonProperty("resultDetail") 
	private DetailCodeEntity resultDetail;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "REP_STATUS", referencedColumnName = "DCO_ID") // 외래 키 컬럼명
	@JsonProperty("statusDetail") 
	private DetailCodeEntity statusDetail;
	
	@Column(length = 5000)
	@JsonProperty("REP_CONTENT") 
	private String REP_CONTENT;
	
	@Column
	@JsonProperty("REP_DATE") 
	private LocalDateTime REP_DATE;
	
	@PrePersist
    public void prePersist() {
		setDefaultValues();//기본값 설정 메서드
        if (this.REP_DATE == null) { // null인 경우에만 현재 시간 설정
            this.REP_DATE = LocalDateTime.now();
        }
    }
	
	public void setDefaultValues() {
		if (this.resultDetail == null) {
            this.resultDetail = new DetailCodeEntity();
            this.resultDetail.setDCO_ID("RRD3"); // 기본값 설정
        }
        if (this.statusDetail == null) {
            this.statusDetail = new DetailCodeEntity();
            this.statusDetail.setDCO_ID("RSD1"); // 기본값 설정
        }
	}

	
}
