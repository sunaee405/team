$(function() {
	$.ajax({
		method: 'GET',
		url: '/getCategory',
		dataType: 'json',
		success: (data) => {
			data.forEach((data) => {
				let htmlText = 
					`<li>
		            	<a class="flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300" href="/search?category=1">${data.DCO_VALUE}</a>
		             </li>`
				$('#categoryList').append(htmlText);
			});
			
		},
		error: (error) => {
			
		}
	});


	const currentUrl = window.location.href; // 현재 주소가 main일 경우 다른 스크립트에서 이벤트 동작
	if(currentUrl != null && !currentUrl.includes('/myPage/main')) $(document).trigger('sessionLoaded');
});

// 로그인 유무 확인
$(document).on('sessionLoaded', function() {
	const memId = sessionStorage.getItem('memId');
	if(memId !==null && memId.length !== 0) {
		
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
	location.href = `/api/logout`;
});

// 마이페이지
$(document).off('click', '.btnLink').on('click', '.btnLink', function() {
	const className = $(this).attr('class');
	if(className.includes('loginBtn')) {
		window.location.href = "/member/login";
	} else if (className.includes('myPageBtn')) {
		$('#myPageTab').toggle();
	}
});



