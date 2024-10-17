$(function() {
	loading();
	
	getCategory();
	const currentUrl = window.location.href; // 현재 주소가 main일 경우 다른 스크립트에서 이벤트 동작
	
	// 검색어 전달
	$('#search-box').on('keyup', function(event) {
		if(event.key !== 'Enter') return;
	    const searchKey = $(this).val();
	    sessionStorage.setItem('searchText', searchKey);
	    location.href = '/product/listProduct';
	});
});

// 로딩 화면
function loading() {
	let loader =
		`<div id="loading-screen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.8); display: flex; justify-content: center; align-items: center; z-index: 9999;">
        	<svg id="loadSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="400" height="400" style="shape-rendering: auto; display: block;"><g data-idx="1"><g transform="matrix(1,0,0,1,0,0)" data-idx="2"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="3" opacity="0.053334"></rect></g><g transform="matrix(0.8660254037844387,0.49999999999999994,-0.49999999999999994,0.8660254037844387,31.698729810778058,-18.30127018922194)" data-idx="5"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="6" opacity="0.136667"></rect></g><g transform="matrix(0.5000000000000001,0.8660254037844386,-0.8660254037844386,0.5000000000000001,68.30127018922192,-18.30127018922194)" data-idx="8"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="9" opacity="0.22"></rect></g><g transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,100,0)" data-idx="11"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="12" opacity="0.303334"></rect></g><g transform="matrix(-0.4999999999999998,0.8660254037844387,-0.8660254037844387,-0.4999999999999998,118.30127018922192,31.69872981077805)" data-idx="14"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="15" opacity="0.386667"></rect></g><g transform="matrix(-0.8660254037844387,0.49999999999999994,-0.49999999999999994,-0.8660254037844387,118.30127018922194,68.30127018922194)" data-idx="17"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="18" opacity="0.47"></rect></g><g transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,100,100)" data-idx="20"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="21" opacity="0.553334"></rect></g><g transform="matrix(-0.8660254037844386,-0.5000000000000001,0.5000000000000001,-0.8660254037844386,68.30127018922192,118.30127018922194)" data-idx="23"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="24" opacity="0.636667"></rect></g><g transform="matrix(-0.5000000000000004,-0.8660254037844385,0.8660254037844385,-0.5000000000000004,31.698729810778097,118.30127018922195)" data-idx="26"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="27" opacity="0.72"></rect></g><g transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,7.105427357601002e-15,100)" data-idx="29"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="30" opacity="0.803334"></rect></g><g transform="matrix(0.5000000000000001,-0.8660254037844386,0.8660254037844386,0.5000000000000001,-18.30127018922194,68.30127018922192)" data-idx="32"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="33" opacity="0.886667"></rect></g><g transform="matrix(0.8660254037844384,-0.5000000000000004,0.5000000000000004,0.8660254037844384,-18.30127018922194,31.698729810778104)" data-idx="35"><rect fill="#8e747a" height="12" width="6" ry="6" rx="3" y="24" x="47" data-idx="36" opacity="0.97"></rect></g><g data-idx="38"></g></g><text data-watermark="true" text-anchor="middle" dominant-baseline="middle" stroke-opacity="0.1" fill="black" fill-opacity="0.1" stroke="white" stroke-width="1" font-size="5.0" x="50" y="50" data-idx="39" style="opacity: 1; font-size: 5px;">LOADING</text></svg>
		 </div>
		 `;
	$('body').prepend(loader);
	$('#loadSvg').addClass('rotate');
}

$(window.parent).on('load', function() {
	var checkReadyInterval = setInterval(function() {
		// 부모 요소의 DOM업로드가 완료될때까지 반복
		if (window.parent.document.readyState === "complete") {
			$(document).trigger('sessionLoaded'); // 로그인 유무확인하는 이벤트
			
			
			clearInterval(checkReadyInterval); // 이벤트 삭제
			
			// 검색어 || 카테고리 || 정렬 전달
	        const searchData = sessionStorage.getItem('searchText');
	        const detailCode = sessionStorage.getItem('detailCode');
	        $(window.parent.document).find(`[data-id="${detailCode}"]`).trigger('click');
	        $(window.parent.document).find('#search-input').val(searchData).trigger('input');
	        
	        // 스토리지에서 두 데이터 삭제
	        sessionStorage.removeItem('searchText');
    		sessionStorage.removeItem('detailCode');
	        
	        // 로딩 삭제
	        setTimeout(() => $('#loading-screen').remove(), 500);
	    }
	    
	}, 100); // 0.1초마다
});


// 탭 || 메인페이지 배너 클릭시 상품리스트의 해당 카테고리로 이동 
$(document).on('click', '.pageNav', function() {
	const detailCode = $(this).attr('data-code');
	sessionStorage.setItem("detailCode", detailCode);
	
	location.href = "/product/listProduct";
});



let isCategory = false;

function getCategory() {
    if (isCategory) return; // 값이 true면 함수 종료해서 여러번 동작하지 않도록
    
    isCategory = true; // 값 변경
    
    $.ajax({
        method: 'GET',
        url: '/getCategory',
        dataType: 'json',
        success: (data) => {
            data.forEach((data) => {
                let htmlText = 
                    `<div class="menuItem group cursor-pointer ">
						<a data-code="${data.DCO_ID}" href="javascript:void(0);" class="pageNav ga4_main_gnb relative inline-flex items-center px-3 py-3 text-sm font-normal xl:text-base text-heading xl:px-4 group-hover:text-black" style="text-align: center;">${data.DCO_VALUE}</a>
					 </div>`;
                $('.headerMenu').append(htmlText);
            });
        },
        error: (error) => {
            // 오류 처리
        },
        complete: () => {
            isCategory = false; // 완료 후 다시 false로 설정
        }
    });
}

// 로그인 유무 확인
$(document).on('sessionLoaded', function() {
	const memId = sessionStorage.getItem('memId');
	if(memId !==null && memId.toLocaleLowerCase === 'admin'.toLocaleLowerCase) {
		var text =
		`
		<li class="relative flex flex-1 pl-3">
			<a class="flex items-center justify-center [&amp;>p]:ml-1" href="/admin/member/list">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" size="24"><path stroke="#141313" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.775 7.716a3.619 3.619 0 1 1-7.238.005 3.619 3.619 0 0 1 7.238-.005M13.15 13.371c-4.026 0-7.298 3.184-7.4 7.145h14.8c-.102-3.961-3.374-7.145-7.4-7.145"></path></svg>
				<p id="myTab">관리자</p>
			</a>
		</li>
		`
		$('.ckTab').replaceWith(text);
		
	} else if(memId !==null && memId.length !== 0) {
		var text = `<ul id="myPageTab" class="border border-jnGray-300 z-10 text-xs text-center font-medium bg-white rounded-lg absolute flex flex-col justify-center top-[30px] right-[23px] w-[100px] [&amp;>li]:mx-2 [&amp;>li]:border-b [&amp;>li]:border-jnGray-200 [&amp;>li:last-of-type]:border-b-0" style="display:none;">
					    <li class="pt-3 pb-2 ga4_main_top_menu">
					   		<a href="/myPage/myPage">
					            <p id="마이페이지">마이페이지</p>
					        </a>
				        </li>
					    <li class="pt-2 pb-3">
			    			<button id="logoutBtn" class="cursor-pointer disabled:text-stone-400">로그아웃</button>
					    </li>
					</ul>`
					
		$('#myTab').text('마이').parent('button').append(text).addClass('myPageBtn');
		$('#registerLink').attr('href', '/product/registerProduct');
	} else {
		$('#myTab').text('로그인').parent('button').addClass('loginBtn');
		$('#registerLink').attr('href', '/member/login');
		$('#chatList').addClass('loginLink');
	}
});

// 로그아웃
$(document).on('click', '#logoutBtn', function() {
	location.href = '/api/topLogout';
});

// 마이페이지
$(document).off('click', '.btnLink').on('click', '.btnLink', function() {
	const className = $(this).attr('class');
	
	if(className.includes('loginBtn')) {
		window.location.href = "/member/login"; // 로그인 주소로 이동
	} else if (className.includes('myPageBtn')) {
		$('#myPageTab').toggle();// 마이페이지/로그아웃 이동 탭 토글
	}
});

