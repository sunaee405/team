$(document).ready(function() {
	var isPhoneCheck = false;
	var isNicknameCheck = false;
	var isEmailCheck = false;


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
          <input type="text" placeholder="ID">
          <input type="password" placeholder="Password">
          <button type="button" class="formBtn" id="signInBtn">로그인</button>
          <button type="button" class="formBtn" id="signUpBtn">회원가입</button>
          <button type="button" class="formBtn" id="findIdBtn">아이디,비밀번호찾기</button>
          <button type="button" class="formBtn" id="naverLoginButton">네이버</button>
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
            <div class="checkGroup">
            <input type="email" class="checkInput" id="email" placeholder="이메일">
            <button type="button" class="checkButton" id="sendEmailButton">메일인증</button>
            </div>
            <span id="emailSub" style="color: blue; font-size: 12px; display: none;">아이디/비밀번호 찾기 시 해당 메일로 발송됩니다.</span>
            <div class="checkGroup">
    			<input type="text" class="checkInput" id="checkEmail" placeholder="인증번호 입력" >
  				<button type="button" class="checkButton" id="checkEmailButton">확인</button>
			</div>
            <div class="checkGroup">
    			<input type="text" class="checkInput" id="phone" placeholder="전화번호 -제외" maxlength="11" pattern="\d{11}" oninput="this.value = this.value.replace(/[^0-9]/g, '');"  >
  				<button type="button" class="checkButton" id="checkPhone">본인인증</button>
			</div>
			<div class="checkGroup">
    			<input type="text" class="checkInput" id="checkNumber" placeholder="인증번호 입력"  >
  				<button type="button" class="checkButton" id="check">확인</button>
			</div>
			
            <div class="radioGroup">
              <label>
                <input type="radio" name="gender" value="male"/> 남
              </label>
              <label>
                <input type="radio" name="gender" value="female"/> 여
              </label>
            </div>
            <button type="button" class="formBtn" id="signUpSubmit">가입하기</button>
            <button type="button" class="formBtn" id="rollBack">로그인 하러가기</button>
          </form>
        </div>
      </div>
    `;

	// 아이디 찾기  틀 start 
	const findId = `
    <div class="wrapper">
      <div class="container">
        <form>
          <h1>아이디 찾기</h1>
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
          <div class="checkGroup">
          	<input type="email" class="checkInput" id="findEmail" placeholder="받을 메일 주소">
  			<button type="button" class="checkButton"  id=sendFindEmail >인증</button>
		  </div>
		  <button type="button" class="formBtn" id="rollBack">로그인</button>
		  <button type="button" class="formBtn" id="findPwBtn">비밀번호 찾기</button>		
        </form>
      </div>
    </div>
    `;

	// 비밀번호 찾기  틀 start 
	const findPw = `
    <div class="wrapper">
      <div class="container">
        <form>
          <h1>비밀번호 찾기</h1>
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
          <input type="text" id="findPwId" placeholder="ID">
          <div class="checkGroup">
          	<input type="email" class="checkInput" id="findPwEmail" placeholder="받을 메일 주소">
  			<button type="button" class="checkButton"  id=sendFindPwEmail >인증</button>
		  </div>
		  <button type="button" class="formBtn" id="rollBack">로그인</button>
        </form>
      </div>
    </div>
    `;


	const resetPw = `
    <div class="wrapper">
      <div class="container">
        <form>
          <h1>비밀번호 찾기</h1>
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
          <input type="text" id="nowId" placeholder="ID">
          <input type="text" id="nowPw" placeholder="PW">
          
          <input type="password" id="resetpw" placeholder="Password 10자이내" maxlength="10" >
          <input type="password" id="resetpw2" placeholder="Password Check" >
          <span id="checkPw" ></span>
		  <button type="button" class="formBtn" id="resetPwBtn">비밀번호 수정</button>
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

	// 아이디 찾기 페이지 body에 추가 함수 start
	function showFindId() {
		$("body").html(findId);
	}

	// 비밀번호 찾기 페이지 body에 추가 함수 start
	function showFindPw() {
		$("body").html(findPw);
	}

	// 회원가입 버튼 클릭 이벤트 start
	$(document).on("click", "#signUpBtn", function() {
		showSignUp();
	});

	// 로그인 페이지로 돌아가는 rollback 클릭 이벤트 start
	$(document).on("click", "#rollBack", function() {
		showSignIn();
	});

	// 아이디 찾기 버튼 클릭 함수 start
	$(document).on("click", "#findIdBtn", function() {
		showFindId();
	});

	// 아이디 찾기 버튼 클릭 함수 start
	$(document).on("click", "#findPwBtn", function() {
		showFindPw();
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
		//			alert('휴대폰 인증 해주세요!');
		//			return;
		//		}

		if (isEmailCheck == false) {
			alert('이메일 인증 해주세요!');
			return;
		}

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


	// 이메일 수정 했을때 다시 본인인증 함수 
	$(document).on("input", "#email", function() {
		isEmailCheck = false;
		sessionStorage.removeItem('emailNumber');
	});


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


	// 전화번호 인증 문자 발송 ajax 함수 start
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


	//  전화번호 인증번호 확인 버튼 클릭 이벤트 start
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


	//이메일 인증 확인 버튼 클릭 이벤트 start
	$(document).on("click", "#checkEmailButton", function() {
		let enterNumber = $('#checkEmail').val();
		let emailNumber = sessionStorage.getItem('emailNumber');
		if (!emailNumber) {
			alert('먼저 본인인증을 진행해 주세요!');
			return;
		}
		if (enterNumber === emailNumber) {
			alert('인증이 완료되었습니다!');
			isEmailCheck = true;
			sessionStorage.removeItem('emailNumber');
		} else {
			alert('인증번호가 틀립니다. 다시 시도해 주세요.');
		}
	});


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

	// 회원가입 이메일 인증 버튼 클릭 함수 
	$(document).on("click", "#sendEmailButton", function() {
		var type = "check";
		var email = $('#email').val();

		if (!email) {
			alert("이메일을 먼저 입력해주세요.");
			return;
		}

		checkEmail(type, email);

	});

	// id찾기 이메일 인증 버튼 클릭 함수 starat	
	$(document).on("click", "#sendFindEmail", function() {
		var type = "sendId";
		var email = $('#findEmail').val();

		if (!email) {
			alert("이메일을 먼저 입력해주세요.");
			return;
		}

		checkEmail(type, email);

	});

	// pw찾기 이메일 인증 버튼 클릭 함수 starat	
	$(document).on("click", "#sendFindPwEmail", function() {
		var type = "sendPw";
		var email = $('#findPwEmail').val();
		var id = $('#findPwId').val();
		if (!email) {
			alert("이메일을 먼저 입력해주세요.");
			return;
		}

		if (!id) {
			alert("아이디를 먼저 입력해주세요");
			return;
		}

		checkEmail(type, email, id);

	});


	// 이메일 중복체크 함수  start
	function checkEmail(type, email, id) {

		$.ajax({
			type: 'POST',
			url: '/members/checkEmail',
			data: JSON.stringify({
				MEM_EMAIL: email
				, type: type
				, MEM_ID: id
			}),
			contentType: 'application/json',
			success: function(response) {
				if (type === 'check') {
					if (response) {
						alert("이미 가입된 이메일입니다.");
					} else {
						alert("본인 인증 발송 되었습니다");
						sendEmail(type, email);
					}
				} else {
					if (response) {
						alert("메일 발송 되었습니다");
						sendEmail(type, email);
					} else {
						alert("일치하는 아이디가 없습니다");
					}
				}


			}
		});
	}

	// 이메일 보내는 함수 start
	function sendEmail(type, email) {
		$.ajax({
			url: '/members/sendEmail',
			type: 'POST',
			data: JSON.stringify({
				type: type
				, MEM_EMAIL: email

			}),
			contentType: 'application/json',
			success: function(response) {
			}
		});
	}


	// 네이버 로그인 
	$('#naverLoginButton').click(function() {
		
		const clientId = 'cYuCKft0IZ1AQf3c5RSp';
		const redirectUri = 'http://localhost:8080/api/naverLogin';
		const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=random_state_string`;

		// 팝업 창 열기
//		window.open(naverLoginUrl, 'naverLogin', 'width=600,height=600');
		location.href = naverLoginUrl;
	});








});  // 끝 
