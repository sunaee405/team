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
        </style>
        
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 20px;">
            <h2 style="font-size: 30px; font-weight: bold; margin-bottom: 20px; margin-top: 20px; text-align: left; color: black;">
                자주 찾는 질문
            </h2>
            <div style="border-bottom: 3px solid #000; margin-bottom: 20px; margin-top: 10px;"></div> <!-- 상단 여백 추가 -->
            
            <ul class="faq-list" id="faqList">
            </ul>
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
            // 뉴스 목록 추가
            data.forEach(function(item) {
                $('#faqList').append(`<li class="faq-item">${item.NEW_NAME}</li>`);
            });

            // li 클릭 이벤트 처리
            $('.faq-item').on('click', function() {
                // 클릭한 li의 제목을 가져오기
                const selectedTitle = $(this).text();

                // 선택된 뉴스 항목의 내용 및 날짜를 가져오기
                const selectedNewsItem = data.find(item => item.NEW_NAME === selectedTitle);

                // 내용 표시
                const newsContent = `
                    <div class="news-detail">
                        <h3>${selectedNewsItem.NEW_NAME}</h3>
                        <p>${selectedNewsItem.NEW_CONTENT}</p>
                        <p>게시일: ${new Date(selectedNewsItem.NEW_DATE).toLocaleDateString()}</p>
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
            });
        }
    });
});
