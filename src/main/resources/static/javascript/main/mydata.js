$(function() {
	$('<link/>', {rel: 'stylesheet', type: 'text/css', href: '/static/css/main/f408636dd8aac38d.css'}).appendTo('head');
    $('<link/>', {rel: 'stylesheet', type: 'text/css', href: '/static/css/main/fd4887462b6d7b50.css'}).appendTo('head');


    myDataInner();
});


function myDataInner() {
	$.ajax({
		url: '/getMemberData',
		type: 'POST',
		dataType: 'json',
		success: (data) => {
			
			if(data.mem_pw === 0) {
				alert('네이버 ID 회원은 거래 사이트에서 회원정보 관리가 불가능 합니다')
				history.back();
			};
			
			var text =
			`<div class="item_list_min">
			    <div class="item_list_area">
			        <div class="main_area">
			            <div class="main_area_center">
			                <div class="main">
		                         <div class="profile_edit_wrapper">
		                              <div class="profile_edit_image">
		                                    <div class="profile_edit_image_box">
		                                        <img src="https://ccimage.hellomarket.com/img/web/common/empty_profile.svg" alt="${data.mem_nick}">
		                                        <img src="https://ccimage.hellomarket.com/img/web/member/edit_camera.svg" alt="프로필 사진 등록 이미지">
		                                        <input type="file" class="pf_img" name="file" id="upFile" accept="image/jpeg, image/png">
		                                    </div>
		                                </div>
		                                <div class="profile_edit_main">
		                                    <ul>
		                                        <li>
		                                            <div>닉네임</div>
		                                            <div><input id="userNick" type="text" class="input_box" value="${data.mem_nick}"></div>
		                                            <div><button id="nickBtn" type="button">변경</button></div>
		                                        </li>
		                                        <li>
		                                            <div class="sc-d5117916-0 bmBXaP">이메일</div>
		                                            <div>
		                                                <div class="profile_userId_value">${data.mem_email}</div>
		                                                <div class="emailErrorMsg"></div>
		                                            </div>
		                                            <div>
		                                                <div class="sc-525246f5-0 kHiBe"><button class="" type="button">변경</button></div>
		                                            </div>
		                                        </li>
		                                        <li>
		                                            <div class="sc-d5117916-0 bmBXaP">비밀번호</div>
		                                            <div class="profile_userId_value">****************</div>
		                                            <div class="sc-525246f5-0 kHiBe"><button class="passByBtn" type="button">변경</button></div>
		                                        </li>
		                                        <li>
		                                            <div>이름 (전화번호)</div>
		                                            <div class="certificates_box">
		                                                <div class="profile_userId_value">${data.mem_name} (${data.mem_tel})</div>
		                                            </div>
		                                            <!-- <div class="certificates_box_btn"><button class="" type="button">이름변경</button></div> -->
		                                        </li>
		                                        <!-- 카카오톡 네이버 연동 주석 
		                                        <li>
		                                            <div class="sc-d5117916-0 jksEIJ">소셜연동</div>
		                                            <div>
		                                                <div>
	                                                   
	                                               <div class="sc-a27a2b0b-0 fDwYcZ">
		                                                        <img src="https://ccimage.hellomarket.com/img/web/auth/kakao_check_x2.png" alt="social logo" class="sc-a27a2b0b-2 cwNsJy">
		                                                        <div class="sc-a27a2b0b-1 gCbZiB">카카오톡</div>
		                                                    </div> 
		                                                    <div class="sc-a27a2b0b-0 fDwYcZ">
		                                                        <img src="https://ccimage.hellomarket.com/img/web/auth/naver_check_x2.png" alt="social logo" class="sc-a27a2b0b-2 cwNsJy">
		                                                        <div class="sc-a27a2b0b-1 gCbZiB">네이버 연동완료</div>
		                                                    </div>
		                                                </div>
		                                            </div>
		                                            
		                                            <div>
		                                                <div>
		                                                    <div>
		                                                        <div class="sc-525246f5-0 bfnbzk"><button class="">연동</button></div>
		                                                    </div>
		                                                    <div>
		                                                        <div class="sc-525246f5-0 bfnbzk"><button class="edit_cancel_btn">해제</button></div>
		                                                    </div>
		                                                </div>
		                                            </div>
		                                        </li>
		                                        -->
		                                    </ul>
		                                    <div class="profile_edit_bye"><span>회원탈퇴</span></div>
		                                </div>
		                            </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			`
			$('body').append(text);
			
		},
		error: (error) => {
			debugger;
		}
	});
}

//닉네임 변경
$(document).on('click', '#nickBtn', function() {
	const newNickNm = $('#userNick').val();
	
	$.ajax({
		url: '/updateNick',
		type: 'POST',
		data : {"newNickNm" : newNickNm},
		success: (data) => {
			alert('닉네임 변경 성공')
		},
		error: (error) => {
			alret('오류! 닉네임 변경 실패');
		}
	})
	
});



// 비밀번호 변경 버튼
$(document).on('click', '.passByBtn', function() {
	var text =
	`<li class="profile_password_area profile_password_area_middle">
	    <div class="sc-d5117916-0 bmBXaP">현재 비밀번호</div>
	    <div>
	        <input id="oldPass" autocomplete="new-password" type="password" placeholder="현재 비밀번호 입력" class="input_box" value="">
	    </div>
	</li>
	<li class="profile_password_area profile_password_area_last">
	    <div class="sc-d5117916-0 bmBXaP">신규 비밀번호</div>
	    <div>
	        <input id="newPass" autocomplete="new-password" type="password" placeholder="신규 비밀번호 입력" class="input_box" value="">
	    </div>
	    <div class="sc-525246f5-0 kHiBe">
	        <button id="updatePass" type="button">확인</button>
	    </div>
	</li>
	`
	$(this).closest('li').after(text);
	$('.passByBtn').replaceWith(`<button class="passReplaceBtn" type="button">취소</button>`);
});
// 비밀번호 변경 취소 버튼
$(document).on('click', '.passReplaceBtn', function() {
	$('.passReplaceBtn').replaceWith(`<button class="passByBtn" type="button">변경</button>`);
	$('.profile_password_area').remove();
});
// 회원정보 변경
$(document).on('click', '#updatePass', function() {
	const oldPass = $('#oldPass').val();
	const newPass = $('#newPass').val();
	
	$.ajax({
		url: '/updatePass',
		type: 'POST',
		data : {"oldPass" : oldPass, "newPass":newPass},
		success: (data) => {
			alert('비밀번호 변경 성공')
			$('.passReplaceBtn').trigger('click');
		},
		error: (error) => {
			alret('입력하신 비밀번호와 현재 비밀번호가 일치하지 않습니다');
		}
	})
	
});