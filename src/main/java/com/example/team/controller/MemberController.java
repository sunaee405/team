package com.example.team.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.team.service.MemberService;

@RestController
@RequestMapping("/members")
public class MemberController {

	@Autowired
	private MemberService memberService;

	@PostMapping("/checkId")
	public ResponseEntity<Map<String, Integer>> checkIdAndNickname(@RequestBody Map<String, String> data) {
		String MEM_ID = data.get("id");
		String MEM_NICK = data.get("nickname");

		long idCount = memberService.checkId(MEM_ID);
		long nicknameCount = memberService.checkNickname(MEM_NICK);

		Map<String, Integer> result = new HashMap<>();
		result.put("idCount", (int) idCount);
		result.put("nicknameCount", (int) nicknameCount);

		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/insertUser")
    public ResponseEntity<Void> insertUser(@RequestBody Map<String, String> data) {
        memberService.insertUser(data); 
        return ResponseEntity.ok().build(); 
    }

}
