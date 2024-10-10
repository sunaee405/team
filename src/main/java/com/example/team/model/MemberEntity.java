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
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	@Column(name = "MEM_NO")
	private Long memNo;		// 회원번호
	
	@Column(name = "MEM_ID")
	private String memId;		// 아이디
	
	@Column( name = "MEM_PW")
	private String memPw;		// 비밀번호

	@Column(name = "MEM_NAME")
	private String memName;	// 회원이름
		
	@Column(name = "MEM_NICK")
	private String memNick;	// 닉네임
	
	@Column(name = "MEM_GENDER")
	private String  memGender;	// 성별
	
	@Column(name = "MEM_TEL")
	private String memTel;		// 전화번호
	
	@Column()
//	@ColumnDefault(value = )
	private LocalDateTime MEM_INPUT;	// 가입시간
	
	private LocalDateTime MEM_RESPITE;	// 탈퇴유예시작시간
	
	private LocalDateTime MEM_OUT;		// 탈퇴완료시간
	
	private String MEM_STATUS;	// 탈퇴여부
	
	private String MEM_SNS;		// SNS로그인(연동?) 유무
	
	@Column(name = "MEM_BIRTH")
	private String  memBirth;	// 생일
	
	@Column(name = "MEM_EMAIL")
	private String  memEmail;	// 이메일
	
	
	//가입시간 default 대신 설정 
	@PrePersist
	public void defaultInputTime() {
		if(MEM_INPUT == null) {
			MEM_INPUT = LocalDateTime.now();
		}
	}
}
