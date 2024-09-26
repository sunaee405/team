$(document).ready(function() {
	// 상품 번호 설정
	const proNo = 100; // 실제 상품 번호로 변경

	// AJAX 요청으로 상품 데이터 가져오기
	$.ajax({
		url: '/getContentProduct',
		type: 'GET',
		data: { proNo: proNo },
		success: function(response) {
			const images = response.PRO_IMG.split(',').map(img => img.trim());
			let imageSlides = '';

			images.forEach((image) => {
				const imageUrl = '/images/' + image;
				imageSlides += `
                    <div class="swiper-slide">
                        <img src="${imageUrl}" alt="Product Image" class="object-cover w-full h-full">
                    </div>
                `;
			});

			// Swiper wrapper 안에 슬라이드 추가
			$('.swiper-wrapper').html(imageSlides);

			// Swiper 초기화
			const swiper = new Swiper('.swiper-container', {
				loop: false, // 슬라이드가 반복되지 않도록 설정
				slidesPerView: 1, // 한 번에 하나의 슬라이드만 보이도록 설정
				spaceBetween: 0, // 슬라이드 간 여백 없음
				centeredSlides: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

			// 프로 카테고리 값을 <li> 태그로 생성하여 <ol> 안에 삽입
			const category = response.PRO_CATEGORY; // 카테고리 값 가져오기
			const categoryListItem = `
                <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
                    카테고리 > ${category}
                </li>
            `;

			// <ol> 태그 안에 <li> 추가
			$('#product_category').append(categoryListItem);

			// 지역 값을 <li> 태그로 생성하여 location-list에 삽입
			const locationSub = response.LOCATION_SUB; // LOCATION_SUB 값
			const locationValue = response.LOCATION_VALUE; // LOCATION_VALUE 값
			const locationListItem = `
                <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
                    판매지역 > ${locationSub} > ${locationValue}
                </li>
            `;
			$('#product_location').append(locationListItem); // ID가 "location-list"인 <ol>에 추가

			// PRO_TITLE 값을 <h1> 태그로 생성하여 <div> 안에 삽입
			const title = response.PRO_TITLE;
			const titleElement = `
                <h1 class="text-lg font-semibold leading-6 md:text-2xl md:leading-[28.64px] text-jnblack mr-2">
                    ${title}
                </h1>
            `;
			// 타이틀을 해당 <div>에 추가
			$('#product_title').append(titleElement);

			// PRO_PRICE 값을 <div> 태그로 생성하여 <div> 안에 삽입
			const price = response.PRO_PRICE + '원'; // PRO_PRICE 값에 "원"을 붙여 출력
			const priceElement = `
                <div class="font-bold md:text-[32px] mr-2 text-[26px] leading-9 md:leading-[38.19px] text-heading">
                    ${price}
                </div>
            `;
			// 가격을 해당 <div>에 추가
			$('#product_price').append(priceElement);

			// 날짜와 조회수 계산 및 출력
			const now = new Date();
			const productDate = new Date(response.PRO_DATE); // 응답에서 날짜 값 가져오기
			let timeDifference = Math.floor((now - productDate) / 1000);
			let timeAgo = '';

			// 시간 차이를 계산하여 '몇분 전', '몇시간 전' 등으로 변환
			if (timeDifference < 60) {
				timeAgo = timeDifference + '초 전';
			} else if (timeDifference < 3600) {
				timeAgo = Math.floor(timeDifference / 60) + '분 전';
			} else if (timeDifference < 86400) {
				timeAgo = Math.floor(timeDifference / 3600) + '시간 전';
			} else if (timeDifference < 604800) {
				timeAgo = Math.floor(timeDifference / 86400) + '일 전';
			} else if (timeDifference < 2592000) {
				timeAgo = Math.floor(timeDifference / 604800) + '주 전';
			} else if (timeDifference < 31536000) {
				timeAgo = Math.floor(timeDifference / 2592000) + '개월 전';
			} else {
				timeAgo = Math.floor(timeDifference / 31536000) + '년 전';
			}

			// 조회수 값 가져오기
			const views = response.PRO_VIEWS;

			// 날짜와 조회수를 <span> 태그로 생성하여 product_etc에 삽입
			const etcInfo = `
                <span class="text-jnGray-500 leading-[15px]">
                    ${timeAgo} · 조회수 ${views}
                </span>
            `;
			$('#product_etc').append(etcInfo); // ID가 "product_etc"인 <div>에 추가


			// 제품상태 값 가져오기
			const stateSub = response.PRO_STATE_SUB // PRO_STATE_SUB값
			const stateValue = response.PRO_STATE // PRO_STATE_SUB값

			// 거래방식 값 가져오기
			const typeSub = response.TYPE_VALUE_SUB // PRO_TYPE_SUB 값
			const typeValue = response.TYPE_VALUE // PRO_TYPE 값

			// 네고여부 값 가져오기
			const negSub = response.PRO_NEG_SUB // PRO_NEG_SUB 값
			const negValue = response.PRO_NEG // PRO_NEG 값

			const etc2Info = `
            	<li class="flex flex-col flex-1 basis-[25%] px-3 sm:px-4 relative after:absolute [&amp;:not(:first-child)]:after:content-['']  after:bg-gray-300 after:h-[20px] [&amp;:not(:first-child)]:after:w-[1px] after:left-0 justify-center items-center">
						<span class="text-xs font-normal text-jnGray-600 break-keep">
							${stateSub}
						</span>
							<button disabled="" class="block text-sm font-semibold text-jnblack mt-1 ">
								${stateValue}
							</button>
				</li>
				<li class="flex flex-col flex-1 basis-[25%] px-3 sm:px-4 relative after:absolute [&amp;:not(:first-child)]:after:content-['']  after:bg-gray-300 after:h-[20px] [&amp;:not(:first-child)]:after:w-[1px] after:left-0 justify-center items-center">
						<span class="text-xs font-normal text-jnGray-600 break-keep">
							${typeSub}
						</span>
							<button disabled="" class="block text-sm font-semibold text-jnblack mt-1 ">
								${typeValue}
							</button>
				</li>
				<li class="flex flex-col flex-1 basis-[25%] px-3 sm:px-4 relative after:absolute [&amp;:not(:first-child)]:after:content-['']  after:bg-gray-300 after:h-[20px] [&amp;:not(:first-child)]:after:w-[1px] after:left-0 justify-center items-center">
						<span class="text-xs font-normal text-jnGray-600 break-keep">
							${negSub}
						</span>
							<button disabled="" class="block text-sm font-semibold text-jnblack mt-1 ">
								${negValue}
							</button>
				</li>
			`;

			$('#product_etc2').append(etc2Info);


			// 상품 내용 값 가져오기
			const proContent = response.PRO_CONTENT // PRO_CONTENT 값
			const contentElement = `
					<h3 class="md:text-[22px] lg:pb-5 w-full border-b border-gray-300 basis-[48px] font-bold pb-3 text-jnblack text-lg">
						상품 정보
					</h3>
					<div class="flex flex-col h-auto">
						<article class="flex flex-col flex-1">
							<p class="flex-1 py-5 text-base font-normal break-words break-all whitespace-pre-line text-jnGray-900">
								${proContent}
							</p>
						</article>
						</div>
			`;
			$('#product_content').append(contentElement);

			// 두 번째 AJAX 요청: MEM_NO로 랜덤 상품 3개 가져오기
			const memNo = response.MEM_NO; // 첫 번째 응답에서 MEM_NO 값 추출

			$.ajax({
				url: '/getOtherProductByMemNo', // MEM_NO로 다른 상품 가져오는 API 엔드포인트
				type: 'GET',
				data: { memNo: memNo }, // MEM_NO를 전달
				success: function(products) {
					let otherProductHtml = '';

					// products 배열을 무작위로 섞은 후, 앞에서부터 3개만 선택
					const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);

					randomProducts.forEach(function(product) {
						const images = product.pro_img ? product.pro_img.split(',') : [];
						const imageUrl = images.length > 0 ? '/images/' + images[0] : '/images/default.png';
						const productUrl = '/productDetail?proNo=' + product.pro_no;

						otherProductHtml += `
            				<li class="flex py-3 h-[160px] overflow-hidden">
                				<a href="${productUrl}" rel="sponsored noreferrer" target="_blank" class="mr-3 flex justify-center items-start min-w-[120px] relative">
                    				<img src="${imageUrl}" width="120" height="120" decoding="async" data-nimg="1" class="transition duration-150 ease-linear transform rounded-md cursor-pointer hover:scale-105" style="color: transparent;">
                				</a>
                				<div class="flex flex-col justify-start gap-1 py-1 break-all">
                    				<h3>${product.pro_title}</h3>
                    				<div class="flex gap-1 items-center">
                        				<strong class="text-black">${product.pro_price + '원'}</strong>
                    				</div>
                				</div>
            				</li>
        				`;
					});

					// #otherProductByMemNo UL 태그 안에 상품 목록 추가
					$('#otherProductByMemNo').html(otherProductHtml);
				},
				error: function(error) {
					console.error('MEM_NO에 해당하는 랜덤 상품 정보를 가져오는 중 오류 발생:', error);
				}
			});

		},

		error: function(error) {
			console.error('상품 상세 정보를 가져오는 중 오류 발생:', error);
		},
	});



});
