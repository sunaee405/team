package com.example.team.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.MemberEntity;
import com.example.team.model.NewsEntity;
import com.example.team.model.ProductEntity;
import com.example.team.model.ReportEntity;
import com.example.team.model.SubCodeEntity;
import com.example.team.persistence.MemberRepository;
import com.example.team.service.MemberService;
import com.example.team.service.MyPageService;
import com.example.team.service.NewsService;
import com.example.team.service.ProductService;
import com.example.team.service.ReportService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/admin/*")
public class AdminController {
	
//	logout
	@PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
		// 세션 무효화
        request.getSession().invalidate();
        // 리다이렉트 URL 생성
        Map<String, String> response = new HashMap<>();
        // 메인화면 페이지 이동
        response.put("redirectUrl", "/myPage/main");
        return ResponseEntity.ok(response); // JSON 응답으로 리다이렉트 URL 반환
    }
	
//	member -----------------------------------
	@Autowired
    private MemberService memberService;
	
	@GetMapping("members")
    public List<MemberEntity> getAllMemberEntities() {
        return memberService.findAll();
    }

    @GetMapping("members/{memNo}")
    public MemberEntity getMember(@PathVariable("memNo") Long memNo) {
        return memberService.findById(memNo); // 조회
    }
    
    @PutMapping("members")
    public void updateMembers(@RequestBody List<MemberEntity> members) {
        for (MemberEntity member : members) {
        	memberService.update(member.getMemNo(), member); // 각 디테일코드 업데이트
        }
    }
    
    @PutMapping("members/{memNo}")
    public ResponseEntity<MemberEntity> updateMember(
    		@PathVariable("memNo") Long memNo, 
    		@RequestBody Map<String, Object> updates) {
    	// 서비스 메서드를 호출하여 업데이트
        MemberEntity updatedMember = memberService.updateMember(memNo, updates);
    	
    	// 업데이트 로직
        return ResponseEntity.ok(updatedMember);
    }
    
    // 멤버 탈퇴 유예처리
    @PutMapping("members/delete") 
    public ResponseEntity<String> deleteMember(@RequestBody Map<String, Object> data) {
        Long memNo = Long.valueOf((String) data.get("mem_no")); // mem_no를 Long으로 변환
        memberService.updateMemberStatus(memNo, data); // 서비스 호출
        return ResponseEntity.ok("탈퇴 유예처리가 완료되었습니다.");
    }
    
    // 상태를 업데이트하는 메서드
    @PutMapping("members/status")
    public ResponseEntity<String> updateMemberStatus(@RequestBody Map<String, Object> data) {
        Long memNo = Long.valueOf((String) data.get("mem_no"));
        memberService.cancelMemberStatus(memNo, data);
        return ResponseEntity.ok("상태가 업데이트되었습니다.");
    }
    
//    product  ----------------------
    @Autowired
    private ProductService productService;
    
    @GetMapping("products")
    public List<Map<String, Object>> getAllProductInfo() {
        return productService.getAllProductInfo();
    }
    
    @GetMapping("products/{proNo}")
    public Map<String, Object> getProduct(@PathVariable("proNo") Long proNo) {
        return productService.getProduct(proNo); // 조회
    }
    
    @DeleteMapping("products/deleteProducts")
    public void deleteProducts(@RequestBody List<Long> ids) {
    	for (Long id : ids) {
    		productService.delete(id); // 각 ID로 삭제 메서드 호출
        }
    }
    
    @DeleteMapping("products/delete/{proNo}")
    public void deleteproduct(@PathVariable("proNo") Long proNo) {
    	productService.delete(proNo);
    }
    
//  news  ----------------------
    @Autowired
    private NewsService newsService;
    
    @GetMapping("news/list")
    public List<NewsEntity> getAllNewsList() {
        return newsService.findAll();
    }
    
    @PostMapping("news/insert")
    public void insertNews(@RequestBody List<NewsEntity> newslist) {
    	newsService.save(newslist);
    }
    
    @PutMapping("news/update")
    public List<NewsEntity> updateNews(@RequestBody List<NewsEntity> newslist) {
    	List<NewsEntity> updatedNews = new ArrayList<>();
        for (NewsEntity news : newslist) {
        	updatedNews.add(newsService.update(news.getNEW_NO(), news));
        }
        return updatedNews; // 업데이트된 데이터 반환
    }
    
    @DeleteMapping("news/delete")
    public void deleteNews(@RequestBody List<Long> ids) {
    	for (Long id : ids) {
    		newsService.delete(id); // 각 ID로 삭제 메서드 호출
        }
    }
    
    @GetMapping("news/{newsNo}")
    public NewsEntity getNews(@PathVariable("newsNo") Long newsNo) {
        return newsService.findById(newsNo); // 조회
    }
    
    @PutMapping("news/{newsNo}")
    public ResponseEntity<NewsEntity> updateNews(
    		@PathVariable("newsNo") Long newsNo, 
    		@RequestBody Map<String, Object> updates) {
    	// 서비스 메서드를 호출하여 업데이트
    	NewsEntity updatedNews = newsService.updateNews(newsNo, updates);
    	
    	// 업데이트 로직
        return ResponseEntity.ok(updatedNews);
    }
    
    @DeleteMapping("news/{newsNo}")
    public void deleteNews(@PathVariable("newsNo") Long newsNo) {
    	newsService.delete(newsNo);
    }
    
//  report  ----------------------
    @Autowired
    private ReportService reportService;
    
    @GetMapping("report/list")
    public List<ReportEntity> getAllReportList() {
        return reportService.findAll();
    }
    
    @PutMapping("report/update")
    public List<ReportEntity> updateResult(@RequestBody List<ReportEntity> reportResults) {
    	List<ReportEntity> reportList = new ArrayList<>();
        for (ReportEntity result : reportResults) {
        	reportList.add(reportService.update(result.getREP_NO(), result));
        }
        return reportList; // 업데이트된 데이터 반환
    }
    
    @DeleteMapping("report/delete")
    public void deleteReport(@RequestBody List<Long> ids) {
    	for (Long id : ids) {
    		reportService.delete(id); // 각 ID로 삭제 메서드 호출
        }
    }
    
    @GetMapping("report/{repNo}")
    public ReportEntity getReport(@PathVariable("repNo") Long repNo) {
        return reportService.findById(repNo); // 조회
    }
    
    @PutMapping("report/{repNo}")
    public ResponseEntity<ReportEntity> updateReport(
    		@PathVariable("repNo") Long repNo, 
    		@RequestBody Map<String, Object> updates) {
    	System.out.println("@@@@@@@@@@@@@@@@@@@@@@@");
    	System.out.println(updates);
    	System.out.println(repNo);
    	// 서비스 메서드를 호출하여 업데이트
    	ReportEntity updateReport = reportService.updateReport(repNo, updates);
    	
    	// 업데이트 로직
        return ResponseEntity.ok(updateReport);
    }
    
    @DeleteMapping("report/{repNo}")
    public void deleteReport(@PathVariable("repNo") Long repNo) {
    	reportService.delete(repNo);
    }
    
//  inquiry  ----------------------  
    @Autowired
    private MyPageService myPageService;
    
    @GetMapping("inquiry")
    public List<Map<String, Object>> getAllInquiry() {
        return memberService.getAllInquiry();
    }
    
    @PostMapping("inquiry/delete")
    public void deleteInquiry(@RequestBody List<Integer> inqNoList) {
        for (Integer inqNo : inqNoList) {
            myPageService.InquiryDelete(inqNo);
        }
    }
    
    @GetMapping("inquiry/{inqNo}")
    public Map<String, Object> getInquiry(@PathVariable("inqNo") int inqNo) {
        return memberService.getInquiry(inqNo); // 조회
    }
    
//  answer  ----------------------     
    @PostMapping("answer/insert/{inqNo}")
    public void insertAnswer(@PathVariable("inqNo") int inqNo, @RequestBody Map<String, Object> insert) {
    	insert.put("INQ_NO", inqNo);
        memberService.insertAnswer(insert); // 조회
    }
    
 	@PostMapping("answer/delete")
 	public void deleteAnswer(@RequestParam("ANS_NO") int ansNo) {
 		memberService.deleteAnswer(ansNo);
 	}
 	
 	@PostMapping("answer/update/{inqNo}")
    public void updateAnswer(@PathVariable("inqNo") int inqNo, @RequestBody Map<String, Object> update) {
 		update.put("INQ_NO", inqNo);
        memberService.updateAnswer(update); // 조회
    }

}
