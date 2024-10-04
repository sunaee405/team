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
@Table(name = "PAYMENT")// 테이블 이름 지정
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAY_NO")  // DB에서 PRO_NO 컬럼에 매핑
    private int payNo;        // AutoIncrement
    
    @Column(name = "PRO_NO")  // DB에서 PRO_NO 컬럼에 매핑
    private int proNo;        
    
    @Column(name = "BUY_MEM_NO")  // 
    private int buyMemNo;
    
    @Column(name = "SEL_MEM_NO")  // 
    private int selMemNo;
    
    @Column(name = "PAY_DATE", columnDefinition = "DATETIME(0)") 
    private LocalDateTime payDate;
    
   
}