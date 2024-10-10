$(document).ready(function(){

	$('.nav-link').click(function() {
	    const target = $(this).data('target');
	    const isCollapsed = $(this).hasClass('collapsed');

	    // aria-expanded 속성을 토글
	    $(this).attr('aria-expanded', !isCollapsed);

	    // collapsed 클래스를 토글
	    $(this).toggleClass('collapsed');

	    // collapse 상태에 따라 보이기 또는 숨기기
	    if (isCollapsed) {
	        $(target).collapse('show'); // 열기
	    } else {
	        $(target).collapse('hide'); // 닫기
	    }
	});
	
	
});

function logout() {
	$.ajax({
        url: '/admin/logout',
        type: 'POST', // 또는 'GET'
        contentType: 'application/json',
        success: function(response) {
            window.location.href = response.redirectUrl; // 리다이렉트 처리
        },
        error: function(xhr, status, error) {
            console.error('로그아웃 오류:', error);
        }
    });
}