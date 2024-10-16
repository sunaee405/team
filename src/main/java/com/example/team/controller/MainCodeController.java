package com.example.team.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.MainCodeEntity;
import com.example.team.persistence.MainCodeRepository;
import com.example.team.service.MainCodeService;

@RestController
@RequestMapping("/admin/maincodes")
public class MainCodeController {
	
	@Autowired
    private MainCodeService mainCodeService;

    @GetMapping
    public List<MainCodeEntity> getAllMainCodes() {
        return mainCodeService.findAll();
    }

//    @GetMapping("/{ID}")
//    public MainCodeEntity getMainCode(@PathVariable Long ID) {
//        return mainCodeService.findById(ID); // 조회
//    }
    
    @PostMapping
    public void insertMainCode(@RequestBody List<MainCodeEntity> mainCodes) {
    	mainCodeService.save(mainCodes); 
    }

    @PutMapping
    public List<MainCodeEntity> updateMainCodes(@RequestBody List<MainCodeEntity> mainCodes) {
        List<MainCodeEntity> updatedCodes = new ArrayList<>();
        for (MainCodeEntity mainCode : mainCodes) {
            updatedCodes.add(mainCodeService.update(mainCode.getID(), mainCode)); // 각 메인코드 업데이트
        }
        return updatedCodes; // 업데이트된 데이터 반환
    }

    @DeleteMapping
    public ResponseEntity<String> deleteMainCodes(@RequestBody List<Long> ids) {
//    	for (Long id : ids) {
//            mainCodeService.delete(id); // 각 ID로 삭제 메서드 호출
//        }
    	try {
            for (Long id : ids) {
                mainCodeService.delete(id); // 각 ID로 삭제 메서드 호출
            }
            return ResponseEntity.ok("삭제되었습니다.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("삭제 실패! 일부 항목은 외래 키 제약 조건으로 인해 삭제할 수 없습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류가 발생했습니다.");
        }
    }
    	
}