$(async function() {
	await bodyInner();
	$('#proListType>li:first').trigger('click');
	
})



// 페이지 로드시 body 영역
function bodyInner() {
	const nickName = sessionStorage.getItem('memNick');
	
	var text =
		`<main class="relative flex-grow border-b-2" style="min-height: 0px !important; height: auto !important;">
		    <h1 class="a11yHidden">${nickName} 페이지</h1>
		    <div class="mx-auto px-4 md:px-8 2xl:px-16 box-content max-w-[1024px] min-[1600px]:max-w-[1280px] justify-between lg:gap-10 flex">
		        <div class="hidden lg:block [&amp;_h3]:text-xl [&amp;_ul]:mb-6 [&amp;_li]:w-fit [&amp;_li]:cursor-pointer [&amp;_li]:mb-[10px] [&amp;_li]:text-jnGray-800 [&amp;_li]:text-sm flex-auto flex-shrink flex-grow-0 basis-[180px] mt-[72px]">
		            <h2 class="mb-6 text-2xl font-semibold text-jnBlack">마이 페이지</h2>
		           <!--  <h3 class="pt-0 mb-3 text-lg font-semibold border-none text-jnBlack">거래 정보</h3>
		           	<ul id="productDetails">
		              <li class="selProduct">판매내역</li>
		               <li>구매내역</li>
		              <li>택배</li> 
		              <li class="likedProduct">찜한상품</li>
		            </ul>		            -->
		            <h3 class="mb-3 text-lg font-semibold border-t border-[#DADEE5] pt-6 text-jnBlack">내 정보</h3>
		        	<ul>
		                <li><a href="/myPage/myData">회원 정보</a></li>
		           <!-- <li>배송지 관리</li>
		                <li>거래 후기</li>  -->
		                <li>탈퇴하기</li>
		            </ul>
		        </div>
		        <div class="mx-auto box-content max-w-[1024px] min-[1600px]:max-w-[1280px] basis-[calc(100%-180px)] flex-grow px-0 md:px-0 2xl:px-0">
		            <div class="block mt-8 lg:mt-[72px] mb-5 lg:mb-0">
		                <div class="relative w-full h-full col-span-2 text-black grid grid-cols-1 gap-y-4 gap-x-0 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6 lg:min-w-[800px]">
		                    <div class="flex flex-col space-y-2 justify-start">
		                        <div class="flex items-center">
		                            <div class="w-full">
		                                <div class="w-full lg:flex lg:items-center">
		                                    <h2 class="mr-3 text-[22px] lg:text-[28px] leading-[39px] font-semibold cursor-pointer inline-block lg:block">${nickName}</h2>
		                                    <div class="min-[480px]:relative flex space-x-[6px] mt-1 text-[#787E89] text-[12px] mb-[1px] flex-auto"></div>
		                                </div>
		                            </div>
		                            <div class="flex items-center translate-x-3 lg:hidden"><img alt="profile-image" src="" width="60" height="60" decoding="async" data-nimg="1" class="rounded-full w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] hidden" loading="lazy" style="color: transparent;"><img alt="profile-image" src="https://img2.joongna.com/common/Profile/Default/profile_m.png" width="60" height="60" decoding="async" data-nimg="1" class="rounded-full w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] box-content border-4 border-white -translate-x-3" loading="lazy" style="color: transparent;"></div>
		                        </div>
		                        <div class="flex items-start">
		                        </div>
		                    </div>
		                    <div class="flex space-x-7 lg:pl-1 items-start">
		                        <div class="flex-1 self-center">
		                            <div class="flex justify-between items-center mb-2 text-[#0CB650] font-medium">
										<span>
										    <span class="font-medium text-base">신뢰지수</span>
										    <span class="font-bold inline-block ml-1 text-lg">252</span>
										</span>
										<span class="text-[#9CA3AF] text-[14px] font-normal">1,000</span>
									</div>
		                            <div class="w-full h-2 bg-[#F1F4F6] rounded overflow-hidden">
		                                <div class="h-full" style="width: 25.2%;">
		                                    <div class="rounded bg-gradient-to-r from-[#0DCC5A] from-0% to-[#019FB1] to-107.5% w-full h-full animate-width"></div>
		                                </div>
		                            </div>
		                        </div>
		                        <div class="flex items-center translate-x-3 hidden lg:flex"><img alt="profile-image" src="" width="60" height="60" decoding="async" data-nimg="1" class="rounded-full w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] hidden" loading="lazy" style="color: transparent;"><img alt="profile-image" src="https://img2.joongna.com/common/Profile/Default/profile_m.png" width="60" height="60" decoding="async" data-nimg="1" class="rounded-full w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] box-content border-4 border-white -translate-x-3" loading="lazy" style="color: transparent;"></div>
		                    </div>
		                    <div class="relative flex justify-evenly w-full border border-gray-300 rounded-lg pl-[8px] pr-[15px] py-4 lg:py-6">
		                        <dl class="flex justify-between items-center text-center text-jnGray-600 w-full m-0 [&amp;_div]:w-full [&amp;_div]:before:right-0 [&amp;_div]:before:top-1/2 [&amp;_div]:before:-translate-y-1/2 [&amp;_div]:before:absolute [&amp;_div]:before:w-[1px] [&amp;_div]:before:h-[40px] [&amp;_div]:before:bg-gray-300 [&amp;_div_dt]:text-[12px] [&amp;_div_dd]:text-[16px] lg:[&amp;_div_dt]:text-[14px] lg:[&amp;_div_dd]:text-[22px]">
		                            <div class="relative">
		                                <dt class="justify-center mt-0">판매내역</dt>
		                                <dd class="font-semibold text-jnblack">0</dd>
		                            </div>
		                 <!--           <div class="relative cursor-pointer">
		                                <dt class="justify-center mt-0">구매내역</dt>
		                                <dd class="font-semibold text-jnblack">0</dd>
		                            </div> -->
		                            <div class="relative">
		                                <dt class="justify-center mt-0">찜한 상품</dt>
		                                <dd class="font-semibold text-jnblack">0</dd>
		                            </div>
		                        </dl>
		                    </div>
		                </div>
		            </div>
		            <div class="flex flex-col">
		                <div class="w-100vw h-[6px] bg-[#F1F4F6] -mx-4 md:-mx-8 lg:hidden"></div>
		                <div class="w-[100vw] -mx-4 md:-mx-8 lg:hidden">
		                    <ul class="grid grid-cols-2 bg-[#F1F4F6] gap-[1px]">
		                        <li class="bg-white text-center cursor-pointer flex items-center space-x-2 py-4 px-5"><img alt="판매내역" src="https://img2.joongna.com/mystore/mypage/ios/20230411_Sale.png" width="52" height="52" decoding="async" data-nimg="1" class="bg-white w-8 h-8" loading="lazy" style="color: transparent;">
		                            <div class="md:text-lg">판매내역</div>
		                        </li>
		                        <li class="bg-white text-center cursor-pointer flex items-center space-x-2 py-4 px-5"><img alt="구매내역" src="https://img2.joongna.com/mystore/mypage/ios/20230411_Buy.png" width="52" height="52" decoding="async" data-nimg="1" class="bg-white w-8 h-8" loading="lazy" style="color: transparent;">
		                            <div class="md:text-lg">구매내역</div>
		                        </li>
		                        <li class="bg-white text-center cursor-pointer flex items-center space-x-2 py-4 px-5"><img alt="찜한상품" src="https://img2.joongna.com/mystore/mypage/ios/20230411_Heart.png" width="52" height="52" decoding="async" data-nimg="1" class="bg-white w-8 h-8" loading="lazy" style="color: transparent;">
		                            <div class="md:text-lg">찜한 상품</div>
		                        </li>
		                    </ul>
		                </div>
		                <div class="w-100vw h-[6px] bg-[#F1F4F6] -mx-4 md:-mx-8 lg:hidden"></div>
		            </div>
		            <div id="detailPoint" class="px-0 mt-8 lg:mt-[60px]">
		                <div class="flex flex-col w-full mb-4 lg:mb-5">
		                    <h3 class="text-lg font-bold md:text-[22px] text-jnBlack">내 상품</h3>
		                    <div class="mt-3 mr-0 mb-9 lg:mt-2">
		                        <ul id="proListType" class="colors flex flex-nowrap justify-between lg:justify-start -me-3 border-b border-[#DADEE5]">
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-black border-b-[2px] border-black">판매중</li>
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-[#9CA3AF]">판매완료</li>
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-[#9CA3AF]">찜한상품</li>
		                        </ul>
		                    </div>
		                    <div class="flex flex-wrap items-center justify-between">
		                        <div class="flex-shrink-0 mb-1 text-sm text-body md:text-base pe-4 md:me-6 lg:block">총 0 개</div>
		                        <ul id="sortProduct" class="flex space-x-3">
		                            <li><button class="text-sm font-medium text-[#141313]">최신순</button></li>
		                            <li><span class="inline-block mb-0 w-[1px] h-[10px] border border-[#DADEE5]"></span></li>
		                            <li><button class="text-sm font-medium text-[#787E89]">낮은가격순</button></li>
		                            <li><span class="inline-block mb-0 w-[1px] h-[10px] border border-[#DADEE5]"></span></li>
		                            <li><button class="text-sm font-medium text-[#787E89]">높은가격순</button></li>
		                        </ul>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		    </ins>
		</main>`
	$('body').append(text);	
}

//해당 상품영역 디테일
//$(document).on('click', '#productDetails>li', async function()
async function getDetailMyProduct(selectType, sortType, memNo) {
	const divCheck = $('#getProDetail').length === 0;
	try {
		const response = await fetch('/getDetailMyProduct', {
	        method: 'POST', // 요청 방식
	        headers: {
	            'Content-Type': 'application/json', // 데이터 형식
	            'X-Requested-With': 'XMLHttpRequest' // 필터에서 ajax 요청으로 인식하도록 헤더 설정
	        },
	        body: JSON.stringify({
		        MEM_NO : memNo,
		        SELECT_TYPE : selectType,
		        SORT_TYPE : sortType
		    })
	    });
	    
		 if (!response.ok) {
	        // 응답의 텍스트를 읽기
	        const errorMessage = await response.text();
	        if (errorMessage === "noList") {
				// 리스트가 비어있는 경우
	            if(divCheck) {
					$('#detailPoint').append(`<p class="py-12 text-center">선택된 조건에 해당하는 상품이 없습니다.</p>`);
				} else {
					$('#getProDetail').replaceWith(`<p class="py-12 text-center">선택된 조건에 해당하는 상품이 없습니다.</p>`);
				}
				
	        } else {
	            throw new Error(`HTTP error! status: ${response.status}`);
	        }
	    }
		
		responseData = await response.json();
		
		
		
		
		$('#detailPoint .py-12').remove();
		if(divCheck) {
			$('#detailPoint').append(`<div id="getProDetail" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 min-[1600px]:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8"></div>`);
		} else {
			$('#getProDetail').empty();
		}
		responseData.forEach(function(data) {
			const time = Math.floor((new Date() - new Date(data.PRO_DATE)) / 1000);
	
			const timeList = [
			    { dateTime: '일', value: 3600 * 24 },
			    { dateTime: '시간', value: 3600 },
			    { dateTime: '분', value: 60 },
			    { dateTime: '초', value: 1 }
			];
			
			let getTime;
			// 자바 스크립트의 향상된 for문
			for(const timeVlaue of timeList) {
				let timeDiff = Math.floor(time / timeVlaue.value);
				if(timeDiff > 0) {
					getTime = timeDiff + " " + timeVlaue.dateTime; 
					break;
				}
			}
			
			var text =
			`<div class="relative">
			    <div class="relative">
			        <a class="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform bg-white" title="${data.PRO_TITLE}" href="/product/contentProduct?proNo=${data.PRO_NO}">
			            <div class="relative w-full rounded-md overflow-hidden dim pt-[100%] mb-3 md:mb-3.5">
			                <img alt="${data.PRO_TITLE}" referrerpolicy="no-referrer" src="${data.PRO_IMG}?impolicy=thumb&amp;size=150" decoding="async" data-nimg="fill" class="bg-gray-300 object-cover h-full group-hover:scale-105 w-full transition duration-200 ease-in rounded-md" loading="lazy" style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;">
			            </div>
			            <div class="w-full overflow-hidden p-0 md:p-0 lg:p-0 xl:p-0 2xl:p-0">
			                <h2 class="line-clamp-2 min-h-[2lh] text-sm md:text-base text-heading">${data.PRO_TITLE}</h2>
			                <div class="font-semibold space-s-2 mt-0.5 text-heading lg:text-lg lg:mt-1.5">${data.PRO_PRICE}원</div>
			                <div class="my-1">
			                    <span class="text-sm text-gray-400">${data.PRO_LOCATION}</span>
			                    <span class="text-sm text-gray-400 mx-1">|</span>
			                    <span class="text-sm text-gray-400">${getTime}</span>
			                </div>
			                <div class="flex items-center"></div>
			            </div>
			        </a>
			    </div>
			    <div class="flex flex-col space-y-2 items-end absolute cursor-pointer right-0 top-3 w-full h-auto">
			        <div>
			            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" class="text-white mr-2 w-8 h-8">
			                <path fill="#fff" d="M16.003 17.803a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6M16.003 9.4a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6M16.003 26.202a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6"></path>
			            </svg>
			        </div>
			    </div>
			</div>
			`
			$('#getProDetail').append(text);
		})
	} catch(error) {

	}
	
};

// 마이페이지 회원정보 관련 팝업
function datailPage(typeText) {
	
	var htmlText = 
	`<div class="rc-drawer rc-drawer-right rc-drawer-open" tabindex="-1">
	    <div class="rc-drawer-mask"></div>
	    <div tabindex="0" aria-hidden="true" data-sentinel="start" style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute;"></div>
	    <div class="rc-drawer-content-wrapper" style="width: 600px; right: 0px;">
	        <div class="rc-drawer-content relative" aria-modal="true" role="dialog">
	            <div class="flex flex-col h-full w-full">
	                <header class="flex w-full px-5 py-[10px] justify-center items-center"><button class="basis-[24px]"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-90 rotate-[0deg]">
	                            <g clip-path="url(#clip0_2224_69059)">
	                                <path d="M4.25 7L10 12.75L15.75 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
	                            </g>
	                            <defs>
	                                <clipPath id="clip0_2224_69059">
	                                    <rect width="20" height="20" fill="white"></rect>
	                                </clipPath>
	                            </defs>
	                        </svg></button>
	                    <h2 class="flex-auto text-center mr-6 font-bold">${typeText}</h2>
	                </header>
	                <div class="h-[calc(100%-44px)]">
	                    <div class="flex flex-col h-full">
	                        <div class="overflow-auto">
	                            <div>
	                                <div>
 										<form class="mx-5 my-4 py-[10px] px-3 space-x-2 h-11 bg-[#F1F4F6] rounded-md flex justify-center items-center">
											<button type="submit" class="">
												<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="md:w-4 xl:w-5 md:h-4 xl:h-5">
													<path d="M10.0278 19.0556C14.3233 19.0556 17.8056 15.5733 17.8056 11.2778C17.8056 6.98223 14.3233 3.5 10.0278 3.5C5.73223 3.5 2.25 6.98223 2.25 11.2778C2.25 15.5733 5.73223 19.0556 10.0278 19.0556Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path>
													<path d="M21 21.8999L15.5 16.8999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
												</svg>
                                            </button>
                                            <input id="keyword" type="search" autocomplete="off" class="w-full bg-transparent flex-auto search-cancel placeholder:text-[#9CA3AF] outline-none search-cancel:h-4 search-cancel:w-4 search-cancel:relative search-cancel:right-1 search-cancel:bg-app-cancel search-cancel:bg-no-repeat search-cancel:bg-center" placeholder="상품명을 입력해주세요">
                                        </form>
	                                    <ul id="proList" class="px-5">
	                                    </ul>
                                    <div id="observer" aria-hidden="true" class=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			</div>
		</div>
		<div tabindex="0" aria-hidden="true" data-sentinel="end" style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute;"></div>
	</div>`
	$('body').append(htmlText);
}








// 마이페이지 상품영역 정렬
$(document).on('click', '#proListType>li', function() {
	$('#proListType>li').removeClass('text-black border-b-[2px] border-black').addClass('text-[#9CA3AF]');
	$(this).removeClass('text-[#9CA3AF]').addClass('text-black border-b-[2px] border-black');
	
	$('#sortProduct button').filter((index, data) => $(data).hasClass('text-[#141313]')).trigger('click');
});

//정렬 버튼
$(document).off('click').on('click', '#sortProduct button', function() {
	$('#sortProduct button').removeClass('text-[#141313]').addClass('text-[#787E89]');
	$(this).removeClass('text-[#787E89]').addClass('text-[#141313]');
	
	const sortType = $(this).text();
	const memNo = sessionStorage.getItem('memNo');
	const selectType = $('#proListType > li').filter(function() {return $(this).hasClass('text-black');}).text();

	getDetailMyProduct(selectType, sortType, memNo);
});

$(document).on('click', '#proListType>li', function() {
	$('#proListType>li').removeClass('text-black border-b-[2px] border-black').addClass('text-[#9CA3AF]');
	$(this).removeClass('text-[#9CA3AF]').addClass('text-black border-b-[2px] border-black');
	
	$('#sortProduct button').filter(function() {
		return $(this).hasClass('text-[#141313]');
	}).trigger('click');
});