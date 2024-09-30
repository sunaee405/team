$(function() {
	bodyInner();
})



















// 페이지 로드시 body 영역
function bodyInner() {
	const nickName = sessionStorage.getItem('memNick');
	debugger;
	
	var text =
		`<main class="relative flex-grow border-b-2" style="min-height: 0px !important; height: auto !important;">
		    <h1 class="a11yHidden">${nickName} 페이지</h1>
		    <div class="mx-auto px-4 md:px-8 2xl:px-16 box-content max-w-[1024px] min-[1600px]:max-w-[1280px] justify-between lg:gap-10 flex">
		        <div class="hidden lg:block [&amp;_h3]:text-xl [&amp;_ul]:mb-6 [&amp;_li]:w-fit [&amp;_li]:cursor-pointer [&amp;_li]:mb-[10px] [&amp;_li]:text-jnGray-800 [&amp;_li]:text-sm flex-auto flex-shrink flex-grow-0 basis-[180px] mt-[72px]">
		            <h2 class="mb-6 text-2xl font-semibold text-jnBlack">마이 페이지</h2>
		            <h3 class="pt-0 mb-3 text-lg font-semibold border-none text-jnBlack">거래 정보</h3>
		            <ul>
		                <li>판매내역</li>
		                <li>구매내역</li>
		              <!--  <li>택배</li> -->
		              <li>찜한 상품</li>
		            </ul>
		            
		            <h3 class="mb-3 text-lg font-semibold border-t border-[#DADEE5] pt-6 text-jnBlack">내 정보</h3>
		        	<ul>
		                <li>회원 정보</li>
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
		                            <p class="w-10 flex-auto text-[14px] text-jnGray-600 break-all"><span class="w-fit max-w-[calc(100%+1px)] block text-ellipsis overflow-hidden whitespace-nowrap">앱에서 가게 소개 작성하고 신뢰도를 높여 보세요.</span></p><button type="button" class="min-w-[50px] underline text-jnGray-600 hidden">더보기</button>
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
		                            <div class="relative cursor-pointer">
		                                <dt class="justify-center mt-0">구매내역</dt>
		                                <dd class="font-semibold text-jnblack">0</dd>
		                            </div>
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
		                        <li class="bg-white text-center cursor-pointer flex items-center space-x-2 py-4 px-5"><img alt="택배" src="https://img2.joongna.com/mystore/mypage/ios/20230411_Delivery.png" width="52" height="52" decoding="async" data-nimg="1" class="bg-white w-8 h-8" loading="lazy" style="color: transparent;">
		                            <div class="md:text-lg">택배</div>
		                        </li>
		                        <li class="bg-white text-center cursor-pointer flex items-center space-x-2 py-4 px-5"><img alt="찜한 상품" src="https://img2.joongna.com/mystore/mypage/ios/20230411_Heart.png" width="52" height="52" decoding="async" data-nimg="1" class="bg-white w-8 h-8" loading="lazy" style="color: transparent;">
		                            <div class="md:text-lg">찜한 상품</div>
		                        </li>
		                    </ul>
		                </div>
		                <div class="w-100vw h-[6px] bg-[#F1F4F6] -mx-4 md:-mx-8 lg:hidden"></div>
		            </div>
		            <div class="px-0 mt-8 lg:mt-[60px]">
		                <div class="flex flex-col w-full mb-4 lg:mb-5">
		                    <h3 class="text-lg font-bold md:text-[22px] text-jnBlack">내 상품</h3>
		                    <div class="mt-3 mr-0 mb-9 lg:mt-2">
		                        <ul class="colors flex flex-nowrap justify-between lg:justify-start -me-3 border-b border-[#DADEE5]">
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-black border-b-[2px] border-black">전체</li>
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-[#9CA3AF]">판매중</li>
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-[#9CA3AF]">예약중</li>
		                            <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-[#9CA3AF]">판매완료</li>
		                        </ul>
		                    </div>
		                    <div class="flex flex-wrap items-center justify-between">
		                        <div class="flex-shrink-0 mb-1 text-sm text-body md:text-base pe-4 md:me-6 lg:block">총 0 개</div>
		                        <ul class="flex space-x-3">
		                            <li><button class="text-sm font-medium text-[#141313]">최신순</button></li>
		                            <li><span class="inline-block mb-0 w-[1px] h-[10px] border border-[#DADEE5]"></span></li>
		                            <li><button class="text-sm font-medium text-[#787E89]">낮은가격순</button></li>
		                            <li><span class="inline-block mb-0 w-[1px] h-[10px] border border-[#DADEE5]"></span></li>
		                            <li><button class="text-sm font-medium text-[#787E89]">높은가격순</button></li>
		                        </ul>
		                    </div>
		                </div>
		                <p class="py-12 text-center">선택된 조건에 해당하는 상품이 없습니다.</p>
		            </div>
		        </div>
		    </div>
		    </ins>
		</main>`
	$('body').append(text);	
}		
