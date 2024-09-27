package com.example.team.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.team.model.MainCodeEntity;
import com.example.team.persistence.MainCodeRepository;

@Transactional
@Service
public class MainCodeService {
	@Autowired
    private MainCodeRepository mainCodeRepository;
	
	public List<MainCodeEntity> findAll() {
        return mainCodeRepository.findAll();
    }

    public MainCodeEntity findById(Long id) {
        return mainCodeRepository.findById(id).orElse(null);
    }

    public void save(List<MainCodeEntity> mainCodes) {
    	for (MainCodeEntity mainCode : mainCodes) {
            mainCodeRepository.save(mainCode);  // 각 MainCodeEntity를 DB에 인서트
        }
    }

//    public MainCodeEntity update(Long ID, MainCodeEntity mainCode) {
//        mainCode.setID(ID);
//        return mainCodeRepository.save(mainCode);
//    }
    
    public MainCodeEntity update(Long ID, MainCodeEntity mainCode) {
        // 데이터베이스에서 기존 엔티티 찾기
        MainCodeEntity existingCode = mainCodeRepository.findById(ID)
            .orElseThrow(() -> new RuntimeException("ID not found: " + ID)); // 예외 처리

        // 기존 엔티티의 필드를 새 값으로 업데이트
        existingCode.setMCO_ID(mainCode.getMCO_ID());
        existingCode.setMCO_VALUE(mainCode.getMCO_VALUE());

        // 변경된 엔티티 저장
        return mainCodeRepository.save(existingCode);
    }

    public void delete(Long id) {
    	// ID로 메인 코드 엔티티를 찾고, 존재하지 않을 경우 예외 처리
        MainCodeEntity existingCode = mainCodeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ID not found: " + id));

        // 엔티티 삭제
        mainCodeRepository.delete(existingCode);
    }

}
