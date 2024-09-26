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
        },
        error: function(error) {
            console.error('상품 상세 정보를 가져오는 중 오류 발생:', error);
        },
    });
});
