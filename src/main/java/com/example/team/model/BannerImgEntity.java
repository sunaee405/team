package com.example.team.model;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ByteArraySerializer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
@Table(name = "BANNER")
public class BannerImgEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 기본 키 자동 생성
    @Column(name = "BAN_NO")  // PK를 ID로 사용
    private int banNo;      // 기본 키로 사용될 ID 필드
	
	@Lob // Large Object
    @Column(name = "BAN_IMG", columnDefinition = "LONGBLOB")
    private byte[] banImg;
	
	@Column(name = "BAN_CODE", length = 10)
	private String banCode;
}
