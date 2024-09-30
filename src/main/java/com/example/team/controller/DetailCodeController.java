package com.example.team.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.team.model.DetailCodeEntity;
import com.example.team.model.SubCodeEntity;
import com.example.team.persistence.MainCodeRepository;
import com.example.team.persistence.SubCodeRepository;
import com.example.team.service.DetailCodeService;
import com.example.team.service.SubCodeService;

@RestController
@RequestMapping("/admin/detailcodes")
public class DetailCodeController {
	
	@Autowired
    private DetailCodeService detailCodeService;
	@Autowired
    private SubCodeRepository subCodeRepository;

    @GetMapping
    public List<DetailCodeEntity> getAllDetailCodes() {
    	System.out.println(detailCodeService.findAll());
        return detailCodeService.findAll();
    }

//    @GetMapping("/{ID}")
//    public MainCodeEntity getMainCode(@PathVariable Long ID) {
//        return mainCodeService.findById(ID); // 조회
//    }
    
    @PostMapping
    public void insertdetailCode(@RequestBody List<DetailCodeEntity> detailCodes) {
    	detailCodeService.save(detailCodes); 
    }

    @PutMapping
    public List<DetailCodeEntity> updateDetailCodes(@RequestBody List<DetailCodeEntity> detailCodes) {
    	System.out.println("Received subCodes: " + detailCodes);
    	List<DetailCodeEntity> updatedCodes = new ArrayList<>();
        for (DetailCodeEntity detailCode : detailCodes) {
            updatedCodes.add(detailCodeService.update(detailCode.getID(), detailCode)); // 각 디테일코드 업데이트
        }
        return updatedCodes; // 업데이트된 데이터 반환
    }

    @DeleteMapping
    public void deleteDetailCodes(@RequestBody List<Long> ids) {
    	for (Long id : ids) {
            detailCodeService.delete(id); // 각 ID로 삭제 메서드 호출
        }
    }
}