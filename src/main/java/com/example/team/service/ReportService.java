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
//    public NewsEntity update(Long ID, NewsEntity news) {
//    	// 기존 엔티티 조회
//    	NewsEntity existingNews = newsRepository.findById(ID)
//                .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + ID));
//
//        // 필드 값 업데이트
//    	existingNews.setNEW_NAME(news.getNEW_NAME());
//    	existingNews.setNEW_CONTENT(news.getNEW_CONTENT());
//    	existingNews.setNEW_DATE(LocalDateTime.now());
//
//        // detailCode 설정 (필요한 경우)
//        if (news.getDetailCode() != null && news.getDetailCode().getID() != null) {
//            DetailCodeEntity detailCode = detailCodeRepository.findById(news.getDetailCode().getID())
//                    .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + news.getDetailCode().getID()));
//            existingNews.setDetailCode(detailCode);
//        }
//
//        // 업데이트된 엔티티 저장
//        return newsRepository.save(existingNews);
//    }
//
//    public void delete(Long id) {
//    	// ID로 메인 코드 엔티티를 찾고, 존재하지 않을 경우 예외 처리
//        NewsEntity existingnews = newsRepository.findById(id)
//            .orElseThrow(() -> new RuntimeException("ID not found: " + id));
//
//        // 엔티티 삭제
//        newsRepository.delete(existingnews);
//    }
//    
//    public NewsEntity findById(Long newsNo) {
//	    return newsRepository.findById(newsNo)
//	        .orElseThrow(() -> new RuntimeException("Member not found with id: " + newsNo));
//	}
//    
//    public NewsEntity updateNews(Long newsNo, Map<String, Object> updates) {
//		// 해당 회원을 DB에서 조회
//    	NewsEntity existingNews = newsRepository.findById(newsNo)
//                .orElseThrow(() -> new RuntimeException("News not found"));
//
//        // 업데이트할 필드가 있으면 기존 회원 정보 업데이트
//        if (updates.containsKey("detailCode")) {
//        	Map<String, Object> detailCodeMap = (Map<String, Object>) updates.get("detailCode");
//            if (detailCodeMap.containsKey("ID")) {
//                Long newSectionId = Long.parseLong(detailCodeMap.get("ID").toString());
//                DetailCodeEntity detailCode = detailCodeRepository.findById(newSectionId)
//                        .orElseThrow(() -> new RuntimeException("DetailCode not found for ID: " + newSectionId));
//                existingNews.setDetailCode(detailCode);
//            }
//        }
//        if (updates.containsKey("NEW_NAME")) {
//        	existingNews.setNEW_NAME((String) updates.get("NEW_NAME"));
//        }
//        if (updates.containsKey("NEW_CONTENT")) {
//        	existingNews.setNEW_CONTENT((String) updates.get("NEW_CONTENT"));
//        }
//        if (updates.containsKey("NEW_DATE")) {
//        	existingNews.setNEW_DATE(LocalDateTime.now());;
//        // 필요에 따라 다른 필드들도 추가
//        }
//        // DB에 저장
//        return newsRepository.save(existingNews);
//    }
    

}
