
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
	// top.html 호출중인 현재 페이지(부모페이지)에 접근
	window.parent.$('body').append(chatList);
	
	
	// 해당 회원 값
	$.ajax({
		url: `/getChatList?MEM_NO=${sessionStorage.getItem('memNo')}`,
		type: 'GET',
		dataType: 'json',
		success: (data) => {
			if(data == null) return;
			$('#chatLog').html(`<ul id="chatUl" class="flex flex-col h-full overflow-auto bg-white overscroll-contain" style="width: 100%"></ul>`);
			data.forEach(function(item) {
				var chatLog = JSON.parse(item.CHA_LOG);
				
				var text =
					`<li class="roomNo flex justify-between px-5 gap-5 w-full cursor-pointer bg-white" style="width: 100%">
						<input type="hidden" value="${item.CHA_NO}">
					        <div class="flex py-3 border-t-[1px] border-gray-200 w-[80%]">
					            <div class="border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden"><img alt="프로필" src="https://img2.joongna.com/common/Profile/Default/profile_m.png" width="60" height="60" decoding="async" data-nimg="1" class="rounded-full max-w-none h-[60px] object-cover" loading="lazy" style="color: transparent;"></div>
					            <div class="flex w-[calc(100%-56px)] flex-col justify-around ml-4">
					                <div class="flex gap-2">
					                    <div class="flex gap-2">
					                        <h4 class="font-semibold">${chatLog.NICK}</h4>
					                    </div>
					                    <p class="text-[12px] mt-[2px]">오후 5:42</p>
					                </div>
					                <span class="text-sm text-ellipsis overflow-hidden whitespace-nowrap min-[1024px]:max-w-[300px]">${chatLog.TEXT}</span>
					            </div>
					        </div>
					    </li>
					    <div class="min-h-[5px]">
				    </div>`
				$('#chatUl').append(text);
			});
		},
		error: (error) => {
			
		}
	});
});


// 채팅내역 팝업 삭제
$(document).on('click', '.btnClose ', function() {
	$('.rc-drawer').parent('div').remove();
});


$(document).on('click', '.chatBtn, .roomNo', function() {
	
	let userWidth = window.screen.availWidth;
	let userHeight = window.screen.availHeight;
	let width = 400;
	let height = 600;
	
	
	if(userWidth < width) width = userWidth;
	if(userHeight < height) height = userHeight;
	
	let left = (userWidth - width) / 2;
	let top = (userHeight - height) / 2;
	
	
	let thisClass = $(this).attr('class');
	let urlPlus;	
	if(thisClass.includes('roomNo')) {
		urlPlus = `CHA_NO=${$(this).find('input:hidden').val()}`
	} else {
		const selMember = encodeURIComponent($('#selMember').val());
		urlPlus = `SEL_MEM=${selMember}`
	}
	
	const url = `/myPage/chatRoom?${urlPlus}`
	
	let chatRoom = window.open(url,
					 'chatRoom',
					 `width=${width},height=${height},
					  resizable=no,
					  top=${top},
					  left=${left},
					  toolbar=no,
					  menubar=no,
					  location=no,
					  status=no`
				   );
});
	
