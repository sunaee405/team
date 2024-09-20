package com.example.team.model;

import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CHATTING", uniqueConstraints = @UniqueConstraint(columnNames = {"CHA_MEM1", "CHA_MEM2"}))
@Access(AccessType.FIELD)
public class ChattingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CHA_NO")
	private Long chaNo;
	
	@Column(name = "CHA_MEM1", nullable = false)
	private int chaMem1;
	
	@Column(name = "CHA_MEM2", nullable = false)
	private int chaMem2;
	
	@Column(name = "CHA_LOG", columnDefinition = "JSON")
	@JdbcTypeCode(SqlTypes.JSON)
	private List<Map<String, Object>> chaLog;
	
}
