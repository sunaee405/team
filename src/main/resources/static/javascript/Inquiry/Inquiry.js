$(document).ready(function() {
    // HTML 구조를 담을 변수
    var faqPage = `
        <style>
            .faq-list {
                list-style-type: none;
                padding: 0;
            }
            .faq-item {
                padding: 10px 0;
                padding-bottom: 20px;
                margin-bottom: 15px;
                border-bottom: 1px solid #ccc;
                font-size: 18px;
                cursor: pointer;
                color: black;
            }
            .news-detail {
                margin-top: 20px;
                color: black; /* 뉴스 내용 전체 검정색 */
            }
            .news-detail h3 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .news-detail p {
                font-size: 16px;
                margin-bottom: 5px;
                color: black; /* p 태그도 검정색 */
            }
            .back-button {
                margin-top: 20px;
                padding: 10px 15px;
                background-color: #e0e0e0;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }
            .category {
                display: inline-block;
                margin-right: 20px;
                font-weight: bold;
                font-size: 20px;
                color: gray; /* 기본 색상 회색 */
                cursor: pointer;
            }
            .active-category {
                color: black; /* 클릭한 카테고리 색상 */
            }
        </style>
        
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="font-size: 30px; font-weight: bold; margin-bottom: 20px; margin-top: 20px; text-align: left; color: black;">
                QNA
            </h2>
            <div style="border-bottom: 3px solid #000; margin-bottom: 20px; margin-top: 10px;"></div> <!-- 상단 여백 추가 -->
            
            <div id="categoryContainer"></div> <!-- 카테고리 영역 -->
            <ul class="faq-list" id="faqList"></ul> <!-- FAQ 목록 -->
        </div>
    `;

    // body에 append
    $('body').append(faqPage);

    // AJAX 요청
    $.ajax({
        url: '/members/SelectNews',  
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // 카테고리별로 그룹화
            let categories = {};

            data.forEach(function(item) {
                const category = item.DCO_VALUE; // 카테고리 값

                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(item);
            });

            // 카테고리 추가
            for (const category in categories) {
                $('#categoryContainer').append(`<div class="category" data-category="${category}">${category}</div>`);
            }

            // 기본 카테고리 클릭 이벤트
            $('.category').on('click', function() {
                const selectedCategory = $(this).data('category');
                updateNewsList(categories[selectedCategory]);
                $('.category').removeClass('active-category');
                $(this).addClass('active-category');
            });

            // 기본 카테고리의 첫 번째 항목 로드
            if (Object.keys(categories).length > 0) {
                const firstCategory = Object.keys(categories)[0];
                $('.category[data-category="' + firstCategory + '"]').click(); // 첫 번째 카테고리 클릭
            }
        },
        error: function(err) {
            console.error('뉴스를 가져오는 데 실패했습니다.', err);
        }
    });

    function updateNewsList(items) {
        $('#faqList').empty(); // 기존 목록 비우기

        items.forEach(function(item) {
            $('#faqList').append(`<li class="faq-item" data-new-name="${item.NEW_NAME}">${item.NEW_NAME}</li>`);
        });

        // 뉴스 클릭 이벤트 처리
        $('.faq-item').off('click').on('click', function() {
            const selectedTitle = $(this).data('new-name');
            const selectedNewsItem = items.find(item => item.NEW_NAME === selectedTitle);
            showNewsDetail(selectedNewsItem);
        });
    }

    // 뉴스 세부 사항을 보여주는 함수
    function showNewsDetail(item) {
        const newsContent = `
            <div class="news-detail">
                <h3>${item.NEW_NAME}</h3>
                <p>${item.NEW_CONTENT}</p>
                <p>게시일: ${new Date(item.NEW_DATE).toLocaleDateString()}</p>
            </div>
            <button class="back-button" id="backButton">뒤로가기</button>
        `;

        // 기존 내용 지우고 세부 내용으로 교체
        $('.container').empty().append(faqPage).append(newsContent);

        // 뒤로가기 버튼 클릭 이벤트
        $('#backButton').on('click', function() {
            // Inquiry 페이지로 이동
            window.location.href = "http://localhost:8080/Inquiry/Inquiry";
        });
    }
});
