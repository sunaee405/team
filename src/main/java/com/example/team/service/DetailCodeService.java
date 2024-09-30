package com.example.team.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.team.model.DetailCodeEntity;
import com.example.team.model.MainCodeEntity;
import com.example.team.model.SubCodeEntity;
import com.example.team.persistence.DetailCodeRepository;
import com.example.team.persistence.MainCodeRepository;
import com.example.team.persistence.SubCodeRepository;

import jakarta.persistence.EntityNotFoundException;

@Transactional
@Service
public class DetailCodeService {
	@Autowired
    private DetailCodeRepository detailCodeRepository;
	@Autowired
    private SubCodeRepository subCodeRepository;
	
	public List<DetailCodeEntity> findAll() {
        return detailCodeRepository.findAll();
    }

//    public SubCodeEntity findById(Long id) {
//        return subCodeRepository.findById(id).orElse(null);
//    }

    public void save(List<DetailCodeEntity> detailCodes) {
    	for (DetailCodeEntity detailCode : detailCodes) {
            // detailCode가 null인지 확인 및 ID 확인
            if (detailCode.getSubCode() == null || detailCode.getSubCode().getID() == null) {
                throw new RuntimeException("Invalid mainCode or ID is null");
            }

            Long scoId = detailCode.getSubCode().getID(); // ID 사용

            // mainCode의 ID로 조회
            SubCodeEntity subCode = subCodeRepository.findById(scoId)
                .orElseThrow(() -> new RuntimeException("Invalid ID: " + scoId));

            detailCode.setSubCode(subCode); // subCode 설정
            detailCodeRepository.save(detailCode); // 저장
        }
    }

//    public MainCodeEntity update(Long ID, MainCodeEntity mainCode) {
//        mainCode.setID(ID);
//        return mainCodeRepository.save(mainCode);
//    }
    
    public DetailCodeEntity update(Long ID, DetailCodeEntity detailCode) {
    	// 기존 엔티티 조회
    	DetailCodeEntity existingSubCode = detailCodeRepository.findById(ID)
                .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + ID));

        // 필드 값 업데이트
        existingSubCode.setDCO_ID(detailCode.getDCO_ID());
        existingSubCode.setDCO_VALUE(detailCode.getDCO_VALUE());

        // subsCode 설정 (필요한 경우)
        if (detailCode.getSubCode() != null && detailCode.getSubCode().getID() != null) {
            SubCodeEntity subCode = subCodeRepository.findById(detailCode.getSubCode().getID())
                    .orElseThrow(() -> new RuntimeException("SubCode not found for ID: " + detailCode.getSubCode().getID()));
            existingSubCode.setSubCode(subCode);
        }

        // 업데이트된 엔티티 저장
        return detailCodeRepository.save(existingSubCode);
    }

    public void delete(Long id) {
    	// ID로 메인 코드 엔티티를 찾고, 존재하지 않을 경우 예외 처리
        DetailCodeEntity existingCode = detailCodeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ID not found: " + id));

        // 엔티티 삭제
        detailCodeRepository.delete(existingCode);
    }

}
