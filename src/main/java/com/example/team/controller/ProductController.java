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
	
//	@GetMapping("/images/{filename:.+}")
//    @ResponseBody
//    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws MalformedURLException {
//        Path file = Paths.get("C:/Users/ITWILL/Desktop/upload/").resolve(filename);
//        Resource resource = new UrlResource(file.toUri());
//
//        if (resource.exists() || resource.isReadable()) {
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//                    .body(resource);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }
	
	
    

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

	@PostMapping("/insertProduct")
	@ResponseBody
	public ResponseEntity<?> insertProduct(@RequestParam("media") MultipartFile[] media, //
			@RequestParam Map<String, String> params) throws Exception {

		String productTitle = params.get("productTitle");
		String categoryCode = params.get("categoryDcoId");
		String locationCode = params.get("locationDcoId");
		String stateCode = params.get("stateDcoId");
		String typeCode = params.get("typeDcoId");
		String negoCode = params.get("negoDcoId");
		String productPrice = params.get("productPrice");
		String productDescription = params.get("productDescription");

		// 파일 저장 경로 설정

		// 집
// 		String desktopPath = "C:\\Users\\Anibal\\Desktop\\upload";

		// 학원
		String desktopPath = "C:\\Users\\ITWILL\\Desktop\\upload";
		List<String> savedFileNames = new ArrayList<>();

		for (MultipartFile file : media) { // media 배열로 파일 처리
			UUID uuid = UUID.randomUUID();
			String fileName = uuid.toString() + "_" + file.getOriginalFilename();
			FileCopyUtils.copy(file.getBytes(), new File(desktopPath, fileName));
			savedFileNames.add(fileName);
		}

		// 카테고리 값을 MCO_ID + SCO_ID + DCO_ID 형태로 변환

		// 파일명을 Map에 저장
		Map<String, Object> productData = new HashMap<>();
		productData.put("productTitle", productTitle);
		productData.put("fileNames", String.join(",", savedFileNames));
		productData.put("categoryCode", categoryCode);// 파일명을 ','로 구분하여 저장
		productData.put("locationCode", locationCode);
		productData.put("stateCode", stateCode);
		productData.put("productPrice", productPrice);
		productData.put("productDescription", productDescription);
		productData.put("typeCode", typeCode);
		productData.put("negoCode", negoCode);

		// 서비스 호출
		productService.insertProduct(productData);

		return ResponseEntity.ok().body("Product successfully saved!");

	}

	// =================================== 상품 목록 ===================================

	@GetMapping("/getSortList")
	@ResponseBody
	public List<Map<String, Object>> getSortList() {
		return productService.getSortList();
	}

	@GetMapping("/listMainProducts")
	@ResponseBody
	public List<ProductEntity> getProductsSortedByViews(@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "20") int size) {
		Page<ProductEntity> productPage = productService.getProductsSortedByViews(page, size);
		return productPage.getContent();
	}

}
