$(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const memNo = urlParams.get('mem_no');
	$.ajax({
            type: 'GET',
            url: `/admin/members/${memNo}`, // 상세 정보 API 엔드포인트
            success: function(data) {
                // 데이터가 성공적으로 반환되면 테이블에 추가
	            $('#member-info').html(`
	            <tr>
                    <th>회원번호</th>
                    <td>${data.mem_no}</td>
                    <th>아이디</th>
                    <td>${data.mem_id}</td>
                    <th>회원등급</th>
                    <td class="editable" data-field="mem_grade">${data.mem_grade}</td>
                </tr>
                <tr>
                    <th>관리자유무</th>
                    <td class="editable" data-field="isAdmin">${data.isAdmin}</td>
                    <th>닉네임</th>
                    <td>${data.mem_nick}</td>
                    <th>전화번호</th>
                    <td class="editable" data-field="mem_tel">${data.mem_tel}</td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td>${data.mem_email}</td>
                    <th>비밀번호</th>
                    <td class="editable" data-field="mem_pw">${data.mem_pw}</td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td class="editable" data-field="mem_name">${data.mem_name}</td>
                    <th>성별</th>
                    <td class="editable" data-field="mem_gender">${data.mem_gender}</td>
                    <th>생년월일</th>
                    <td class="editable" data-field="mem_birth">${data.mem_birth}</td>
                </tr>
                <tr>
                    <th>sns로그인 유무</th>
                    <td>${data.mem_sns}</td>
                    <th>가입시간</th>
                    <td>${data.mem_input}</td>
                </tr>
                <tr>
                    <th>탈퇴여부</th>
                    <td id="statusField">${data.mem_status}</td>
                    <th>탈퇴유예시작시간</th>
                    <td id="respiteField">${data.mem_respite}</td>
                    <th>자동탈퇴시간</th>
                    <td id="outField">${data.mem_out}</td>
                </tr>
	            `);
	            
	            // 더블 클릭 이벤트 핸들러
		        $('.editable').dblclick(function() {
		            const currentCell = $(this);
		            const currentValue = currentCell.text();
		            const fieldName = currentCell.data('field');
		
		            // 입력 필드로 변경
		            currentCell.html(`<input type="text" value="${currentValue}" class="edit-input" data-field="${fieldName}" />`);
		            const inputField = currentCell.find('.edit-input');
		
		            // 입력 필드에 포커스
		            inputField.focus();
		            
		            // 저장 버튼 클릭 이벤트
				    $('#saveButton').off('click').on('click', function() {
				        const updates = {}; // 수정할 값들을 담을 객체
				        
				        // 각 입력 필드를 찾아서 값을 수집
				        $('.edit-input').each(function() {
				            const field = $(this).data('field'); // 필드 이름
				            const value = $(this).val(); // 입력된 값
				            updates[field] = value; // 업데이트 객체에 추가
				        });
			            //ajax 요청
			            $.ajax({
			            type: 'PUT', // 수정하는 경우 PUT 메서드를 사용
			            url: `/admin/members/${memNo}`, // 수정 API 엔드포인트
			            contentType: 'application/json', // JSON 형식으로 설정
			            data: JSON.stringify(updates), // updates 객체를 JSON 문자열로 변환
			            success: function(response) {
			                alert('수정이 완료되었습니다.');
			                // 각 셀의 텍스트 업데이트
			                $.each(updates, function(field, value) {
			                    $(`.editable[data-field="${field}"]`).text(value);
			                });
			            },
			            error: function(error) {
			                console.error('Error saving changes:', error);
			                alert('수정하는 데 실패했습니다.');
			            }
			        });
				        
				        
				        
				    });
		
		        });
          
	            },
	            error: function(error) {
	                console.error('Error fetching member details:', error);
	                alert('회원 정보를 가져오는 데 실패했습니다.');
	            }
	        });
	        
	$('#deleteButton').click(function(){
		const currentStatus = $('#statusField').text(); // 현재 상태 값을 가져옴 (예: T 또는 F)
		const newStatus = currentStatus === 'F' ? 'T' : 'F';
	    
	    const url = currentStatus === 'F' ? '/admin/members/delete' : '/admin/members/status';
		
		// 현재 시간 가져오기
		const currentTime = new Date(); // Date 객체 생성
		const currentTimeISO = currentTime.toISOString(); // ISO 형식으로 변환
	    
	    // 6개월 뒤 날짜 계산
	    const futureDate = new Date(currentTime);
	    futureDate.setMonth(currentTime.getMonth() + 6); // 현재 월에 6개월 추가
	    const futureDateISO = futureDate.toISOString(); // ISO 형식으로 변환
    	
    	// 공통으로 사용할 mem_no
    	const data = {
	        mem_no: memNo,
	        mem_status: newStatus, // 변경할 상태
	        mem_respite: currentStatus === 'F' ? new Date().toISOString() : null, // 현재 시간
	        mem_out: currentStatus === 'F' ? new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString() : null // 6개월 뒤
	    };
	    
	    // Ajax 요청으로 서버에 데이터 전송
	    $.ajax({
			url: url, // 현재 상태에 따라 URL 선택
	        type: 'PUT',
	        contentType: 'application/json',
	        data: JSON.stringify(data),
	        success: function(response) {
	            alert('처리가 완료되었습니다.'); // 성공 시 메시지
	            // 상태 셀 업데이트
	            $('#member-info').find('#statusField').text(data.mem_status); 
	            $('#member-info').find('#respiteField').text(data.mem_respite); 
	            $('#member-info').find('#outField').text(data.mem_out); 
	        },
	        error: function(xhr, status, error) {
	            // 오류 처리
	            console.error('처리 실패:', error);
	            alert('처리에 실패했습니다.');
	        }
	    });
	});       
	
});