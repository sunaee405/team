let TypeList = [];

$(async function() {
	await getSort();
    await getMainProductList();
    
    $.ajax({
		url: '/getBanner',
		type: 'GET',
		data: 'json',
		success: (data) => {
			data.forEach(function(silde) {
				const imgUrl = displayImage(silde.ban_img);
				
				var text =
				`<div class="banImg" data-code="${silde.ban_code}" style="dispaly:none;">
					<img src="${imgUrl}" style="height: 100%; width: 100%;">
		        </div>`
		        $('#adSlide').prepend(text);
		        $('#adSlideTab').prepend(`<span class="bannerSwiper swiper-pagination-bullet"></span>`);
		        $('.bannerSwiper:first').trigger('click');
			});
		},
		error: (error) => {
			debugger;
		}
	})
});

function displayImage(base64Url) {
	// Base64 문자열 디코딩
	const byteString = atob(base64Url);
	const ab = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
	    ab[i] = byteString.charCodeAt(i);
	}
	// Blob 객체 생성
	const blob = new Blob([ab], { type: 'image/png' });
	const imageUrl = URL.createObjectURL(blob);
	return imageUrl;
}

$(document).on('click', '.banImg', function() {
	const code = $(this).attr('data-code');
	sessionStorage.setItem('detailCode', code);
	
	location.href = "/product/listProduct";
});



// 슬라이들 자동이동 설정
let setBanInterval;
$(window).on('load', function() {
	bannerInterbal();
})

function bannerInterbal() {
	// 'click', '.bannerSwiper'이벤트에서 bannerInterbal()호출 시 이미 인터벌 설정 있으면 삭제하고 다시 생성
	if(setBanInterval) clearInterval(setBanInterval);
	// 인터벌 설정;
	setBanInterval = setInterval(function() {
        $('[data-label="next"]').trigger('click');
    }, 3000);
}

// 배너 이미지 스와이프
$(document).on('click', '.bannerSwiper', function() {
	//해당 이미지 탭? 활성화
	$(this).addClass('swiper-pagination-bullet-active').siblings().removeClass('swiper-pagination-bullet-active');
	// 현재 활성화될 이미지의 인덱스 구하기
	const index = $(this).index('.bannerSwiper');
	// 이미지를 숨기고 현재 스와이프에 해당하는 이미지만 활성화
	$('.banImg').hide().eq(index).show();
	
	// 인터벌 시간 초기화
	bannerInterbal();
});

// 배너 이미지 좌우 이동 버튼
$(document).on('click', '.bannerBtn', function() {
	let index = $('#adSlideTab .swiper-pagination-bullet-active').index('.bannerSwiper');
	const btnType = $(this).attr('data-label');
	
	const lastIndex = $('.bannerSwiper:last').index();
	
	if(btnType === 'next') {
		index = lastIndex === index ? 0 : index + 1;
	} else if(btnType === 'prev') {
		index = 0 === index ? lastIndex : index - 1;
	}
	
	$('.bannerSwiper').eq(index).trigger('click');
});

//정렬 타입 설정
async function getSort() {
   // AJAX 요청을 시작
   try {
        const response = await fetch('/getSortList', { 
			                 method: 'GET',
			                 headers: {
			                    'X-Requested-With': 'XMLHttpRequest', // 필터에서 ajax 요청으로 인식하도록 헤더 설정
			                    'Content-Type': 'application/json' // 요청 데이터 형식
			                 }
			             });
        if (!response.ok) throw new Error();
        const data = await response.json();

		// 타입리스트에 값 넣기
        data.forEach(function(item) {
            const map = new Map();
            map.set('keyId', item.DCO_ID);
            map.set('typeValue', item.DCO_VALUE);
            TypeList.push(map);
        });
    } catch (error) {
        console.error(error);
    }
}


//

//<button class="bannerButton w-7 h-7 text-black flex items-center justify-center absolute z-10 transition duration-250 transform top-1/2 focus:outline-none rounded-full text-sm md:text-base lg:w-9 lg:h-9 lg:text-xl xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 3xl:text-2xl left-2 bg-transparent shadow-transparent hover:bg-transparent hover:text-black -translate-y-[calc(50%+1em)]" id="main-banner-carousel-prev" aria-label="prev-button"><svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-[0deg]"><g filter="url(#filter0_d_19461_8348)"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8122 5.34218C16.4517 6.0669 16.3825 7.17278 15.6578 7.81224L8.645 14L15.6578 20.1878C16.3825 20.8273 16.4517 21.9331 15.8122 22.6579C15.1727 23.3826 14.0669 23.4517 13.3421 22.8122L5.26706 15.6872C4.25192 14.7914 4.25192 13.2086 5.26706 12.3129L13.3421 5.1878C14.0669 4.54835 15.1727 4.61747 15.8122 5.34218Z" fill="white"></path></g><defs><filter id="filter0_d_19461_8348" x="0.505707" y="0.75" width="19.7443" height="26.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_19461_8348"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19461_8348" result="shape"></feBlend></filter></defs></svg></button>
// 상품목록 슬라이드 버튼
$(document).on('click', '.sectionSwiper', function() {
	const currentSection = $(this).parents('section');
	currentSection.find('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
	$(this).addClass('swiper-pagination-bullet-active');
	const swiperIndex = currentSection.find('.swiper-pagination-bullet').index($(this));
	
	const firstIndex = swiperIndex * 6;
	const lastIndex = firstIndex + 6 ; 
	
	currentSection.find('.productLink').each((i, data) => {
        $(data).toggle(i >= firstIndex && i < lastIndex);
    });
    
    // 해당 섹션의 첫번째 or 마지막 상품이 보이는지를 판별
    const prevDisabled = currentSection.find('.productLink:first').is(':visible');
	const nextDisabled = currentSection.find('.productLink:last').is(':visible');
	
	// 해당 섹션의 슬라이드 이동 버튼에 접근
	const prev = currentSection.find('#recent-prev');
	const next = currentSection.find('#recent-next');
	
	// 접근한 버튼을 해당 섹션의 visible 여부에 따라 활성화, 비활성화
	prev.toggleClass('swiper-button-disabled', prevDisabled).prop("disabled", prevDisabled);
	next.toggleClass('swiper-button-disabled', nextDisabled).prop("disabled", nextDisabled);
});



// 이미지 이동
$(document).on('click', '.sectionBtn', function() {
	const currentSection = $(this).parents('section');
	//현재 섹션에서 선택된 sectionSwiper의 인덱스
	let index = currentSection.find('.swiper-pagination .swiper-pagination-bullet-active').index();
	//버튼 타입
	const btnType = $(this).attr('aria-label');
	
	if(btnType == 'prev-button') {
		--index;
	} else if(btnType == 'next-button') {
		++index;
	}
	
	currentSection.find('.sectionSwiper').eq(index).click();
});

async function getMainProductList() {
    // TypeList 랜덤으로 배열하는 함수 호출
    const randomType = shuffleArray(TypeList);
    

    for(const Type of randomType) {
        try {
            const response = await fetch(`/getMainProductList?TYPE=${Type.get("typeValue")}`, { 
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // 필터에서 ajax 요청으로 인식하도록 헤더 설정
                    'Content-Type': 'application/json' // 요청 데이터 형식
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            const result = await response.json();
            
            
            // 각 정렬 요소 영역 찍어주는 함수
            productSection(Type.get('keyId'), Type.get('typeValue'));
            result.forEach(function(productMap) {
				// 각 상품 영역 찍어주는 함수
                forProductList(Type.get('keyId'), Type.get('typeValue'), productMap);
            });
            
		    const filterLink = $(`.${Type.get("typeValue")}Section`).find('.productLink') // 현재 섹션 내의 모든 .productLink 요소 선택
												   .filter(function(index) {
													    // 인덱스가 6보다 크면 리턴
													    return index >= 6;
													  })
													  .map(function(index, data) {
													    return data; //필터된 요소를 반환
													  }) // 반환된 요소를 숨기기
													  .css('display', 'none');
														  
            
            var swiperLength = result.length % 6 == 0 ? result.length / 6 : (result.length / 6) + 1;
            
            
            for(let i = 0; i < Math.floor(swiperLength); i++) {
				$('.swiper-pagination:last').append(`<span class="sectionSwiper swiper-pagination-bullet"></span>`);
			}
			
			$('.swiper-pagination:last').find('.swiper-pagination-bullet:first').trigger('click');
			
        } catch (error) {
            if (error.message === 'emptyList') {
                console.log('상품목록 없음');
            } else {
                console.error('에러 발생:', error);
            }
        };
    }
};


// 각 상품 영역 찍어주는 함수
function forProductList(key, typeValue, data) {
	// 등록일과 현재 시각 초단위로 얼마나 차이나는지	
	const time = Math.floor((new Date() - new Date(data.PRO_DATE)) / 1000);

	const timeList = [
	    { dateTime: '일', value: 3600 * 24 },
	    { dateTime: '시간', value: 3600 },
	    { dateTime: '분', value: 60 },
	    { dateTime: '초', value: 1 }
	];
	
	let timeText;
	// 자바 스크립트의 향상된 for문
	for(const timeVlaue of timeList) {
		let timeDiff = Math.floor(time / timeVlaue.value);
		if(timeDiff > 0) {
			timeText = timeDiff + " " + timeVlaue.dateTime; 
			break;
		}
	}
	
	debugger;
	
	let productList =
		`<a href="/product/contentProduct?proNo=${data.PRO_NO}" class="productLink relative group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform bg-white ga4_main_latest_product">
			<div class="relative w-full rounded-md overflow-hidden dim pt-[100%] mb-3 md:mb-3.5">
				<img alt="${data.PRO_TITLE}" referrerpolicy="no-referrer" src="/images/${data.PRO_IMG}?impolicy=thumb&amp;size=150" decoding="async" data-nimg="fill" class="bg-gray-300 object-cover h-full group-hover:scale-105 w-full transition duration-200 ease-in rounded-md" loading="lazy" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent">
			</div>
			<div class="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
				<h2 class="line-clamp-2 min-h-[2lh] text-sm md:text-base">${data.PRO_TITLE}</h2>
				<div class="font-semibold space-s-2 mt-0.5 text-heading lg:text-lg lg:mt-1.5">
					${data.PRO_PRICE}원
				</div>
				<div class="my-1 h-6">
					<span class="text-sm text-gray-400">${data.PRO_LOCATION}</span><span class="mx-1 text-sm text-gray-400">|</span><span class="text-sm text-gray-400">${timeText} 전</span>
				</div>
				<div class="flex items-center [&amp*:not(:last-child)]:mr-1.5">
		<!--		<svg width="30" height="17" viewbox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="-0.00012207" width="30" height="16.2857" rx="2.25" fill="#0DCC5A"></rect><path d="M11.6626 6.31356V6.28956C11.6626 4.57356 10.4506 3.38556 8.44665 3.38556H5.01465V11.7856H6.86265V9.26556H8.26665C10.1506 9.26556 11.6626 8.25756 11.6626 6.31356ZM9.79065 6.34956C9.79065 7.06956 9.25065 7.62156 8.32665 7.62156H6.86265V5.05356H8.29065C9.21465 5.05356 9.79065 5.49756 9.79065 6.32556V6.34956Z" fill="white"></path><path d="M18.2531 11.7856V8.05356C18.2531 6.31356 17.3771 5.28156 15.3851 5.28156C14.2931 5.28156 13.5971 5.48556 12.8891 5.79756L13.3451 7.18956C13.9331 6.97356 14.4251 6.84156 15.1211 6.84156C16.0331 6.84156 16.5011 7.26156 16.5011 8.01756V8.12556C16.0451 7.96956 15.5771 7.86156 14.9291 7.86156C13.4051 7.86156 12.3371 8.50956 12.3371 9.91356V9.93756C12.3371 11.2096 13.3331 11.9056 14.5451 11.9056C15.4331 11.9056 16.0451 11.5816 16.4891 11.0896V11.7856H18.2531ZM16.5251 9.51756C16.5251 10.1776 15.9491 10.6456 15.0971 10.6456C14.5091 10.6456 14.1011 10.3576 14.1011 9.86556V9.84156C14.1011 9.26556 14.5811 8.95356 15.3611 8.95356C15.8051 8.95356 16.2131 9.04956 16.5251 9.19356V9.51756Z" fill="white"></path><path d="M25.7083 5.35356H23.8123L22.4083 9.73356L20.9443 5.35356H19.0123L21.5323 11.8096C21.3763 12.1336 21.2083 12.2296 20.8963 12.2296C20.6563 12.2296 20.3563 12.1216 20.1163 11.9776L19.5043 13.2976C19.9723 13.5736 20.4643 13.7416 21.1243 13.7416C22.2163 13.7416 22.7443 13.2496 23.2363 11.9416L25.7083 5.35356Z" fill="white"></path></svg> -->
				</div>
			</div>
		</a>`
		;
		
	$(`.${key}Section`).append(productList);
}


// 각 정렬 요소 영역 찍어주는 함수
function productSection(key, typeValue) {
	$('.productSilde').append(`<section class="${key}Box max-w-[1024px] min-[1600px]:max-w-[1280px] m-auto"></section>`);
	let boxHeader = 
		`<div class="heightFull relative mb-10 xl:mb-20">
			<div class="flex items-center justify-between mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
				<h3 class="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">상품 ${typeValue}</h3>
				<a data-code="${key}" class="sortLink flex items-center text-xs lg:text-sm xl:text-base text-jnGray-700 mt-0.5 lg:mt-1">바로가기
				<svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" fill="none" class="mx-1 rotate-180"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M6 1 1 5l5 4"></path></svg></a>
			</div>
		 	<div class="carouselWrapper relative jn-carousel recent">
				<div class="swiper swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden" dir="ltr">
					<div class="swiper-wrapper">
						<div class="swiper-slide carouselItem swiper-slide-active">
							<div class="${key}Section grid gap-x-2 gap-y-2 bg-white grid-cols-3 lg:grid-cols-6 sm:gap-x-4 sm:gap-y-4">
								<!-- 개별 상품 이미지 및 링크 추가 -->
							</div>
						</div>
					</div>
					<div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
					</div>
				</div>
				<button class="sectionBtn w-7 h-7 text-black absolute transition duration-250 transform hover:bg-gray-900 hover:text-white focus:outline-none text-sm md:text-base lg:w-9 lg:h-9 lg:text-xl xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 3xl:text-2xl left-0 bg-white/25 shadow-transparent !w-12 !h-12 rounded-none hidden lg:flex justify-center items-center z-10 top-[66px] min-[1600px]:top-[84px] translate-y-0 m-0 swiper-button-disabled" id="recent-prev" aria-label="prev-button" disabled=""><svg width="26" height="28" viewbox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-[0deg]"><g filter="url(#filter0_d_19461_8348)"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8122 5.34218C16.4517 6.0669 16.3825 7.17278 15.6578 7.81224L8.645 14L15.6578 20.1878C16.3825 20.8273 16.4517 21.9331 15.8122 22.6579C15.1727 23.3826 14.0669 23.4517 13.3421 22.8122L5.26706 15.6872C4.25192 14.7914 4.25192 13.2086 5.26706 12.3129L13.3421 5.1878C14.0669 4.54835 15.1727 4.61747 15.8122 5.34218Z" fill="white"></path></g><defs><filter id="filter0_d_19461_8348" x="0.505707" y="0.75" width="19.7443" height="26.5" filterunits="userSpaceOnUse" color-interpolation-filters="sRGB"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><fecolormatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></fecolormatrix><feoffset></feoffset><fegaussianblur stddeviation="2"></fegaussianblur><fecomposite in2="hardAlpha" operator="out"></fecomposite><fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></fecolormatrix><feblend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_19461_8348"></feblend><feblend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19461_8348" result="shape"></feblend></filter></defs></svg></button>
				<button class="sectionBtn w-7 h-7 text-black absolute transition duration-250 transform hover:bg-gray-900 hover:text-white focus:outline-none text-sm md:text-base lg:w-9 lg:h-9 lg:text-xl xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 3xl:text-2xl right-0 bg-white/25 shadow-transparent !w-12 !h-12 rounded-none hidden lg:flex justify-center items-center z-10 top-[66px] min-[1600px]:top-[84px] translate-y-0 m-0" id="recent-next" aria-label="next-button"><svg width="26" height="28" viewbox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-[180deg]"><g filter="url(#filter0_d_19461_8348)"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8122 5.34218C16.4517 6.0669 16.3825 7.17278 15.6578 7.81224L8.645 14L15.6578 20.1878C16.3825 20.8273 16.4517 21.9331 15.8122 22.6579C15.1727 23.3826 14.0669 23.4517 13.3421 22.8122L5.26706 15.6872C4.25192 14.7914 4.25192 13.2086 5.26706 12.3129L13.3421 5.1878C14.0669 4.54835 15.1727 4.61747 15.8122 5.34218Z" fill="white"></path></g><defs><filter id="filter0_d_19461_8348" x="0.505707" y="0.75" width="19.7443" height="26.5" filterunits="userSpaceOnUse" color-interpolation-filters="sRGB"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><fecolormatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></fecolormatrix><feoffset></feoffset><fegaussianblur stddeviation="2"></fegaussianblur><fecomposite in2="hardAlpha" operator="out"></fecomposite><fecolormatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"></fecolormatrix><feblend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_19461_8348"></feblend><feblend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19461_8348" result="shape"></feblend></filter></defs></svg></button>
			</div>
		</div>
		`;
	$(`.${key}Box`).append(boxHeader);
}
// 메인페이지 상품탭 바로가기 기능구현
$(document).on('click', '.sortLink', function() {
	const code = $(this).attr('data-code');
	sessionStorage.setItem("detailCode", code);
	location.href = "/product/listProduct";
});


// 정렬 Type 정리해준 리스트 랜덤으로 섞어주는 함수
function shuffleArray(array) {
    const shuffled = array.slice(); // 배열 복사
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 랜덤 인덱스
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 교환
    }
    return shuffled; // 섞인 배열 반환
}