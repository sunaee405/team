package com.example.team.controller;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

//	@GetMapping("/product/registerProduct")
//	public String registerProduct() {
//
//		return "/product/registerProduct";
//	}


	// =================================== 상품 등록 ===================================

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

	@GetMapping("/getProductState")
	@ResponseBody
	public List<Map<String, Object>> getProductState() {
		return productService.getProductState();
	}

	@GetMapping("/getProductType")
	@ResponseBody
	public List<Map<String, Object>> getProductType() {
		return productService.getProductType();
	}

	@GetMapping("/getProductNego")
	@ResponseBody
	public List<Map<String, Object>> getProductNego() {
		return productService.getProductNego();
	}

//	@PostMapping("/insertProduct")
//	@ResponseBody
//	public ResponseEntity<?> insertProduct(@RequestParam("media") MultipartFile[] media, //
//										   @RequestParam Map<String, String> params) throws Exception {
//
//		String productTitle = params.get("productTitle");
//		String categoryCode = params.get("categoryDcoId");
//		String locationCode = params.get("locationDcoId");
//		String stateCode = params.get("stateDcoId");
//		String typeCode = params.get("typeDcoId");
//		String negoCode = params.get("negoDcoId");
//		String productPrice = params.get("productPrice");
//		String productDescription = params.get("productDescription");
//
//		// 파일 저장 경로 설정
//
//		// 집
//// 		String desktopPath = "C:\\Users\\Anibal\\Desktop\\upload";
//
//		// 학원
//		String desktopPath = "C:\\Users\\ITWILL\\Desktop\\upload";
//		List<String> savedFileNames = new ArrayList<>();
//
//		for (MultipartFile file : media) { // media 배열로 파일 처리
//			UUID uuid = UUID.randomUUID();
//			String fileName = uuid.toString() + "_" + file.getOriginalFilename();
//			FileCopyUtils.copy(file.getBytes(), new File(desktopPath, fileName));
//			savedFileNames.add(fileName);
//		}
//
//		// 카테고리 값을 MCO_ID + SCO_ID + DCO_ID 형태로 변환
//
//		// 파일명을 Map에 저장
//		Map<String, Object> productData = new HashMap<>();
//		productData.put("productTitle", productTitle);
//		productData.put("fileNames", String.join(",", savedFileNames)); // 파일명을 ','로 구분하여 저장
//		productData.put("categoryCode", categoryCode);
//		productData.put("locationCode", locationCode);
//		productData.put("stateCode", stateCode);
//		productData.put("productPrice", productPrice);
//		productData.put("productDescription", productDescription);
//		productData.put("typeCode", typeCode);
//		productData.put("negoCode", negoCode);
//
//		// 서비스 호출
//		productService.insertProduct(productData);
//
//		return ResponseEntity.ok().body("Product successfully saved!");
//
//	}
	
	@PostMapping("/insertProduct")
	@ResponseBody
	public ResponseEntity<?> insertProduct(@RequestParam("media") MultipartFile[] media,
	                                       @RequestParam Map<String, String> params) throws Exception {

	    // 파일 저장 경로 설정
	    String desktopPath = "C:\\Users\\ITWILL\\Desktop\\upload";
	    List<String> savedFileNames = new ArrayList<>();

	    for (MultipartFile file : media) {
	        UUID uuid = UUID.randomUUID();
	        String fileName = uuid.toString() + "_" + file.getOriginalFilename();
	        FileCopyUtils.copy(file.getBytes(), new File(desktopPath, fileName));
	        savedFileNames.add(fileName);
	    }

	    // 파일명을 ','로 구분한 문자열로 변환하여 params에 추가
	    params.put("fileNames", String.join(",", savedFileNames));

	    // 서비스 호출
	    productService.insertProduct(params);
	    
	    // 로직 처리 후
	    Map<String, String> response = new HashMap<>();
	    response.put("redirectUrl", "/product/listProduct");

	    return ResponseEntity.ok(response);
	}

	// =================================== 상품 목록 ===================================

	@GetMapping("/getSortList")
	@ResponseBody
	public List<Map<String, Object>> getSortList() {
		return productService.getSortList();
	}

	@GetMapping("/listProductsSorted")
	@ResponseBody
	public Map<String, Object> listProductsSorted(
	        @RequestParam("page") int page, 
	        @RequestParam("size") int size, 
	        @RequestParam(value = "sortType", defaultValue = "date") String sortType,
	        @RequestParam(value = "categoryId", required = false) String categoryId,
	        @RequestParam(value = "locationScoId", required = false) String locationScoId,
	        @RequestParam(value = "locationDcoId", required = false) String locationDcoId,
	        @RequestParam(value = "searchKeyword", required = false) String searchKeyword) {
	    
	    return productService.getProductsSorted(page, size, sortType, categoryId, locationScoId, locationDcoId, searchKeyword);
	}
	
	// =================================== 상세 상품 정보 ===================================
	
	@GetMapping("getContentProduct")
	@ResponseBody
	public Map<String, Object> getContentProduct(@RequestParam("proNo") int proNo) {
		
			   productService.updateProViews(proNo);
			   
        return productService.getContentProduct(proNo);
    }
	
	@GetMapping("/getOtherProductByMemNo")
    @ResponseBody
    public List<ProductEntity> getOtherProductByMemNo(@RequestParam("memNo") Integer memNo) {
        return productService.getProductByMemNo(memNo);
    }
	
	@GetMapping("/getOtherProductByProCategroy")
    @ResponseBody
    public List<ProductEntity> getOtherProductByProCategroy(@RequestParam("proCategory") String proCategory) {
        return productService.getProductByProCategory(proCategory);
    }
	
	@PostMapping("/insertLiked")
	@ResponseBody
	public ResponseEntity<?> insertLiked(@RequestParam Map<String, String> params) throws Exception {
		
	    productService.insertLiked(params);
	    return ResponseEntity.ok().body("Liked successfully saved!");
		
	}
	
	@PostMapping("/deleteLiked")
	@ResponseBody
	public ResponseEntity<?> deleteLiked(@RequestParam Map<String, String> params) {
	    productService.deleteLiked(params);
	    return ResponseEntity.ok().body("Liked successfully deleted!");
	}
	
	@GetMapping("/checkLikedStatus")
	@ResponseBody
	public ResponseEntity<?> checkLikedStatus(@RequestParam("memNo") int memNo, @RequestParam("proNo") int proNo) {
	    boolean isLiked = productService.isLiked(memNo, proNo);
	    return ResponseEntity.ok().body(isLiked);
	}
	
}
