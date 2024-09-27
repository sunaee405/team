package com.example.team.model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

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
@Data  // get/set 및 toString 오버라이딩
@Entity 				// DB연결
@Table(name = "PRODUCT")// 테이블 이름 지정
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRO_NO")  // DB에서 PRO_NO 컬럼에 매핑
    private int proNo;        // AutoIncrement
    
    @Column(name = "MEM_NO")  // DB에서 MEM_NO 컬럼에 매핑
    private int memNo;
    
    @Column(name = "PRO_TITLE", length = 50)  // DB에서 PRO_TITLE 컬럼에 매핑
    private String proTitle;
    
    @Column(name = "PRO_CATEGORY", length = 50)  // DB에서 PRO_CATEGORY 컬럼에 매핑
    private String proCategory;
    
    @Column(name = "PRO_DATE", columnDefinition = "DATETIME(0)")  // DB에서 PRO_DATE 컬럼에 매핑
    private LocalDateTime proDate;
    
    @Column(name = "PRO_LOCATION", length = 50)  // DB에서 PRO_LOCATION 컬럼에 매핑
    private String proLocation;
    
    @Column(name = "PRO_STATE", length = 50)  // DB에서 PRO_STATE 컬럼에 매핑
    private String proState;
    
    @Column(name = "PRO_TYPE", length = 50)  // DB에서 PRO_TYPE 컬럼에 매핑
    private String proType;
    
    @Column(name = "PRO_PRICE", length = 50)  // DB에서 PRO_PRICE 컬럼에 매핑
    private String proPrice;
    
    @Column(name = "PRO_IMG", columnDefinition = "LONGTEXT")  // DB에서 PRO_IMG 컬럼에 매핑
    private String proImg;
    
    @Column(name = "PRO_CONTENT", columnDefinition = "LONGTEXT")  // DB에서 PRO_CONTENT 컬럼에 매핑
    private String proContent;
    
    @ColumnDefault("'STD1'") // default
    @Column(name = "PRO_STATUS", length = 50)  // DB에서 PRO_STATUS 컬럼에 매핑
    private String proStatus = "STD1";
    
    @Column(name = "PRO_VIEWS")  // DB에서 PRO_VIEWS 컬럼에 매핑
    private int proViews;
    
    @Column(name = "PRO_NEG", length = 50)  // DB에서 PRO_NEG 컬럼에 매핑
    private String proNeg;
}