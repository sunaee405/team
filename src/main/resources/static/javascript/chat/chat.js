$(document).on('click', '.chatBtn', function() {
	
	let userWidth = window.screen.availWidth;
	let userHeight = window.screen.availHeight;
	
	let width = 400;
	let height = 600;
	
	
	if(userWidth < width) width = userWidth;
	if(userHeight < height) height = userHeight;
	
	
	let left = (userWidth - width) / 2;
	let top = (userHeight - height) / 2;
	
	
	
	const selMember = encodeURIComponent($('#selMember').val());
	const url = `/myPage/chatRoom?selMember=${selMember}`
	
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

$(document).on('click', '.chatList', function() {

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
		                            <div class="flex flex-col items-center justify-center h-full gap-4">
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
	window.parent.$('body').append(chatList);
//	$('body').append(chatList);	
});

$(document).on('click', '.btnClose', function() {
	$('.rc-drawer').parent('div').remove();
});
	
	
	
	
	
	
