$(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const proNo = urlParams.get('pro_no');
	$.ajax({
            type: 'GET',
            url: `/admin/products/${proNo}`, // 상세 정보 API 엔드포인트
            success: function(data) {
                // 데이터가 성공적으로 반환되면 테이블에 추가
	            $('#product-info').html(`
	            <tr>
                    <th>상품번호</th>
                    <td>${data.PRO_NO}</td>
                    <th>판매자 ID</th>
                    <td>${data.MEM_ID}</td>
                    <th>카테고리</th>
                    <td>${data.PRO_CATEGORY_C}</td>
                </tr>
                <tr>
                    <th>제품상태</th>
                    <td>${data.PRO_STATE}</td>
                    <th>네고유무</th>
                    <td>${data.PRO_NEG}</td>
                    <th>상품금액</th>
                    <td>${data.PRO_PRICE}원</td>
                </tr>
                <tr>
                    <th>판매글 제목</th>
                    <td>${data.PRO_TITLE}</td>
                    <th>거래가능지역</th>
                    <td>${data.LOCATION_SUB} ${data.LOCATION_VALUE}</td>
                    <th>거래 방식</th>
                    <td>${data.TYPE_VALUE}</td>
                </tr>
                <tr>
                    <th>판매상태</th>
                    <td>${data.PRO_STATUS}</td>
                    <th>조회수</th>
                    <td>${data.PRO_VIEWS}</td>
                    <th>등록일</th>
                    <td>${data.PRO_DATE}</td>
                </tr>
                <tr>
                	<th>판매글</th>
                    <td>${data.PRO_CONTENT}</td>
                </tr>
                <tr>
                	<th>이미지</th>
                    <td>${data.PRO_IMG}</td>
                </tr>
	            `);
	            
	            },
	            error: function(error) {
	                console.error('Error fetching member details:', error);
	                alert('회원 정보를 가져오는 데 실패했습니다.');
	            }
	        });
	        
	$('#deleteButton').click(function(){
	    // Ajax 요청으로 서버에 데이터 전송
	    $.ajax({
			url: `/admin/products/delete/${proNo}`, // 현재 상태에 따라 URL 선택
	        type: 'DELETE',
	        contentType: 'application/json',
	        success: function(response) {
	            alert('처리가 완료되었습니다.'); // 성공 시 메시지
	            window.location.href = 'list';//페이지 이동
	        },
	        error: function(xhr, status, error) {
	            // 오류 처리
	            console.error('처리 실패:', error);
	            alert('처리에 실패했습니다.');
	        }
	    });
	});       
	
});