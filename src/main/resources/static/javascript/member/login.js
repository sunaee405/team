$(document).ready(function() {
	var isPhoneCheck = false;
	var isNicknameCheck = false;

	// 본인인증 사용횟수 제한 때문에 주석쳐둠

	// 로그인 페이지 틀 start
	const signIn = `
    <div class="wrapper">
      <div class="container">
        <form>
          <h1>로그인</h1>
          <div class="social-links">
            <div>
              <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            </div>
            <div>
              <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            </div>
            <div>
              <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            </div>
          </div>
          <input type="email" placeholder="ID">
          <input type="password" placeholder="Password">
          <button type="button" class="formBtn" id="signInBtn">로그인</button>
          <button type="button" class="formBtn" id="signUpBtn">회원가입</button>
        </form>
      </div>
    </div>
  `;

	// 회원가입 페이지 틀 start
	const signUp = `
       <div class="wrapper">
        <div class="container">
          <form id="signUpForm">
            <h1>회원 가입</h1>
            <input type="hidden" name="MEM_SNS" value="F">
    		<input type="hidden" name="MEM_STATUS" value="F">
         	<input type="text" id="name" name="name" placeholder="이름" 
           		pattern="^[가-힣]+$" required title="이름칸은 한글만 입력 가능합니다." />
            <input type="text" id="id" placeholder="ID 10자이내 특수문자X" maxlength="10"
      			oninput="this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');" >
            <input type="password" id="pw" placeholder="Password 10자이내" maxlength="10" >
            <input type="password" id="pw2" placeholder="Password Check" >
            <span id="checkPw" ></span>
            <input type="text" id="nickname" placeholder="닉네임 7자이내 한글만가능" maxlength="7">
            <span id="nicknameMessage" style="color: red;"></span>
            <input type="text" id="birth" placeholder="생년월일 ex)980319" maxlength="6" pattern="\d{6}" oninput="this.value = this.value.replace(/[^0-9]/g, '');"  >
            <input type="email" id="email" placeholder="이메일"   >
            <span id="emailSub" style="color: blue; font-size: 12px; display: none;">아이디/비밀번호 찾기 시 해당 메일로 발송됩니다.</span>
            <div class="phoneGroup">
    			<input type="text" id="phone" placeholder="전화번호 -제외" maxlength="11" pattern="\d{11}" oninput="this.value = this.value.replace(/[^0-9]/g, '');"  >
  				<button type="button" class="checkPhone" id="checkPhone">본인인증</button>
			</div>
			<div class="phoneGroup">
    			<input type="text" id="checkNumber" placeholder="인증번호 입력"  >
  				<button type="button" class="check" id="check">확인</button>
			</div>
			
            <div class="radioGroup">
              <label>
                <input type="radio" name="gender" value="male"   /> 남
              </label>
              <label>
                <input type="radio" name="gender" value="female"   /> 여
              </label>
            </div>
            <button type="button" class="formBtn" id="signUpSubmit">가입하기</button>
            <button type="button" class="formBtn" id="rollBack">로그인 하러가기</button>
          </form>
        </div>
      </div>
    `;

	// 초기화면 실행 start
	showSignIn();

	// 로그인 페이지를 body에 추가 함수 start
	function showSignIn() {
		$("body").html(signIn);
	}

	// 회원가입 페이지 body에 추가 함수 start
	function showSignUp() {
		$("body").html(signUp);
	}

	// 회원가입 버튼 클릭 이벤트 start
	$(document).on("click", "#signUpBtn", function() {
		showSignUp();
	});

	// 로그인 페이지로 돌아가는 rollback 클릭 이벤트 start
	$(document).on("click", "#rollBack", function() {
		showSignIn();
	});

	//회원가입시 필드값 유무 검사 함수 start
	$(document).on("click", "#signUpSubmit", function() {
		if (!inputCheck('#id', 'ID를 입력해 주세요!')) return;
		if (!inputCheck('#pw', '비밀번호를 입력해 주세요!')) return;
		if (!inputCheck('#pw2', '비밀번호 확인을 입력해 주세요!')) return;
		if (!inputCheck('#nickname', '닉네임을 입력해 주세요!')) return;
		if (!inputCheck('#birth', '생년월일을 입력해 주세요!')) return;
		if (!inputCheck('#email', '이메일을 입력해 주세요!')) return;
		if (!$("input[name='gender']:checked").val()) {
			alert('성별을 선택해 주세요!');
			return;
		}
		//		if (isPhoneCheck == false) {
		//			alert('본인인증 해주세요!');
		//			return;
		//		}

		if (isNicknameCheck == false) {
			alert('닉네임이 유효하지 않습니다.');
			return;
		}

		var id = $('#id').val();
		var nickname = $('#nickname').val();
		$.ajax({
			url: '/members/checkId',
			type: 'POST',
			data: JSON.stringify({
				id: id
				, nickname: nickname
			}),
			contentType: 'application/json',
			success: function(response) {

				if (response.nicknameCount > 0) {
					alert('중복된 닉네임 입니다.');
				} else if (response.idCount > 0) {
					alert('중복된 아이디 입니다.');
				} else {
					insertUser();
				}
			},
			error: function() {
				alert('ID 체크에 실패했습니다.');
			}
		});
	});

	// input 값 다 들었는지 체크 함수 start
	function inputCheck(fieldId, alertMessage) {
		if (!$(fieldId).val()) {
			alert(alertMessage);
			return false;
		}
		return true;
	}


	// 본인인증 버튼 클릭 이벤트 start
	//	$(document).on("click", "#checkPhone", function() {
	//		let phone = $('#phone').val(); // 입력된 전화번호 값
	//
	//		if (!phone) {
	//			alert('전화번호를 입력해 주세요!');
	//			return;
	//		}
	//
	//		sendMessage(phone);
	//
	//	});

	// 전화번호란 수정 했을때 다시 본인인증 함수 
	//	$(document).on("input", "#phone", function() {
	//		isPhoneCheck = false;
	//		sessionStorage.removeItem('randomNumber');
	//	});


	// 비밀번호 2차 체크 함수 start
	$(document).on("input", "#pw2", function() {
		const pw = $('#pw').val();
		const pw2 = $(this).val();
		const message = $('#checkPw');

		if (pw2 === pw) {
			message.text('일치합니다').css('color', 'blue');
		} else {
			message.text('불일치합니다').css('color', 'red');
		}
	});


	// 닉네임 확인 함수 start
	$(document).on("input", "#nickname", function() {

		const isValid = /^[가-힣0-9]*$/.test($(this).val());

		if (!isValid) {
			$('#nicknameMessage').text('잘못된 형식의 아이디입니다.').css('color', 'red');
			isNicknameCheck = false;
		} else {
			$('#nicknameMessage').text('');
			isNicknameCheck = true;
		}
	});


	// 이메일 입력시 span값 표시 함수 start
	$(document).on("input", "#email", function() {
		if ($(this).val()) {
			$('#emailSub').show();
		} else {
			$('#emailSub').hide();
		}
	});


	// 인증번호 확인 버튼 클릭 이벤트 start
	//	$(document).on("click", "#check", function() {
	//		let enterNumber = $('#checkNumber').val();
	//		let randomNumber = sessionStorage.getItem('randomNumber');
	//		if (!randomNumber) {
	//			alert('먼저 본인인증을 진행해 주세요!');
	//			return;
	//		}
	//		if (enterNumber === randomNumber) {
	//			alert('인증이 완료되었습니다!');
	//			isPhoneCheck = true;
	//			sessionStorage.removeItem('randomNumber');
	//		} else {
	//			alert('인증번호가 틀립니다. 다시 시도해 주세요.');
	//		}
	//	});

	// 인증 문자 발송 ajax 함수 start
//	function sendMessage(phone) {
//		$.ajax({
//			url: '/send-message',
//			type: 'POST',
//			data: JSON.stringify({ phone: phone }),
//			contentType: 'application/json',
//			success: function(response) {
//				alert('본인인증 메시지가 전송되었습니다.');
//				sessionStorage.setItem('randomNumber', response.randomNumber);
//				isPhoneCheck = false;
//			},
//			error: function(xhr) {
//				if (xhr.status === 409) { 
//					alert(xhr.responseText); 
//				} else {
//					alert('메시지 전송에 실패했습니다.');
//				}
//			}
//		});
//	}

	// 폼 초기화 함수 start
	function resetForm() {
		$('#signUpForm')[0].reset();
		isPhoneCheck = false;
	}


	//회원가입 insert 함수 start 	
	function insertUser() {
		var phone = $('#phone').val();
		var name = $('#name').val();
		var id = $('#id').val();
		var pw = $('#pw').val();
		var nickname = $('#nickname').val();
		var birth = $('#birth').val();
		var email = $('#email').val();
		var gender = $("input[name='gender']:checked").val();
		var sns = 'F';
		var status = 'F';

		$.ajax({
			url: '/members/insertUser',
			type: 'POST',
			data: JSON.stringify({
				MEM_ID: id
				, MEM_PW: pw
				, MEM_NICK: nickname
				, MEM_BIRTH: birth
				, MEM_EMAIL: email
				, MEM_GENDER: gender
				, MEM_NAME: name
				, MEM_TEL: phone
				, MEM_SNS: sns
				, MEM_STATUS: status
			}),
			contentType: 'application/json',
			success: function(response) {
				alert('회원가입이 완료되었습니다!');
				resetForm();
				showSignIn();
			},
			error: function() {
				alert('회원가입에 실패했습니다.');
			}
		});

	}


















});  // 끝 
