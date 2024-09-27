package com.example.team.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.PostLoad;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder				// Bulider 패턴으로 객체 생성 가능
@NoArgsConstructor		// 기본생성자
@AllArgsConstructor		// 모든 멤버변수 초기화하는 생성자
@Entity 				// DB연결
@Table(name = "LIKED")	// 테이블 이름 지정
public class LikeEntity {
	
	@EmbeddedId
	@AttributeOverrides({ // 복합키 클래스에서 특정 테이블만 꺼내쓰기
		@AttributeOverride(name = "MEM_NO", column = @Column(name = "MEM_NO")),
		@AttributeOverride(name = "PRO_NO", column = @Column(name = "PRO_NO"))
	})
	@JsonIgnore
	private CompositeKey id;
		
	@Transient
    private int MEM_NO;

	@Transient
	private int PRO_NO;
	
	
	@PostLoad
	private void post() {
		this.MEM_NO = id.getMemNo();
		this.PRO_NO = id.getProNo();
	}
}
