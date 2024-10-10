package com.example.team.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.team.model.BannerImgEntity;
import com.example.team.model.ChattingEntity;
import com.example.team.model.MemberEntity;
import com.example.team.service.MyPageService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import reactor.netty.http.server.HttpServerRequest;
import retrofit2.http.GET;

@RestController
public class MyPageController {
	
	@Autowired
	private MyPageService myPageService;
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	@GetMapping("/api/topLogout")
	public ResponseEntity<?> logout(HttpSession session) {
		System.out.println("로그아웃");
		session.invalidate();
		return ResponseEntity.status(HttpStatus.FOUND) // 302 Found
                			 .location(URI.create("/myPage/main")) // 리다이렉트할 URL
                			 .build();
	}
	
	
	
	@PostMapping("/insertBanner")
	public ResponseEntity<?> insertBanner(@RequestParam("file") MultipartFile file) {
	    System.out.println("배너업로드");

	    try (ByteArrayOutputStream baos = new ByteArrayOutputStream();) {
	        // 클라이언트에서 업로드된 파일을 BufferedImage로 변환
	        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
	        
	        // PNG 형식으로 변환하기 위한 ImageWriter 설정
            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("png");
            ImageWriter writer = writers.next();
            // 이미지 읽기
            try (ImageOutputStream ios = ImageIO.createImageOutputStream(baos)) {
                writer.setOutput(ios);

                // 이미지 파일 무손실 압축
                ImageWriteParam param = writer.getDefaultWriteParam();
                param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT); // 압축 설정
                param.setCompressionQuality(1.0f); // 압축 비율

                // 변환한 이미지 저장
                writer.write(null, new IIOImage(bufferedImage, null, null), param);
                
                BannerImgEntity bannerImgEntity = new BannerImgEntity();
                bannerImgEntity.setBanImg(baos.toByteArray());
                
                myPageService.insertBanner(bannerImgEntity);               
            } finally {
            	// 닫기
                writer.dispose();
            }
            
	    } catch (IOException e) {
	    	e.printStackTrace();
	    }
	    return null;
	}
	
	@GetMapping("/getBanner")
	public ResponseEntity<?> getBanner() {
		List<BannerImgEntity> entity = myPageService.getBanner();
		List<Map<String, Object>> data = new ArrayList();
		for(int i = 0; i < entity.size(); i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			String base64Url = "data:image/png;base64," + Base64.getEncoder().encodeToString(entity.get(i).getBanImg());
			map.put("base64Url", base64Url);
			map.put("link", entity.get(i).getBanCode());
			data.add(map);
		}
		return ResponseEntity.ok().body(data);
	}
	
	
	
	// 공통코드 불러오기
	public Map<String, Object> getDetailCode() {
		String jsonStr = myPageService.getDetailCode();
		Map<String, Object> code = new HashMap<String, Object>();
		try {
			code = objectMapper.readValue(jsonStr, new TypeReference<Map<String, Object>>() {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return code;
	}
	
			
	
	// 테이블 공통코드 변환
	public <T> T transCode(Object data) {
	    try {
	    	objectMapper.registerModule(new JavaTimeModule());
	    	objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
			Map<String, Object> code = getDetailCode();
			String str = objectMapper.writeValueAsString(data);

		    // 키를 | 로 구분해 정규표현식에 사용할 문자열 패턴 생성
		    String regex = String.join("|", code.keySet());
		    
		    // 정규표현식 패턴
		    Pattern pattern = Pattern.compile(regex);
		    
		    // 치환
		    String result = pattern.matcher(str).replaceAll(match -> {
		        String matchedKey = match.group();
		        return code.get(matchedKey).toString();
		    });
		    
//		    result = result.replaceAll("(\\w+)=([\\s\\S]*?)(?=,|\\})", "\"$1\":\"$2\"") // 키에 큰따옴표 추가
//				    	   .replaceAll("=\"\"", ": \"\"") // 빈 값 처리
//				    	   .replaceAll("=(\\d+)", ": $1") // 숫자는 그대로 유지
//				    	   .replaceAll("=(\\w+)", ": \"$1\""); // 문자열 값에 큰따옴표 추가
		    
		    System.out.println(result);
		    if (data instanceof Map) {
	            return (T) objectMapper.readValue(result, Map.class);
	        } else if (data instanceof List) {
	            return (T) objectMapper.readValue(result, List.class);
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
		}
	    
		return (T) "실패";
	}
	
	
	// ========================================== 메인, TOP ======================================================	
	
	
	// 상단영역 카테고리 불러오기
	@GetMapping("/getCategory")
	public ResponseEntity<?>  getCategory() {
		List<Map<String, Object>> categoryList = myPageService.getCategory();
		return ResponseEntity.ok().body(categoryList);
	}
	
	// 메인페이지 상품메뉴 생성
	@GetMapping("/getMainProductList")
	public ResponseEntity<?> getMainProductList(@RequestParam Map<String, Object> data) {
		List<Map<String, Object>> productList = myPageService.getMainProductList(data);
		
		productList = transCode(productList);
		
		if(productList != null && !productList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(productList);
		} else {
			return ResponseEntity.badRequest().body("emptyList");
		}
	}
	
	
	
	// 세션에서 값 가져오기
	@GetMapping("/getSession")
	public Optional<MemberEntity> getSession(HttpSession session) {
		String data = (String) session.getAttribute("MEM_ID");
		System.out.println("세션요청" + data);
		
		Optional<MemberEntity> entity = myPageService.getSession(data);
		
		return entity;
	}
	
	// ============================================ 마이페이지 ========================================================================
	@PostMapping("/getDetailMyProduct")
	public ResponseEntity<?> getDetailMyProduct(@RequestBody Map<String, Object> data) {
		System.out.println(data);
		
		List<Map<String, Object>> proList = myPageService.getDetailMyProduct(data);
		
		System.out.println("마이페이지 상품목록" + proList);
		if(proList != null && proList.size() != 0) {
			proList = transCode(proList);
			return ResponseEntity.status(HttpStatus.OK).body(proList);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("noList");
		}
		
	}
	// 회원정보 찾기
	@PostMapping("/getMemberData")	
	public Optional<MemberEntity> getMemberData(HttpSession session) {
		String data = (String) session.getAttribute("MEM_ID");
		Optional<MemberEntity> entity = myPageService.getSession(data);
		
		return entity;
	}
	
	// 비밀번호 수정
	@PostMapping("/updatePass")
	public ResponseEntity<?> updatePass(HttpSession session, @RequestParam Map<String, Object> passData) {
		String data = (String) session.getAttribute("MEM_ID");
		Optional<MemberEntity> entity = myPageService.getSession(data);
		MemberEntity memEntity = entity.get();
		String pass = memEntity.getMemPw();
		
		if(pass != null && pass.equals(passData.get("oldPass"))) {
			memEntity.setMemPw((String)passData.get("newPass"));
			myPageService.updateMemData(memEntity);
			return ResponseEntity.ok().body("success");
		} else {
			return ResponseEntity.badRequest().body("failedPass");
		}
		
	}
	
	// 닉네임 수정
	@PostMapping("/updateNick")
	public ResponseEntity<?> updateNick(HttpSession session, @RequestParam Map<String, Object> nickData) {
		String data = (String) session.getAttribute("MEM_ID");
		Optional<MemberEntity> entity = myPageService.getSession(data);
		MemberEntity memEntity = entity.get();
		String newNick = (String)nickData.get("newNickNm");
		memEntity.setMemNick(newNick);
		
		myPageService.updateMemData(memEntity);
		
		return ResponseEntity.ok().body(newNick);
	}
	
	// 회원 탈퇴 신청
	@PutMapping("/deleteMember")
	public ResponseEntity<String> deleteMember(@RequestBody Map<String, Object> data, HttpSession session) {
		System.out.println("회원탈퇴신청");
		
		// 로그인 유무 확인
		String id = (String) session.getAttribute("MEM_ID");
		if(id == null) return ResponseEntity.status(HttpStatus.OK).body("login");
		// 해당 세션의 id값에 해당하는 멤버가 존재하지 않음
		Optional<MemberEntity> entity = myPageService.getSession(id);
		if(entity == null) return ResponseEntity.status(HttpStatus.OK).body("nullMember");
		
		MemberEntity memEntity = entity.get();
		
		// 날자를 LocalDateTime으로 파싱
		LocalDateTime MEM_RESPITE = convertDate((String)data.get("MEM_RESPITE"));
		LocalDateTime MEM_OUT = convertDate((String)data.get("MEM_OUT"));
		
		memEntity.setMEM_RESPITE(MEM_RESPITE);
		memEntity.setMEM_OUT(MEM_OUT);
		memEntity.setMEM_STATUS("T");
		myPageService.deleteMember(memEntity);
		return ResponseEntity.status(HttpStatus.OK).body("success");
	}
	
	public LocalDateTime convertDate(String date) {
		return ZonedDateTime.parse(date).toLocalDateTime();
	}
	
	
	// ============================================ 채팅 =============================================================================
	
	
	
	// 채팅방 채팅로그 업데이트
	@PostMapping("/updateChat")
	public ResponseEntity<?> updateChat(@RequestBody Map<String, Object> data, HttpSession session) {
		String memId = (String)session.getAttribute("MEM_ID");
		if(memId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("notLogin");
		
		Optional<MemberEntity> entity = myPageService.getSession(memId);
		MemberEntity memEntity = entity.get();
		String memNo = memEntity.getMemNo().toString();
		data.put("USERID", memNo);
		
		boolean check = myPageService.updateChat(data);
				
		if(check) {
			List<ChattingEntity> chattingEntity = myPageService.getChatRoom(data);
			return ResponseEntity.ok(chattingEntity);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("failedUpdate");
		}
	}
	
	
	// 로그인한 회원의 전체 채팅 목록
	@GetMapping("/getChatList")
	public ResponseEntity<?> getChatList(@RequestParam Map<String, Object> data, HttpSession session) {
		String memId = (String)session.getAttribute("MEM_ID");
		if(memId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("notLogin");
		
		
		List<Map<String, Object>> chatList = myPageService.getChatList(data);
		return ResponseEntity.ok().body(chatList);
	}
	
	
	// 채팅방 값 찾기 + 값 없으면 채팅방 생성
	@PostMapping("/chatRoom")
	public ResponseEntity<?> getChatRoom(@RequestParam Map<String, Object> data, HttpSession session) {
		String memId = (String)session.getAttribute("MEM_ID");
		if(memId == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("notLogin");
		
		Optional<MemberEntity> entity = myPageService.getSession(memId);
		MemberEntity memEntity = entity.get();
		
		String selMem = (String)data.get("SEL_MEM");
		
		if(selMem != null) {
			int user1 = Integer.parseInt(selMem);
			int user2 = memEntity.getMemNo().intValue();
					
			if(user1 > user2) {
				int num = user1;
				user1 = user2;
				user2 = num;
			}
			
			data.put("CHA_MEM1", user1);
			data.put("CHA_MEM2", user2);
		}
		
		List<ChattingEntity> chattingEntity = myPageService.getChatRoom(data);
		
		if(chattingEntity == null || chattingEntity.size() == 0) {
			myPageService.insertChatRoom(data);
			System.out.println(data);
			chattingEntity = myPageService.getChatRoom(data);
		}
		
		System.out.println("채팅방"+chattingEntity);
		return ResponseEntity.status(HttpStatus.OK).body(chattingEntity);
	}
	
	
	
	

}
