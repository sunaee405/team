$(document).ready(function() {
	// 상품 번호 설정
	//	const proNo = 100; // 실제 상품 번호로 변경
	const urlParams = new URLSearchParams(window.location.search);
	const proNo = urlParams.get('proNo'); // URL의 proNo 파라미터 가져오기


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
			const category = response.PRO_CATEGORY_C; // 카테고리 값 가져오기
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
			const stateValue = response.PRO_STATE // PRO_STATE값

			// 거래방식 값 가져오기
			const typeSub = response.TYPE_VALUE_SUB // PRO_TYPE_SUB 값
			const typeValue = response.TYPE_VALUE // PRO_TYPE 값

			// 네고여부 값 가져오기
			const negSub = response.PRO_NEG_SUB // PRO_NEG_SUB 값
			const negValue = response.PRO_NEG // PRO_NEG 값

			// 판매상태 값 가져오기
			const statusSub = response.PRO_STATUS_SUB // PRO_STATUS_SUB 값
			const statuseValue = response.PRO_STATUS // PRO_STATUS 값


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
				<li class="flex flex-col flex-1 basis-[25%] px-3 sm:px-4 relative after:absolute [&amp;:not(:first-child)]:after:content-['']  after:bg-gray-300 after:h-[20px] [&amp;:not(:first-child)]:after:w-[1px] after:left-0 justify-center items-center">
						<span class="text-xs font-normal text-jnGray-600 break-keep">
							${statusSub}
						</span>
							<button disabled="" class="block text-sm font-semibold text-jnblack mt-1 ">
								${statuseValue}
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

			// 두 번째 AJAX 요청: (상품등록자의) MEM_NO로 랜덤 상품 3개 가져오기
			const memNo = response.MEM_NO; // 첫 번째 응답에서 (상품등록자의) MEM_NO 값 추출

			$.ajax({
				url: '/getOtherProductByMemNo', // 상품 등록한 MEM_NO로 다른 상품 가져오는 API 엔드포인트
				type: 'GET',
				data: { memNo: memNo }, // MEM_NO를 전달
				success: function(products) {
					let otherProductHtml = '';
					let otherProductHtml3 = '';

					// products 배열을 무작위로 섞은 후, 앞에서부터 3개만 선택
					const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);

					randomProducts.forEach(function(product) {
						const images = product.pro_img ? product.pro_img.split(',') : [];
						const imageUrl = images.length > 0 ? '/images/' + images[0] : '/images/default.png';
						const productUrl = '/product/contentProduct?proNo=' + product.pro_no;

						// 숨겨둔 memNo
						otherProductHtml += `
            				<li class="flex py-3 h-[160px] overflow-hidden">
                				<a href="${productUrl}" rel="sponsored noreferrer" class="mr-3 flex justify-center items-start min-w-[120px] relative">
                    				<img src="${imageUrl}" width="120" height="120" decoding="async" data-nimg="1" class="transition duration-150 ease-linear transform rounded-md cursor-pointer hover:scale-105" style="color: transparent;">
                				</a>
                				<div class="flex flex-col justify-start gap-1 py-1 break-all">
                    				<h3>${product.pro_title}</h3>
                    				<div class="flex gap-1 items-center">
                        				<strong class="text-black">${product.pro_price + '원'}</strong>
                    				</div>
                				</div>
            				</li>
            				<input type="hidden" id="selMember" name="" value="${memNo}"> 
        				`;
					});

					// #otherProductByMemNo UL 태그 안에 상품 목록 추가
					$('#otherProductByMemNo').html(otherProductHtml);
					
					otherProductHtml3 += `
					<h3 class="md:text-[22px] font-bold text-jnBlack mr-2 text-lg empty:h-7">${response.MEM_ID}의
						다른 상품</h3>`;
						
					$('#ohterProductByMemNoT').html(otherProductHtml3);
					
					
				},
				error: function(error) {
					console.error('MEM_NO에 해당하는 랜덤 상품 정보를 가져오는 중 오류 발생:', error);
				}
				
			});


			// 세 번째 AJAX 요청: PRO_CATEGORY로 같은 카테고리의 랜덤 상품 3개 가져오기
			const proCategory = response.PRO_CATEGORY;

			$.ajax({
				url: '/getOtherProductByProCategroy', // MEM_NO로 다른 상품 가져오는 API 엔드포인트
				type: 'GET',
				data: { proCategory: proCategory }, // MEM_NO를 전달
				success: function(products) {
					let otherProductHtml2 = '';

					// products 배열을 무작위로 섞은 후, 앞에서부터 3개만 선택
					const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);

					randomProducts.forEach(function(product) {
						const images = product.pro_img ? product.pro_img.split(',') : [];
						const imageUrl = images.length > 0 ? '/images/' + images[0] : '/images/default.png';
						const productUrl = '/product/contentProduct?proNo=' + product.pro_no;

						otherProductHtml2 += `
            				<li class="flex py-3 h-[160px] overflow-hidden">
                				<a href="${productUrl}" rel="sponsored noreferrer" class="mr-3 flex justify-center items-start min-w-[120px] relative">
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
					$('#otherProductByCategory').html(otherProductHtml2);
					
				},
				error: function(error) {
					console.error('MEM_NO에 해당하는 랜덤 상품 정보를 가져오는 중 오류 발생:', error);
				}
			});

			// 세션에서 현재 로그인한 사용자의 memNo 가져오기
			$.ajax({
				url: '/getMemNoByMemId',
				type: 'GET',
				success: function(sessionMemNo) {
					const sellerMemNo = response.MEM_NO;

					// 상품 등록자와 현재 로그인한 사용자가 같은 경우
					if (sessionMemNo === sellerMemNo) {
						let buttonsHtml2 = `
                        <button data-variant="slim"
							class="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center placeholder-white focus-visible:outline-none focus:outline-none rounded-md h-11 md:h-12 px-5 py-2 transform-none normal-case hover:shadow-cart ga4_product_detail_bottom w-full bg-white hover:bg-white/90 text-jnblack hover:text-jnblack border-[1px] border-jnblack"
							id="modifyButton">수정하기</button>
						<button data-variant="slim"
							class="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md h-11 md:h-12 px-5 text-white py-2 transform-none normal-case hover:text-white hover:shadow-cart w-full ga4_product_detail_bottom bg-jnblack hover:bg-jnblack/90"
							id="deleteButton">삭제하기</button>
                        `;
						$('#sellCheckDiv').append(buttonsHtml2);

						// '수정하기' 버튼 클릭 시 상품 수정 페이지로 이동
						$('#modifyButton').on('click', function() {
							const modifyUrl = `/product/modifyProduct?proNo=${proNo}`; // 상품 번호를 URL 파라미터로 전달
							window.location.href = modifyUrl; // 수정 페이지로 리다이렉트
						});

						// **'삭제하기' 버튼 클릭 시 AJAX 요청**
						$('#deleteButton').on('click', function() {
							if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
								$.ajax({
									url: '/deleteProduct',
									type: 'POST',
									data: { proNo: proNo },
									success: function(response) {
										alert('상품이 성공적으로 삭제되었습니다.');
										window.location.href = '/product/listProduct'; // 상품 목록 페이지로 리다이렉트
									},
									error: function(error) {
										console.error('상품 삭제 중 오류 발생:', error);
										alert('상품 삭제에 실패했습니다.');
									}
								});
							}
						});

					} else {
						// 상품 등록자와 현재 사용자가 다른 경우
						let buttonsHtml = `
						<button data-variant="slim"
							class="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center placeholder-white focus-visible:outline-none focus:outline-none rounded-md h-11 md:h-12 px-5 py-2 transform-none normal-case hover:shadow-cart ga4_product_detail_bottom w-full bg-white hover:bg-white/90 text-jnblack hover:text-jnblack border-[1px] border-jnblack chatBtn">
							채팅하기</button>
						<button id="payButton" data-variant="slim"
							class="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md h-11 md:h-12 px-5 text-white py-2 transform-none normal-case hover:text-white hover:shadow-cart w-full ga4_product_detail_bottom bg-jnblack hover:bg-jnblack/90">
							구매하기</button>
                        `;
						$('#sellCheckDiv').append(buttonsHtml);

						// 결제 버튼 클릭 시 결제 로직
						$('#payButton').on('click', function() {
//							console.log(proNo);
//							console.log(sessionMemNo);
//							console.log(sellerMemNo);
							var IMP = window.IMP; // 아임포트 객체 초기화
							IMP.init("imp35316214"); // 가맹점 식별코드 입력

							IMP.request_pay({
								pg: "html5_inicis",        // 결제사 설정 (이니시스)
								pay_method: "card",        // 결제 방식 (카드)
								merchant_uid: "O" + new Date().getTime(), // 주문번호 생성
								name: title,               // 상품명
								// amount: price           // 결제 금액
								amount: 10,
								buyer_email: "",
								buyer_name : response.MEM_ID,
							}, function(rsp) {
								if (rsp.success) {
									alert('결제가 완료되었습니다.');
									// 결제 완료 후 서버에 결제 정보 전송
									$.ajax({
										url: '/payProduct',
										type: 'POST',
										contentType: 'application/json',
										data: JSON.stringify({
											proNo: proNo,
											buyMemNo: sessionMemNo,
											selMemNo: sellerMemNo
										}),
										success: function(response) {
											// 결제 성공 시 리다이렉트 URL로 이동
											window.location.href = response.redirectUrl;
										},
										error: function(error) {
											console.error('결제 처리 중 오류 발생:', error);
											alert('결제에 실패했습니다.');
										}
									});
								} else {
									alert('결제가 실패하였습니다.');
								}
							});
						});
					}

					// 상품 상태에 따라 sellCheckDiv 보이기/숨기기
					const proStatusCode = response.PRO_STATUS_CODE;
					if (proStatusCode === 'STD2' && sessionMemNo !== sellerMemNo) {
						$('#sellCheckDiv').hide(); // STD2이면서 등록자와 사용자가 다르면 숨김
					} else {
						$('#sellCheckDiv').show(); // STD1이거나 등록자와 사용자가 같으면 보임
					}

					// likedCheckDiv에 찜 버튼 생성
					let likedHtml = `
                        <label for="likedCheckInput" class="relative cursor-pointer">
                            <svg id="likeIcon" width="32" height="32" viewBox="0 0 32 32" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="pointer-events-none w-8 h-8">
                                <path d="M5.94197 17.9925L15.2564 26.334C15.3282 26.3983 15.3641 26.4305 15.3975 26.4557C15.7541 26.7249 16.2459 26.7249 16.6025 26.4557C16.6359 26.4305 16.6718 26.3983 16.7436 26.3341L26.058 17.9925C28.8244 15.5151 29.1565 11.3015 26.8124 8.42125L26.5675 8.12029C23.8495 4.78056 18.5906 5.35863 16.663 9.20902C16.3896 9.75505 15.6104 9.75505 15.337 9.20902C13.4094 5.35863 8.1505 4.78056 5.43249 8.12028L5.18755 8.42125C2.84352 11.3015 3.17564 15.5151 5.94197 17.9925Z"
                                    stroke-width="1.5" stroke="#9CA3AF" fill="transparent">
                                </path>
                            </svg>
                        </label>
                        <input id="likedCheckInput" type="checkbox" class="a11yHidden" style="display: none;">
                    `;
					$('#likedCheckDiv').html(likedHtml);

					// 찜 상태 확인
					$.ajax({
						url: '/checkLikedStatus',
						type: 'GET',
						data: { memNo: sessionMemNo, proNo: proNo },
						success: function(isLiked) {
							if (isLiked) {
								$('#likedCheckInput').prop('checked', true);
								$('#likeIcon path').attr('stroke', '#dc2626').attr('fill', '#dc2626');
							}
						},
						error: function(error) {
							console.error('찜 상태 확인 중 오류 발생:', error);
						}
					});

					// 찜 추가/삭제 처리
					let isProcessing = false;
					$('#likedCheckDiv').on('click', function() {
						if (isProcessing) return;
						isProcessing = true;

						const isChecked = $('#likedCheckInput').is(':checked');

						if (!isChecked) {
							$('#likeIcon path').attr('stroke', '#dc2626').attr('fill', '#dc2626');

							$.ajax({
								url: '/insertLiked',
								type: 'POST',
								data: { memNo: sessionMemNo, proNo: proNo },
								success: function(response) {
									$('#likedCheckInput').prop('checked', true);
									isProcessing = false;
								},
								error: function(error) {
									console.error('찜 추가 중 오류 발생:', error);
									isProcessing = false;
								}
							});
						} else {
							$('#likeIcon path').attr('stroke', '#9CA3AF').attr('fill', 'transparent');

							$.ajax({
								url: '/deleteLiked',
								type: 'POST',
								data: { memNo: sessionMemNo, proNo: proNo },
								success: function(response) {
									$('#likedCheckInput').prop('checked', false);
									isProcessing = false;
								},
								error: function(error) {
									console.error('찜 삭제 중 오류 발생:', error);
									isProcessing = false;
								}
							});
						}
					});
				},

				//				error: function(error) {
				//					console.error('세션에서 memNo를 가져오는 중 오류 발생:', error);
				//					alert('로그인 상태를 확인할 수 없습니다.');
				//					window.location.href = '/member/login'; // 로그인 페이지로 리다이렉트
				//				}
			});
		},

		error: function(error) {
			console.error('상품 데이터를 가져오는 중 오류 발생:', error);
		}
	});
});