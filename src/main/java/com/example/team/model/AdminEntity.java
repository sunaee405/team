package com.example.team.model;

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

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ADMIN")
public class AdminEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ADM_NO")
	private Long admNo;
	
	@Column(name = "ADM_ID", nullable = false, unique = true)
	private String admId;
	
	@Column(name = "ADM_PW", nullable = false)
	private String admPw;
	
	@Column(name = "ADM_NAME", nullable = false, unique = true)
	private String admName;
	

}
