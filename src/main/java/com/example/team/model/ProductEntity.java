package com.example.team.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
@Data					// get/set 및 toString 오버라이딩
@Entity 				// DB연결
@Table(name = "PRODUCT")	// 테이블 이름 지정
public class ProductEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int PRO_NO; // AutoIncrement
	private int MEM_NO;
	
	@Column(length = 50)
	private String PRO_TITLE;
	
	@Column(length = 50)
	private String PRO_CATEGORY;
	
	private Timestamp PRO_DATE;
	
	@Column(length = 50)
	private String PRO_LOCATION;
	
	@Column(length = 50)
	private String PRO_STATE;
	
	@Column(length = 50)
	private String PRO_TYPE;
	
	@Column(length = 50)
	private String PRO_PRICE;
	
	@Column(columnDefinition = "LONGTEXT")
	private String PRO_IMG;
	
	@Column(columnDefinition = "LONGTEXT")
	private String PRO_CONTENT;
	
	@Column(length = 50)
	private String PRO_STATUS;
	
	private int PRO_VIEWS;
	
	@Column(length = 50)
	private String PRO_NEG;
	


}
