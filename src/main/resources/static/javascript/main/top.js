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


$(document).on('click', '#logoutBtn', function() {
	location.href = `/api/logout`;
});

// 채팅내역 팝업
$(document).on('click', '#chatList', function() {
	if($(this).attr('class').includes('loginLink')) {
		window.location.href = "/member/login";
		return;
	}
	
	let chatList = 
		`<div>
		    <div class="rc-drawer rc-drawer-right rc-drawer-open" tabindex="-1">
		        <div class="rc-drawer-mask"></div>
		        <div tabindex="0" aria-hidden="true" data-sentinel="start" style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute;"></div>
		        <div class="rc-drawer-content-wrapper" style="width: 600px; right: 0px;">
		            <div class="rc-drawer-content relative" aria-modal="true" role="dialog">
		                <div class="flex flex-col w-full h-full justify-between">
		                    <div class="min-h-[70px] basis-[70px] flex justify-center items-center px-[20px]"><button class="w-10 h-10 basis-10 invisible"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
		                                <path stroke="#141313" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.5 19.5-8.075-7.125a.5.5 0 0 1 0-.75L12.5 4.5"></path>
		                            </svg></button>
		                        <h2 class="flex flex-col md:flex-row justify-center items-center md:space-x-2 flex-1 text-lg font-semibold text-center text-jnGray-900 null">
		                            <p class="mb-0"><span class="flex items-center justify-center space-x-2"><span>채팅</span><span class="text-[11px] text-[#0CB650] border border-jngreen px-2 rounded-2xl h-5 leading-5 hidden">0점</span></span></p>
		                        </h2>
		                        <div>
			                        <button class=btnClose>
			                        	<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
		                                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
		                                </svg>
	                                </button>
                                </div>
		                    </div>
		                    <div class="h-full overflow-auto">
		                        <div class="flex flex-col h-full">
		                            <div id="chatLog" class="flex flex-col items-center justify-center h-full gap-4">
		                            	<i class="material-icons" style="font-size:40px">chat_bubble_outline</i>
		                                <p>채팅 내역이 없습니다.</p>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		        <div tabindex="0" aria-hidden="true" data-sentinel="end" style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute;"></div>
		    </div>
		</div>
		`;
	// top.html 호출중인 현재 페이지에 접근	
	window.parent.$('body').append(chatList);
	$.ajax({
		url: `/getChatList?MEM_NO=${sessionStorage.getItem('memNo')}`,
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			 
		
			if(data != null) $('#chatLog').html(`<ul id="chatList" class="flex flex-col h-full overflow-auto bg-white overscroll-contain"></ul>`);
			data.forEach(function(item) {
				var text =
					`<li class="flex justify-between px-5 gap-5 w-full cursor-pointer bg-white">
						<input type="hidden" value="${item.CHA_MEM}" id="roomNo">
					        <div class="flex py-3 border-t-[1px] border-gray-200 w-[80%]">
					            <div class="border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden"><img alt="프로필" src="https://img2.joongna.com/common/Profile/Default/profile_m.png" width="60" height="60" decoding="async" data-nimg="1" class="rounded-full max-w-none h-[60px] object-cover" loading="lazy" style="color: transparent;"></div>
					            <div class="flex w-[calc(100%-56px)] flex-col justify-around ml-4">
					                <div class="flex gap-2">
					                    <div class="flex gap-2">
					                        <h4 class="font-semibold">닉네임</h4>
					                    </div>
					                    <p class="text-[12px] mt-[2px]">오후 5:42</p>
					                </div>
					                <span class="text-sm text-ellipsis overflow-hidden whitespace-nowrap min-[1024px]:max-w-[300px]">마지막 채팅 내용</span>
					            </div>
					        </div>
					        <div class="my-auto">
					            <div class="relative w-10 h-10"><img alt="채팅방 상품 썸네일 이미지" src="https://img2.joongna.com/media/original/2024/09/30/17276840461421SY_BamDQ.jpg?impolicy=thumb" decoding="async" data-nimg="fill" class="rounded-md" loading="lazy" style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"></div>
					        </div>
					    </li>
					    <div class="min-h-[5px]">
				    </div>`
				
				$('#chatList').append(text);
				
				debugger;
			});
		},
		error: (error) => {
			
		}
	});
});
// 채팅내역 팝업 삭제
$(document).on('click', '.btnClose', function() {
	$('.rc-drawer').parent('div').remove();
});




$(document).on('click', '.btnLink', function(event) {
	const className = $(this).attr('class');
	if(className.includes('loginBtn')) {
		window.location.href = "/member/login";
	} else if (className.includes('myPageBtn')) {
		$('#myPageTab').toggle();
	}
});



