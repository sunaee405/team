package com.example.team.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.team.model.ProductEntity;
import com.example.team.service.ProductService;

import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ProductController {

	@Inject
	private ProductService productService;

	@GetMapping("/product/registerProduct")
	public String registerProduct() {

		return "/product/registerProduct";
	}

	@GetMapping("/getProductCategory")
	@ResponseBody
	public List<Map<String, Object>> getProductCategory() {
		return productService.getProductCategory();
	}
	
	@GetMapping("/getProductLocation")
	@ResponseBody
	public List<Map<String, Object>> getProductLocation() {
		return productService.getProductLocation();
	}

	@PostMapping("/insertProduct")
	@ResponseBody
	public ResponseEntity<?> insertProduct(@RequestParam("media") MultipartFile[] media, //
			@RequestParam("productTitle") String productTitle,  @RequestParam("categoryDcoId") String categoryDcoId,
			@RequestParam("categoryScoId") String categoryScoId, @RequestParam("categoryMcoId") String categoryMcoId,
			@RequestParam("locationDcoId") String locationDcoId, @RequestParam("locationScoId") String locationScoId,
			@RequestParam("locationMcoId") String locationMcoId)
			throws Exception {

		// 파일 저장 경로 설정
		String desktopPath = "C:\\Users\\ITWILL\\Desktop\\upload";
		List<String> savedFileNames = new ArrayList<>();

		for (MultipartFile file : media) { // media 배열로 파일 처리
			UUID uuid = UUID.randomUUID();
			String fileName = uuid.toString() + "_" + file.getOriginalFilename();
			FileCopyUtils.copy(file.getBytes(), new File(desktopPath, fileName));
			savedFileNames.add(fileName);
		}

		// 카테고리 값을 MCO_ID + SCO_ID + DCO_ID 형태로 변환
		String proCategory = categoryMcoId + categoryScoId + categoryDcoId; // 'MAMPRS' + 'PCD1'
		String proLocation = locationMcoId + locationScoId + locationDcoId; // 'MAMPRS' + 'PCD1'

		// 파일명을 Map에 저장
		Map<String, Object> productData = new HashMap<>();
		productData.put("productTitle", productTitle);
		productData.put("fileNames", String.join(",", savedFileNames)); 
		productData.put("proCategory", proCategory);// 파일명을 ','로 구분하여 저장
		productData.put("proLocation", proLocation);
		// 서비스 호출
		productService.insertProduct(productData);

		return ResponseEntity.ok().body("Product successfully saved!");
	}

}
