package com.example.team.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.team.model.MainCodeEntity;
import com.example.team.model.SubCodeEntity;
import com.example.team.persistence.MainCodeRepository;
import com.example.team.persistence.SubCodeRepository;

import jakarta.persistence.EntityNotFoundException;

@Transactional
@Service
public class SubCodeService {
	@Autowired
    private SubCodeRepository subCodeRepository;
	@Autowired
    private MainCodeRepository mainCodeRepository;
	
	public List<SubCodeEntity> findAll() {
        return subCodeRepository.findAll();
    }

//    public SubCodeEntity findById(Long id) {
//        return subCodeRepository.findById(id).orElse(null);
//    }

    public void save(List<SubCodeEntity> subCodes) {
    	for (SubCodeEntity subCode : subCodes) {
            // mainCode가 null인지 확인 및 ID 확인
            if (subCode.getMainCode() == null || subCode.getMainCode().getID() == null) {
                throw new RuntimeException("Invalid mainCode or ID is null");
            }

            Long mcoId = subCode.getMainCode().getID(); // ID 사용

            // mainCode의 ID로 조회
            MainCodeEntity mainCode = mainCodeRepository.findById(mcoId)
                .orElseThrow(() -> new RuntimeException("Invalid ID: " + mcoId));

            subCode.setMainCode(mainCode); // mainCode 설정
            subCodeRepository.save(subCode); // 저장
        }
    }

//    public MainCodeEntity update(Long ID, MainCodeEntity mainCode) {
//        mainCode.setID(ID);
//        return mainCodeRepository.save(mainCode);
//    }
    
    public SubCodeEntity update(Long ID, SubCodeEntity subCode) {
    	// 기존 엔티티 조회
        SubCodeEntity existingSubCode = subCodeRepository.findById(ID)
                .orElseThrow(() -> new RuntimeException("SubCode not found for ID: " + ID));

        // 필드 값 업데이트
        existingSubCode.setSCO_ID(subCode.getSCO_ID());
        existingSubCode.setSCO_VALUE(subCode.getSCO_VALUE());

        // mainCode 설정 (필요한 경우)
        if (subCode.getMainCode() != null && subCode.getMainCode().getID() != null) {
            MainCodeEntity mainCode = mainCodeRepository.findById(subCode.getMainCode().getID())
                    .orElseThrow(() -> new RuntimeException("MainCode not found for ID: " + subCode.getMainCode().getID()));
            existingSubCode.setMainCode(mainCode);
        }

        // 업데이트된 엔티티 저장
        return subCodeRepository.save(existingSubCode);
    }

    public void delete(Long id) {
    	// ID로 메인 코드 엔티티를 찾고, 존재하지 않을 경우 예외 처리
        SubCodeEntity existingCode = subCodeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ID not found: " + id));

        // 엔티티 삭제
        subCodeRepository.delete(existingCode);
    }

}
