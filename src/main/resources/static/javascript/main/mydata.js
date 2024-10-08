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
		                                                <div id="emailVal" class="profile_userId_value">${data.mem_email}</div>
		                                            </div>
		                                            <div>
		                                                <div class="sc-525246f5-0 kHiBe">
		                                                	<button class="emailBtn" type="button">변경</button>
	                                                	</div>
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

//이메일 변경 버튼
$(document).on('click', '.emailBtn', function() {
	const inputMail = `<input id="newEmail" type="text" placeholder="이메일 주소 입력" class="input_box phone_input_box detMail" oninput="this.value = this.value.replace(/[^a-zA-Z0-9a-zA-Z0-9!@#$%^&*().]/g, '');" value="">`
	const authBtn = `<div class="sc-525246f5-0 kHiBe detMail"><button id="emailAuthBtn" class="phone_button_box" type="button">인증요청</button></div>`;
	
	$('#emailVal').after(inputMail);
	$(this).after(authBtn);
	$(this).replaceWith(`<button id="emailCancel" class="edit_cancel_btn" type="button">취소</button>`);
});

// 이메일변경 취소버튼
$(document).on('click', '#emailCancel', function() {
	$('.detMail').remove();
	$('#emailCancel').replaceWith(`<button class="emailBtn" type="button">변경</button>`);
});

// 이메일 인증
$(document).on('click', '#emailAuthBtn', function() {
	const newEmail = $("#newEmail").val();
	$.ajax({
		url: '/members/checkEmail',
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({MEM_EMAIL : newEmail}),
		success: (response) => {
			if(response.length === 0) {
				sendEmail(newEmail);
			} else {
				alert(`이미 등록된 이메일 입니다.`);
			}
		}
	})
});

let successEmailNumber;
// 인증메일 보내기
function sendEmail(newEmail) {
	const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
	const ckEmail = emailRegex.test(newEmail);
	debugger;
	if(!ckEmail) {
		alert(`입력한 주소가 이메일 형식에 유효하지 않습니다.`);
		return;
	}
	
	
	$("#newEmail").attr('readonly', true);
	$('#newEmail').after(`<input id="eMailVerCode" type="text" placeholder="인증번호를 입력해주세요" class="input_box phone_input_box detEmail" value="">`);
	$('#emailAuthBtn').closest('div').after(`<div class="sc-525246f5-0 kHiBe"><button id="ckEmailNumber" class="phone_button_box detEmail" type="button">확인</button></div>`);
	
	$.ajax({
		url: '/members/sendEmail',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({
			MEM_EMAIL : newEmail,
			type : 'check'
		}),
		success: (response) => {
			successEmailNumber = response;
		},
		error: (error) => {
			console.error(error);
		}
//		check
	});
}

$(document).on('click', '#ckEmailNumber', function() {
	const inputNumber = ('#eMailVerCode').val();
	const newMemEmail = $("#newEmail").val();
	
	if(successEmailNumber === inputNumber) {
		location.href = `/myPage/insertEmail?MEM_EMAIL=${newMemEmail}`
	} else {
		alert(`잘못된 인증번호 입니다`);
	}
});







// 비밀번호 변경 버튼
$(document).on('click', '.passByBtn', function() {
	var text =
	`<li class="profile_password_area profile_password_area_middle">
	    <div class="sc-d5117916-0 bmBXaP">현재 비밀번호</div>
	    <div>
	        <input id="oldPass"  oninput="this.value = this.value.replace(/[^a-zA-Z0-9._%+-@]/g, '');" autocomplete="new-password" type="password" placeholder="현재 비밀번호 입력" class="input_box" value="">
	    </div>
	    <div style="text-align: center;">
	    	<i id="viewPass" class="material-icons" style="font-size:36px; width: 36px; height:36px; cursor: pointer; opacity: 0.75;">visibility_off</i>
		</div>
	</li>
	<li class="profile_password_area profile_password_area_last">
	    <div class="sc-d5117916-0 bmBXaP">신규 비밀번호</div>
	    <div>
	        <input id="newPass" oninput="this.value = this.value.replace(/[^a-zA-Z0-9a-zA-Z0-9!@#$%^&*()]/g, '');" autocomplete="new-password" type="password" placeholder="10자 이내 신규 비밀번호 입력" maxlength="10" class="input_box" value="">
	    </div>
	    <div class="sc-525246f5-0 kHiBe">
	        <button id="updatePass" type="button">확인</button>
	    </div>
	</li>
	`
	$(this).closest('li').after(text);
	$('.passByBtn').replaceWith(`<button class="passReplaceBtn" type="button">취소</button>`);
});

// 비밀번호
$(document).on('click', '#viewPass', function() {
	const viewCheck  = $(this).text();
	const onByOff = viewCheck == 'visibility_off' ? $(this).text('visibility_on') : $(this).text('visibility_off');
	
	if(onByOff.text() == 'visibility_on') {
		$('.profile_password_area').find('input').attr('type', 'text');
	} else if(onByOff.text() == 'visibility_off') {
		$('.profile_password_area').find('input').attr('type', 'password');
	}
});


//String MEM_EMAIL, String type, String randomNumber


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