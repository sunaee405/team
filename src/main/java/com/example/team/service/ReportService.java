package com.example.team.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.team.model.DetailCodeEntity;
import com.example.team.model.MemberEntity;
import com.example.team.model.NewsEntity;
import com.example.team.model.ProductEntity;
import com.example.team.model.ReportEntity;
import com.example.team.persistence.DetailCodeRepository;
import com.example.team.persistence.NewsRepository;
import com.example.team.persistence.ReportRepository;

import jakarta.persistence.EntityNotFoundException;

@Transactional
@Service
public class ReportService {
	@Autowired
    private ReportRepository reportRepository;
	@Autowired
    private DetailCodeRepository detailCodeRepository;
	
	public List<ReportEntity> findAll() {
        return reportRepository.findAll();
    }


//    public void save(List<ReportEntity> newslist) {
//    	for (NewsEntity news : newslist) {
//            // detailCode가 null인지 확인 및 ID 확인
//            if (news.getDetailCode() == null || news.getDetailCode().getID() == null) {
//                throw new RuntimeException("Invalid detailCode or ID is null");
//            }
//
//            Long dcoId = news.getDetailCode().getID(); // ID 사용
//
//            // detailCode의 ID로 조회
//            DetailCodeEntity detailCode = detailCodeRepository.findById(dcoId)
//                .orElseThrow(() -> new RuntimeException("Invalid ID: " + dcoId));
//
//            news.setDetailCode(detailCode); // subCode 설정
//            newsRepository.save(news); // 저장
//        }
//    }
//   
    public ReportEntity update(Long ID, ReportEntity result) {
    	// 기존 엔티티 조회
    	ReportEntity existingReport = reportRepository.findById(ID)
                .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + ID));

        // detailCode 설정 (필요한 경우)
        if (result.getResultDetail() != null && result.getResultDetail().getID() != null) {
            DetailCodeEntity detailCode = detailCodeRepository.findById(result.getResultDetail().getID())
                    .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + result.getResultDetail().getID()));
            existingReport.setResultDetail(detailCode);
        }
        
        // detailCode 설정 (필요한 경우)
        if (result.getStatusDetail() != null && result.getStatusDetail().getID() != null) {
            DetailCodeEntity detailCode = detailCodeRepository.findById(result.getStatusDetail().getID())
                    .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + result.getStatusDetail().getID()));
            existingReport.setStatusDetail(detailCode);
        }
        
     // detailCode 설정 (필요한 경우)
        if (result.getSectionDetail() != null && result.getSectionDetail().getID() != null) {
            DetailCodeEntity detailCode = detailCodeRepository.findById(result.getSectionDetail().getID())
                    .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + result.getSectionDetail().getID()));
            existingReport.setSectionDetail(detailCode);
        }

        // 업데이트된 엔티티 저장
        return reportRepository.save(existingReport);
    }

    public void delete(Long repNo) {
    	// ID로 메인 코드 엔티티를 찾고, 존재하지 않을 경우 예외 처리
        ReportEntity existingReport = reportRepository.findById(repNo)
            .orElseThrow(() -> new RuntimeException("ID not found: " + repNo));

        // 엔티티 삭제
        reportRepository.delete(existingReport);
    }
    
    public ReportEntity findById(Long repNo) {
	    return reportRepository.findById(repNo)
	        .orElseThrow(() -> new RuntimeException("Member not found with id: " + repNo));
	}
    
    public ReportEntity updateReport(Long repNo, Map<String, Object> updates) {
		// 해당 회원을 DB에서 조회
    	ReportEntity existingReport = reportRepository.findById(repNo)
                .orElseThrow(() -> new RuntimeException("News not found"));

        // 업데이트할 필드가 있으면 기존 회원 정보 업데이트
        if (updates.containsKey("sectionDetail")) {
        	Map<String, Object> detailCodeMap = (Map<String, Object>) updates.get("sectionDetail");
            if (detailCodeMap.containsKey("ID")) {
                Long newSectionId = Long.parseLong(detailCodeMap.get("ID").toString());
                DetailCodeEntity sectionCode = detailCodeRepository.findById(newSectionId)
                        .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + newSectionId));
                existingReport.setSectionDetail(sectionCode);
            }
        }
        
        // 업데이트할 필드가 있으면 기존 회원 정보 업데이트
        if (updates.containsKey("resultDetail")) {
        	Map<String, Object> detailCodeMap = (Map<String, Object>) updates.get("resultDetail");
            if (detailCodeMap.containsKey("ID")) {
                Long newResultId = Long.parseLong(detailCodeMap.get("ID").toString());
                DetailCodeEntity resultCode = detailCodeRepository.findById(newResultId)
                        .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + newResultId));
                existingReport.setResultDetail(resultCode);
            }
        }
        
        // 업데이트할 필드가 있으면 기존 회원 정보 업데이트
        if (updates.containsKey("statusDetail")) {
        	Map<String, Object> detailCodeMap = (Map<String, Object>) updates.get("statusDetail");
            if (detailCodeMap.containsKey("ID")) {
                Long newStatusId = Long.parseLong(detailCodeMap.get("ID").toString());
                DetailCodeEntity resultCode = detailCodeRepository.findById(newStatusId)
                        .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + newStatusId));
                existingReport.setStatusDetail(resultCode);
            }
        }

        // DB에 저장
        return reportRepository.save(existingReport);
    }
    

}
