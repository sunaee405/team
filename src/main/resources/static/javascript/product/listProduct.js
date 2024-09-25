$(document).ready(function() {
	// 현재 정렬 기준을 저장 (기본은 '최신순')
	let currentSortType = 'date';
	let currentCategoryId = ''; // 기본값은 전체 (모든 카테고리)
	let currentLocationScoId = ''; // 기본값은 전체 (모든 지역)
	let currentLocationDcoId = ''; // 기본값은 전체 (모든 지역)
	let currentSearchKeyword = ''; // 기본 검색어는 빈 값

	// 카테고리 데이터를 가져오기 위한 AJAX 요청
	$.ajax({
		url: '/getProductCategory', // 카테고리 데이터를 가져오는 API 엔드포인트
		type: 'GET',
		success: function(categories) {
			let categoryFilter = $('#category-filter'); // <tr> 선택

			// 카테고리 데이터를 ID의 오름차순으로 정렬
			categories.sort(function(a, b) {
				return a.ID - b.ID; // ID 기준 오름차순 정렬
			});

			// ol 태그로 감싸서 li 항목 생성
			let categoryList = `
            <td>
                <div class="flex items-center w-full chawkbazarBreadcrumb">
                    <ol class="flex flex-wrap items-center w-full mt-0 lg:mt-0">
                        <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
                            <a class="text-base font-semibold text-jnBlack font-medium text-base text-jnBlack active" href="#" data-id="">
                                전체
                            </a>
                        </li>
                        <li class="pl-0 mx-2 mt-0 text-sm leading-5 text-jnGray-500 lg:mt-0">|</li>
        `;

			// 카테고리 항목을 추가
			categories.forEach(function(category, index) {
				// 카테고리 항목 추가
				let categoryItem = `
                <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
                    <a class="text-base font-semibold text-jnBlack font-medium text-base text-jnBlack" href="#" data-id="${category.DCO_ID}">
                        ${category.DCO_VALUE}
                    </a>
                </li>
            `;

				// " | " 구분자는 첫 번째 카테고리 이후부터만 추가
				if (index > 0) {
					categoryList += `<li class="pl-0 mx-2 mt-0 text-sm leading-5 text-jnGray-500 lg:mt-0">|</li>`;
				}

				categoryList += categoryItem;
			});

			// 닫는 ol 태그
			categoryList += `
                    </ol>
                </div>
            </td>
        `;

			// 생성된 카테고리 목록을 <tr>에 추가
			categoryFilter.append(categoryList);

			// 카테고리 버튼 클릭 이벤트 설정 (필터링)
			$('#category-filter a').click(function(event) {
				event.preventDefault();
				currentCategoryId = $(this).data('id'); // DCO_ID 값 업데이트
				console.log('선택된 카테고리 ID:', currentCategoryId);

				// 모든 카테고리 버튼의 active 클래스 제거
				$('#category-filter a').removeClass('active');
				// 클릭된 카테고리 버튼에 active 클래스 추가
				$(this).addClass('active');

				// 현재 선택된 카테고리 ID를 업데이트

				loadProducts(1); // 첫 페이지부터 다시 로드
			});
		},
		error: function(xhr, status, error) {
			console.error('카테고리 로드 오류:', error);
		}
	});

	// 지역 데이터를 가져오기 위한 AJAX 요청
	$.ajax({
		url: '/getProductLocation', // 지역 데이터를 가져오는 API 엔드포인트
		type: 'GET',
		success: function(locations) {
			let locationFilter = $('#location-filter'); // <tr> 선택

			// 상위 지역(SCO_VALUE) 목록만 표시하기 위한 변수
			let currentSCO = '';
			let locationList = `
            <td>
                <div class="flex items-center w-full chawkbazarBreadcrumb">
                    <ol class="flex flex-wrap items-center w-full mt-0 lg:mt-0">
                        <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
                            <a class="text-base font-semibold text-jnBlack font-medium text-base text-jnBlack active" href="#" data-sco="">
                                전체
                            </a>
                        </li>
                        <li class="pl-0 mx-2 mt-0 text-sm leading-5 text-jnGray-500 lg:mt-0">|</li>
        `;

			// 지역 항목을 추가 (상위 지역(SCO_VALUE) 기준으로)
			locations.forEach(function(location, index) {
				if (location.SCO_VALUE !== currentSCO) {
					currentSCO = location.SCO_VALUE;

					let locationItem = `
                    <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
                        <a class="text-base font-semibold text-jnBlack font-medium text-base text-jnBlack" href="#" data-sco="${location.SCO_ID}">
                            ${location.SCO_VALUE}
                        </a>
                    </li>
                `;

					// " | " 구분자는 첫 번째 항목 이후부터 추가
					if (index > 0) {
						locationList += `<li class="pl-0 mx-2 mt-0 text-sm leading-5 text-jnGray-500 lg:mt-0">|</li>`;
					}

					locationList += locationItem;
				}
			});

			// 닫는 ol 태그
			locationList += `
                    </ol>
                </div>
            </td>
        `;

			// 생성된 상위 지역 목록을 <tr>에 추가
			locationFilter.append(locationList);

			// 상위 지역 클릭 이벤트 설정 (하위 지역 표시)
			$('#location-filter a').click(function(event) {
				event.preventDefault();
				let scoId = $(this).data('sco'); // 상위 지역(SCO_ID) 값 가져오기
				currentLocationScoId = scoId;  // 상위 지역을 선택했으므로 지역 ID 업데이트
				currentLocationDcoId = ''; // 하위 지역 필터 초기화
				console.log('선택된 상위 지역 SCO_ID:', scoId);

				// 모든 상위 지역 버튼의 active 클래스 제거
				$('#location-filter a').removeClass('active');
				// 클릭된 상위 지역 버튼에 active 클래스 추가
				$(this).addClass('active');

				// 하위 지역 목록이 이미 있는 경우 제거
				$('#sub-location-filter').remove();

				// "전체"를 클릭한 경우 하위 지역을 표시하지 않고 필터링 해제
				if (!currentLocationScoId) {
					currentLocationScoId = '';  // 상위 지역 필터 해제
					currentLocationDcoId = '';  // 하위 지역 필터 해제
					loadProducts(1);  // 전체 상품 목록을 로드
					return;  // 하위 지역을 생성하지 않음
				}

				// 선택한 상위 지역과 카테고리에 해당하는 상품 목록 로드
				loadProducts(1); // 페이지 1에서 다시 로드

				// 하위 지역 목록을 동적으로 추가
				loadSubLocations(currentLocationScoId, locations); // 하위 지역을 표시하는 함수 호출
			});
		},
		error: function(xhr, status, error) {
			console.error('지역 로드 오류:', error);
		}
	});

	// 하위 지역(DCO_VALUE)을 로드하고 표시하는 함수
	function loadSubLocations(scoId, locations) {
		let subLocationFilter = `
    <tr id="sub-location-filter">
        <td class="" style="font-weight: bold;text-align: center;width: 118px;"><p>상세지역</p>
        <td>
            <div class="flex items-center w-full chawkbazarBreadcrumb">
                <ol class="flex flex-wrap items-center w-full mt-0 lg:mt-0">
    `;

		// 선택된 상위 지역의 하위 지역(DCO_VALUE)을 필터링
		let subLocations = locations.filter(function(location) {
			return location.SCO_ID === scoId;
		});

		// 하위 지역(DCO_VALUE) 항목 추가
		subLocations.forEach(function(subLocation, index) {
			let subLocationItem = `
        <li class="flex-shrink-0 px-0 mt-0 text-sm break-all transition duration-200 ease-in text-body first:ps-0 last:pe-0 hover:text-heading">
            <a class="text-base font-semibold text-jnBlack font-medium text-base text-jnBlack" href="#" data-id="${subLocation.DCO_ID}">
                ${subLocation.DCO_VALUE}
            </a>
        </li>
        `;

			// 구분자 추가
			if (index > 0) {
				subLocationFilter += `<li class="pl-0 mx-2 mt-0 text-sm leading-5 text-jnGray-500 lg:mt-0">|</li>`;
			}

			subLocationFilter += subLocationItem;
		});

		// 닫는 ol 태그
		subLocationFilter += `
                </ol>
            </div>
        </td>
    </tr>
    `;

		// 하위 지역 목록을 #location-filter 다음에 추가
		$('#location-filter').after(subLocationFilter);

		// 하위 지역 클릭 이벤트 설정
		$('#sub-location-filter a').click(function(event) {
			event.preventDefault();
			let dcoId = $(this).data('id'); // DCO_ID 값 가져오기
			currentLocationDcoId = dcoId; // 선택된 하위 지역 ID 업데이트
			console.log('선택된 하위 지역 DCO_ID:', dcoId);

			// 모든 하위 지역 버튼의 active 클래스 제거
			$('#sub-location-filter a').removeClass('active');
			// 클릭된 하위 지역 버튼에 active 클래스 추가
			$(this).addClass('active');

			// 선택된 하위 지역과 현재 필터에 맞는 상품 목록 로드
			loadProducts(1); // 페이지 1에서 다시 로드
		});
	}

	// 검색 필터를 추가
	let searchFilter = $('#search-filter');
	let searchInput = `
    <td style="padding-top: 7px;padding-bottom: 7px;height: 24px;">
        <div class="flex justify-between items-center w-full">
            <input type="text" 
                class="w-[300px] border rounded border-jnGray-200 py-[10px] px-4 text-sm font-medium"
                placeholder="검색어를 입력하세요" id="search-input">
            <button id="reset-btn" data-routerlink="true" 
                class="text-sm underline text-jnGray-700 whitespace-nowrap ml-auto">
                초기화
            </button>
        </div>
    </td>`;
	searchFilter.append(searchInput);

	// 검색 입력 이벤트 설정
	$('#search-input').on('input', function() {
		let searchKeyword = $(this).val(); // 검색어 가져오기
		currentSearchKeyword = searchKeyword; // 검색어 업데이트
		loadProducts(1); // 페이지 1에서 다시 로드
	});

	// 초기화 버튼 클릭 이벤트 설정
	$('#reset-btn').on('click', function() {
		// 검색어, 카테고리, 지역을 초기 상태로 설정
		$('#search-input').val(''); // 검색어 초기화
		currentSearchKeyword = ''; // 검색어 변수 초기화

		// 카테고리 전체로 설정
		currentCategoryId = '';
		$('#category-filter a').removeClass('active');
		$('#category-filter a[data-id=""]').addClass('active'); // 전체 선택

		// 상위 지역 전체로 설정
		currentLocationScoId = '';
		$('#location-filter a').removeClass('active');
		$('#location-filter a[data-sco=""]').addClass('active'); // 전체 선택

		// 하위 지역 초기화
		currentLocationDcoId = '';
		$('#sub-location-filter').remove(); // 하위 지역 목록 제거

		// 전체 상품 목록 다시 로드
		loadProducts(1); // 첫 페이지부터 다시 로드
	});

	// 정렬 목록을 가져와서 버튼을 생성
	$.ajax({
		url: '/getSortList',
		type: 'GET',
		success: function(data) {
			// 응답 데이터를 받아와서 각각의 DCO_ID, DCO_VALUE로 <li>와 <button>을 생성
			let sortListContainer = $('.inline-flex'); // <ul> 태그 선택

			// 기존 내용을 비우기
			sortListContainer.empty();

			// 응답으로 받은 data 배열을 순회
			data.forEach(function(item) {
				// <li> 요소 생성
				let listItem = $('<li>')
					.addClass("text-sm leading-[17px] font-medium text-jnGray-900")
					.append(
						$('<button>')
							.addClass("px-2 sort-btn") // 정렬 버튼에 클래스 추가
							.text(item.DCO_VALUE) // DCO_VALUE를 버튼 텍스트로 설정
							.attr("data-id", item.DCO_ID) // DCO_ID를 data-id 속성에 저장
							.attr("data-sort-type", mapSortType(item.DCO_ID)) // DCO_ID에 따른 data-sort-type 설정
					);

				// <li> 요소에 스타일 적용 (마지막 요소 처리)
				listItem.addClass("[&:not(:last-child)]:after:content-['']")
					.addClass("after:inline-block after:border after:border-jnGray-300 after:h-[10px]")
					.addClass("[&:last-of-type]:after:border-none");

				// 생성한 <li>를 <ul>에 추가
				sortListContainer.append(listItem);
			});

			// 정렬 버튼 클릭 이벤트 설정
			$('.sort-btn').click(function() {
				currentSortType = $(this).attr('data-sort-type'); // 정렬 기준 변경
				loadProducts(1); // 첫 페이지부터 다시 로드

				// 모든 버튼의 active 클래스 제거
				$('.sort-btn').removeClass('active');
				// 클릭된 버튼에 active 클래스 추가
				$(this).addClass('active');
			});
		},
		error: function(xhr, status, error) {
			console.error('Sort list load error:', error);
		}
	});

	// DCO_ID에 따라 정렬 기준을 매핑하는 함수
	function mapSortType(dcoId) {
		console.log('Received dcoId:', dcoId);
		switch (dcoId) {
			case 'ARD1': return 'views';        // 조회순
			case 'ARD2': return 'date';         // 최신순
			case 'ARD3': return 'price_high';   // 높은 가격순
			case 'ARD4': return 'price_low';    // 낮은 가격순
			default: return 'date';            // 기본값은 최신순
		}
	}

	// 상품 목록을 불러오는 함수
	function loadProducts(page) {
		console.log('페이지 로딩:', page, '정렬 기준:', currentSortType, '카테고리 ID:', currentCategoryId, '상위 지역 SCO_ID:', currentLocationScoId, '하위 지역 DCO_ID:', currentLocationDcoId, '검색어:', currentSearchKeyword);
		$.ajax({
			url: '/listProductsSorted',
			type: 'GET',
			data: {
				page: page,
				size: 20, // 페이지당 20개의 상품을 가져옴
				sortType: currentSortType, // 선택한 정렬 기준을 서버로 전송
				categoryId: currentCategoryId, // 선택한 카테고리 ID를 서버로 전송
				locationScoId: currentLocationScoId, // 선택한 상위 지역 SCO_ID 전송
				locationDcoId: currentLocationDcoId, // 선택한 하위 지역 DCO_ID 전송
				searchKeyword: currentSearchKeyword // 검색어 전송
			},
			dataType: 'json',
			success: function(response) {
				var productListHtml = '';
				var products = response.products;
				var totalPages = response.totalPages;
				var currentPage = response.currentPage;

				products.forEach(function(product) {
					// 이미지 경로에서 첫 번째 이미지만 사용
					var images = product.PRO_IMG.split(',');
					var imageUrl = '/images/' + images[0];

					// 등록시간을 계산하여 "몇분 전", "몇시간 전" 등으로 변환
					var now = new Date();
					var productDate = new Date(product.PRO_DATE);
					var timeDifference = Math.floor((now - productDate) / 1000);
					var timeAgo = '';

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

					// 상품 HTML 생성
					productListHtml += `
                    <li class="">
                        <div>
                            <a class="relative group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform bg-white" href="/product/${product.PRO_NO}">
                                <div class="relative w-full rounded-md overflow-hidden dim pt-[0%] mb-3 md:mb-3.5">
                                    <img src="${imageUrl}" alt="Product Image">
                                </div>
                                <div class="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
                                    <h2 class="line-clamp-2 min-h-[2lh] text-sm md:text-base">${product.PRO_TITLE}</h2>
                                    <div class="font-semibold space-s-2 mt-0.5 text-heading lg:text-lg lg:mt-1.5">
                                        ${product.PRO_PRICE}원
                                    </div>
                                    <div class="my-1 h-6">
                                        <span class="text-sm text-gray-400">${product.LOCATION_SUB} ${product.LOCATION_VALUE}</span>
                                        <span class="mx-1 text-sm text-gray-400">|</span>
                                        <span class="text-sm text-gray-400">${timeAgo}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="text-xs text-gray-400 text-muted">조회수 ${product.PRO_VIEWS}</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                `;
				});

				// 상품 목록 HTML을 삽입
				$('ul.search-results').html(productListHtml);

				// 페이지 네비게이션 생성
				generatePagination(currentPage, totalPages);
			},
			error: function(xhr, status, error) {
				console.error('Error fetching product list:', error);
			}
		});
	}

	// 페이지 네비게이션 생성 함수
	function generatePagination(currentPage, totalPages) {
		var pageNavHtml = '';
		var pageCountToShow = 5; // 한 번에 보여줄 페이지 수
		var halfPageCount = Math.floor(pageCountToShow / 2);
		var startPage = currentPage - halfPageCount;
		var endPage = currentPage + halfPageCount;

		// 시작 페이지와 끝 페이지 조정
		if (startPage < 1) {
			endPage += (1 - startPage);
			startPage = 1;
		}
		if (endPage > totalPages) {
			startPage -= (endPage - totalPages);
			endPage = totalPages;
		}
		if (startPage < 1) {
			startPage = 1;
		}

		// "처음으로" 화살표
		if (currentPage > 1) {
			pageNavHtml += `
            <li class="pagination-item">
                <a class="pagination-link" href="#" data-page="1">
                  ◀◀
                </a>
            </li>
        `;
		}

		// 이전 페이지 화살표
		if (currentPage > 1) {
			pageNavHtml += `
            <li class="pagination-item">
                <a class="pagination-link" href="#" data-page="${currentPage - 1}">
                    ◀
                </a>
            </li>
        `;
		}

		// 페이지 번호 생성
		for (var i = startPage; i <= endPage; i++) {
			pageNavHtml += `
            <li class="pagination-item">
                <a class="pagination-link ${i === currentPage ? 'active' : ''}" href="#" data-page="${i}">
                    ${i}
                </a>
            </li>
        `;
		}

		// 다음 페이지 화살표
		if (currentPage < totalPages) {
			pageNavHtml += `
            <li class="pagination-item">
                <a class="pagination-link" href="#" data-page="${currentPage + 1}">
                   ▶
                </a>
            </li>
        `;
		}

		// "마지막으로" 화살표
		if (currentPage < totalPages) {
			pageNavHtml += `
            <li class="pagination-item">
                <a class="pagination-link" href="#" data-page="${totalPages}">
                    ▶▶
                </a>
            </li>
        `;
		}

		// 페이지 네비게이션 삽입
		$('ul.flex').html(pageNavHtml);

		// 이벤트 리스너 등록
		$('ul.flex').off('click').on('click', 'a', function(event) {
			event.preventDefault();
			var page = $(this).data('page');
			loadProducts(page);
		});
	}

	// 초기 페이지 로드
	loadProducts(1);
});
