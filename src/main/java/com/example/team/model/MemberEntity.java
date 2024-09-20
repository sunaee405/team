package com.example.team.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MEMBERS")
public class MemberEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long MEM_NO;			// 회원번호
	
	@Column(nullable = false, unique = true)
	private String MEM_ID;		// 아이디
	
	@Column(nullable = false)
	private String MEM_PW;		// 비밀번호

	@Column(nullable = false)
	private String MEM_NAME;	// 회원이름
		
	@Column(nullable = false, unique = true)
	private String MEM_NICK;	// 닉네임
	
	@Column(nullable = false)
	private String MEM_GENDER;	// 성별
	
	@Column(nullable = false, unique = true)
	private String MEM_TEL;		// 전화번호
	
	@Column(nullable = false)
//	@ColumnDefault(value = )
	private LocalDateTime MEM_INPUT;	// 가입시간
	
	private LocalDateTime MEM_RESPITE;	// 탈퇴유예시작시간
	
	private LocalDateTime MEM_OUT;		// 탈퇴완료시간
	
	private String MEM_STATUS;	// 탈퇴여부
	
	private String MEM_SNS;		// SNS로그인(연동?) 유무
	
	@Column(nullable = false)
	private String MEM_BIRTH;	// 생일
	
	@Column(unique = true)
	private String MEM_EMAIL;	// 이메일
	
	
	//가입시간 default 대신 설정 
	@PrePersist
	public void defaultInputTime() {
		if(MEM_INPUT == null) {
			MEM_INPUT = LocalDateTime.now();
		}
	}
}
