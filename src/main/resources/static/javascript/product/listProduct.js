$(document).ready(function() {
    // 현재 정렬 기준을 저장 (기본은 '최신순')
    let currentSortType = 'date';

    // 정렬 목록을 가져와서 버튼을 생성
    $.ajax({
        url: '/getSortList',
        type: 'GET',
        success: function(data) {
            // 응답 데이터를 받아와서 각각의 DCO_ID, DCO_VALUE로 <li>와 <button>을 생성
            let sortListContainer = $('.inline-flex'); // <ul> 태그 선택

            // 기존 내용을 비우기 (필요한 경우)
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
        console.log('페이지 로딩:', page, '정렬 기준:', currentSortType); // 페이지 번호 및 정렬 기준 로깅
        $.ajax({
            url: '/listProductsSorted',
            type: 'GET',
            data: {
                page: page,
                size: 20, // 페이지당 20개의 상품을 가져옴
                sortType: currentSortType // 선택한 정렬 기준을 서버로 전송
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


