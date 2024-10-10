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
		                                            <div style="class="sc-d5117916-0 bmBXaP">이메일</div>
		                                            <div style="position:relative;">
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
		                             <!-- <div class="profile_edit_bye"><span>회원탈퇴</span></div> -->
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

// 이메일 동작중인지 확인
let eAuthBtn = false;
// 인증버튼 이미 한번 눌렸는지 확인
let reAuthBtn = false;
// 이메일 인증요청 버튼
$(document).on('click', '#emailAuthBtn', function() {
	if(eAuthBtn) return;
	if(reAuthBtn) ('.reABtn').remove();
	
	eAuthBtn = true;
	reAuthBtn = true;
		
	var loader = `<svg id="loadSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="width:100%; height:100%; shape-rendering: auto; display: block;"><g data-idx="1"><g transform="matrix(1,0,0,1,0,0)" data-idx="2"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="3" opacity="0.053334"></rect></g><g transform="matrix(0.8660254037844387,0.49999999999999994,-0.49999999999999994,0.8660254037844387,31.698729810778058,-18.30127018922194)" data-idx="5"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="6" opacity="0.136667"></rect></g><g transform="matrix(0.5000000000000001,0.8660254037844386,-0.8660254037844386,0.5000000000000001,68.30127018922192,-18.30127018922194)" data-idx="8"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="9" opacity="0.22"></rect></g><g transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,100,0)" data-idx="11"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="12" opacity="0.303334"></rect></g><g transform="matrix(-0.4999999999999998,0.8660254037844387,-0.8660254037844387,-0.4999999999999998,118.30127018922192,31.69872981077805)" data-idx="14"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="15" opacity="0.386667"></rect></g><g transform="matrix(-0.8660254037844387,0.49999999999999994,-0.49999999999999994,-0.8660254037844387,118.30127018922194,68.30127018922194)" data-idx="17"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="18" opacity="0.47"></rect></g><g transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,100,100)" data-idx="20"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="21" opacity="0.553334"></rect></g><g transform="matrix(-0.8660254037844386,-0.5000000000000001,0.5000000000000001,-0.8660254037844386,68.30127018922192,118.30127018922194)" data-idx="23"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="24" opacity="0.636667"></rect></g><g transform="matrix(-0.5000000000000004,-0.8660254037844385,0.8660254037844385,-0.5000000000000004,31.698729810778097,118.30127018922195)" data-idx="26"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="27" opacity="0.72"></rect></g><g transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,7.105427357601002e-15,100)" data-idx="29"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="30" opacity="0.803334"></rect></g><g transform="matrix(0.5000000000000001,-0.8660254037844386,0.8660254037844386,0.5000000000000001,-18.30127018922194,68.30127018922192)" data-idx="32"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="33" opacity="0.886667"></rect></g><g transform="matrix(0.8660254037844384,-0.5000000000000004,0.5000000000000004,0.8660254037844384,-18.30127018922194,31.698729810778104)" data-idx="35"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="36" opacity="0.97"></rect></g><g data-idx="38"></g></g><text data-watermark="true" text-anchor="middle" dominant-baseline="middle" stroke-opacity="0.1" fill="black" fill-opacity="0.1" stroke="white" stroke-width="1" font-size="5.0" x="50" y="50" data-idx="39" style="opacity: 1; font-size: 5px;">LOADING</text></svg>`
	$('#emailAuthBtn').parent('div').append(loader);
	$('#loadSvg').addClass('rotate');
	
	// 새로운 이메일 값
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
	
	
	eAuthBtn = false;
});

let successEmailNumber;

// 인증메일 보내기
function sendEmail(newEmail) {
	const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
	const ckEmail = emailRegex.test(newEmail);
	if(!ckEmail) {
		alert(`입력한 주소가 이메일 형식에 유효하지 않습니다.`);
		return;
	}
	$("#newEmail").attr('readonly', true);
	
	
	
	$.ajax({
		url: '/members/sendEmail',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify({
			MEM_EMAIL : newEmail,
			type : 'check'
		}),
		success: (response) => {
			// 인증번호
			successEmailNumber = response.emailNumber;
			// 인증번호 입력 칸 추가 
			$('#newEmail').after(`<input id="eMailVerCode" type="text" placeholder="인증번호를 입력해주세요" class="input_box phone_input_box detEmail reABtn" value="">`);
			$('#emailAuthBtn').closest('div').after(`<div class="sc-525246f5-0 kHiBe"><button id="ckEmailNumber" class="phone_button_box detEmail reABtn" type="button">확인</button></div>`);
			
			$('#loadSvg').remove();
			
			const ms = 180000; // 3분
			// countDown(time)에서 사용할 초단위 시간
			const time = ms / 1000;
			// 카운트다운 함수 호출
			countDown(time);
			// 인증번호 삭제
			setTimeout(() => {
		        successEmailNumber = '';
		    }, ms);
		},
		error: (error) => {
			console.error(error);
		}
	});
}

// 남은시간 카운트다운
function countDown(time) {
	// 카운트 다운 영역 추가
	$('#eMailVerCode').after(`<b id="countEmail" class="reABtn" style="position: absolute; right: 20px; bottom: 10px;"></b>`)
	let countTime = time;
	
	setInterval(() => {
		const minutes = Math.floor(countTime / 60); // 남은 분
		const seconds = countTime % 60; //  초 구하기
		
		$('#countEmail').html(`${String(Math.floor(minutes)).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
		
		if (countTime <= 0) {
		    clearInterval();
	    } else {
	        countTime--;
	    }
	}, 1000);
};

// 이메일 인증번호 확인
$(document).on('click', '#ckEmailNumber', function() {
	const inputNumber = $("#eMailVerCode").val();
	if(successEmailNumber.length === ''){
		alert(`인증번호가 만료 되었습니다.`);
		return;
	} 
	if(String(successEmailNumber) !== String(inputNumber)) {
		alert(`잘못된 인증번호 입니다`);
		return;
	}
	const newMemEmail = $("#newEmail").val();
	$.ajax({
		url: '/updateEmail',
		type: 'PUT',
		contentType: "application/json",
		data: JSON.stringify({MEM_EMAIL:newMemEmail}),
		success: (response) => {
			if(response === "emailUpdated") {
				alert(`이메일 변경 성공`);
				location.reload();
			}
		},
		error: (error) => {
			alert(`오류! 이메일 변경 실패`);
		}
	});
	
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