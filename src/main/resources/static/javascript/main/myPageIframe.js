$(async function() {
	iframeInner();
})

























function iframeInner() {
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
	                    <h2 class="flex-auto text-center mr-6 font-bold">내 관심</h2>
	                </header>
	                <div class="h-[calc(100%-44px)]">
	                    <div class="flex flex-col h-full">
	                        <ul class="flex px-[26px] space-x-6 border-b border-gray-300">
	                            <li><button class="py-[16px] margin-b text-[#9CA3AF] text-[#141313] border-[#141313] border-b-2">찜한 상품</button></li>
	                        </ul>
	                        <div class="overflow-auto">
	                            <div>
	                                <div>
	                                    <form class="mx-5 my-4 py-[10px] px-3 space-x-2 h-11 bg-[#F1F4F6] rounded-md flex justify-center items-center"><button type="submit" class=""><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="md:w-4 xl:w-5 md:h-4 xl:h-5">
	                                                <path d="M10.0278 19.0556C14.3233 19.0556 17.8056 15.5733 17.8056 11.2778C17.8056 6.98223 14.3233 3.5 10.0278 3.5C5.73223 3.5 2.25 6.98223 2.25 11.2778C2.25 15.5733 5.73223 19.0556 10.0278 19.0556Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path>
	                                                <path d="M21 21.8999L15.5 16.8999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
	                                            </svg></button><input id="keyword" type="search" autocomplete="off" class="w-full bg-transparent flex-auto search-cancel placeholder:text-[#9CA3AF] outline-none search-cancel:h-4 search-cancel:w-4 search-cancel:relative search-cancel:right-1 search-cancel:bg-app-cancel search-cancel:bg-no-repeat search-cancel:bg-center" placeholder="상품명을 입력해주세요"></form>
	                                    <ul class="px-5">
	                                        <li><a class="relative group box-border overflow-hidden flex rounded-md cursor-pointer items-center border border-gray-100 transition duration-200 ease-in-out transform border-none mb-3" href="/product/187427142">
	                                                <div class="relative rounded-md overflow-hidden dim flex flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44 aspect-square pt-0 flex-none"><img alt="헤지스 여성90" referrerpolicy="no-referrer" src="https://img2.joongna.com/media/original/2024/10/02/1727838621248Kqc_NQgiv.jpg?impolicy=thumb&amp;size=150" decoding="async" data-nimg="fill" class="bg-gray-300 object-cover h-full group-hover:scale-105" loading="lazy" style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;">
	                                                    <div class="absolute top-2 z-10 right-2 w-6 h-6"><label for=":ra:" class="relative cursor-pointer"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none w-6 h-6">
	                                                                <path d="M5.94197 17.9925L15.2564 26.334C15.3282 26.3983 15.3641 26.4305 15.3975 26.4557C15.7541 26.7249 16.2459 26.7249 16.6025 26.4557C16.6359 26.4305 16.6718 26.3983 16.7436 26.3341L26.058 17.9925C28.8244 15.5151 29.1565 11.3015 26.8124 8.42125L26.5675 8.12029C23.8495 4.78056 18.5906 5.35863 16.663 9.20902C16.3896 9.75505 15.6104 9.75505 15.337 9.20902C13.4094 5.35863 8.1505 4.78056 5.43249 8.12028L5.18755 8.42125C2.84352 11.3015 3.17564 15.5151 5.94197 17.9925Z" stroke-width="1.5" stroke="#dc2626" fill="#dc2626"></path>
	                                                            </svg></label><input id=":ra:" type="checkbox" class="a11yHidden" checked=""></div>
	                                                </div>
	                                                <div class="w-full overflow-hidden p-2 px-4 lg:px-5 2xl:px-4">
	                                                    <h2 class="line-clamp-2 min-h-[2lh] text-sm sm:text-base md:mb-1.5 pb-0">헤지스 여성90</h2>
	                                                    <div class="font-semibold space-s-2 mt-0.5 text-heading sm:text-xl md:text-base lg:text-xl md:mt-1.5 2xl:mt-2">13,000원</div>
	                                                    <div class="my-1 h-6"><span class="text-sm text-gray-400">4시간 전</span></div>
	                                                    <div class="flex items-center [&amp;>*:not(:last-child)]:mr-1.5"><svg width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
	                                                            <rect y="-0.00012207" width="30" height="16.2857" rx="2.25" fill="#0DCC5A"></rect>
	                                                            <path d="M11.6626 6.31356V6.28956C11.6626 4.57356 10.4506 3.38556 8.44665 3.38556H5.01465V11.7856H6.86265V9.26556H8.26665C10.1506 9.26556 11.6626 8.25756 11.6626 6.31356ZM9.79065 6.34956C9.79065 7.06956 9.25065 7.62156 8.32665 7.62156H6.86265V5.05356H8.29065C9.21465 5.05356 9.79065 5.49756 9.79065 6.32556V6.34956Z" fill="white"></path>
	                                                            <path d="M18.2531 11.7856V8.05356C18.2531 6.31356 17.3771 5.28156 15.3851 5.28156C14.2931 5.28156 13.5971 5.48556 12.8891 5.79756L13.3451 7.18956C13.9331 6.97356 14.4251 6.84156 15.1211 6.84156C16.0331 6.84156 16.5011 7.26156 16.5011 8.01756V8.12556C16.0451 7.96956 15.5771 7.86156 14.9291 7.86156C13.4051 7.86156 12.3371 8.50956 12.3371 9.91356V9.93756C12.3371 11.2096 13.3331 11.9056 14.5451 11.9056C15.4331 11.9056 16.0451 11.5816 16.4891 11.0896V11.7856H18.2531ZM16.5251 9.51756C16.5251 10.1776 15.9491 10.6456 15.0971 10.6456C14.5091 10.6456 14.1011 10.3576 14.1011 9.86556V9.84156C14.1011 9.26556 14.5811 8.95356 15.3611 8.95356C15.8051 8.95356 16.2131 9.04956 16.5251 9.19356V9.51756Z" fill="white"></path>
	                                                            <path d="M25.7083 5.35356H23.8123L22.4083 9.73356L20.9443 5.35356H19.0123L21.5323 11.8096C21.3763 12.1336 21.2083 12.2296 20.8963 12.2296C20.6563 12.2296 20.3563 12.1216 20.1163 11.9776L19.5043 13.2976C19.9723 13.5736 20.4643 13.7416 21.1243 13.7416C22.2163 13.7416 22.7443 13.2496 23.2363 11.9416L25.7083 5.35356Z" fill="white"></path>
	                                                        </svg></div>
	                                                </div>
	                                            </a></li>
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
	    <div tabindex="0" aria-hidden="true" data-sentinel="end" style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute;">
		</div>
	</div>`
	
	$('body').append(htmlText);
}