$(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const inqNo = urlParams.get('INQ_NO');
	
	const listItems = [];
	
	const ResultList = [];
	const SectionList = [];
	const StatusList = [];

   	
	
	$.ajax({
            type: 'GET',
            url: `/admin/inquiry/${inqNo}`, // 상세 정보 API 엔드포인트
            success: function(data) {
                // 데이터가 성공적으로 반환되면 테이블에 추가
	            $('#inquiry-info').html(`
		            <tr>
	                    <th>번호</th>
	                    <td>${data.INQ_NO}</td>
	                </tr>
	                <tr>
	                    <th>*회원번호(클릭시 회원정보로 이동)</th>
	                    <td class="clickable" data-url="/admin/member/info?mem_no=${data.MEM_NO}">${data.MEM_NO}</td>
	                </tr>
	                <tr>
	                    <th>문의제목</th>
	                    <td data-field="INQ_TITLE">${data.INQ_TITLE}</td>
	                </tr>
	                <tr>
	                	<th>문의내용</th>
	                	<td class="editable" data-field="INQ_CONTENT"><span id="contentDisplay">${data.INQ_CONTENT}</span></td>
	                </tr>
	                <tr>
	                    <th>처리구분</th>
	                    <td data-field="RESULT">${data.RESULT}</td>
	                </tr>
	                <tr>
	                    <th>문의날자</th>
	                    <td data-field="INQ_DATE">${data.INQ_DATE}</td>
	            `);
	            
	            $('#answer-info').html(`
		            <tr>
		                <th>답변날자</th>
		                <td data-field="ANS_DATE">${data.ANS_DATE}</td>
		            </tr>
		            <tr>
		                <th>답변내용(*)</th>
		                <td id="resultField" class="editable" data-field="ANS_CONTENT">${data.ANS_CONTENT}</td>
		            </tr>
		        `);
	            
	            
	            $(document).on('click', '.clickable', function() {
				    const url = $(this).data('url'); // data-url에서 URL 가져오기
				    if (url) {
				        window.location.href = url; // 해당 URL로 이동
				    }
				});
	            
	            
	            // 더블 클릭 이벤트 핸들러
		        $(document).on('dblclick', '.editable', function() {
					debugger;
		            const currentCell = $(this);
		            const currentValue = currentCell.text();
		            const fieldName = currentCell.data('field');
		
		            //텍스트 영역으로 변경
				    if (fieldName === 'ANS_CONTENT') {
				        // 입력 필드로 변경 (텍스트 영역으로)
				        currentCell.html(`<textarea class="edit-input" data-field="${fieldName}" style="width: 100%; height: 100px; resize: none;">${currentValue}</textarea>`);
				    } 
				
				    //const inputField = currentCell.find('.edit-input');
		
		            // 입력 필드에 포커스
		            inputField.focus();
		            
		            // 저장 버튼 클릭 이벤트
				    $('#saveButton').off('click').on('click', function() {
						const updates = {};
						
						let newStatus;
					    
				        // 각 입력 필드를 찾아서 값을 수집
				        $('.edit-input').each(function() {
				            const field = $(this).data('field'); // 필드 이름
				            const value = $(this).val(); // 입력된 값
					        updates[field] = value; 
				        	detailList;
				        	
					        // 섹션 필드, 처리결과 필드일 경우 ID를 설정
					        if (field === 'REP_SECTION') {
					            for(let i = 0; i < detailList.length; i++){
									if(value === detailList[i].DCO_ID){
										updates.sectionDetail = {ID: detailList[i].ID}
						    			break;
									}
								}
					        }
					        if(field === 'REP_RESULT') {
								
								//승인완료, 미승인 일때에는 처리완료/ 승인대기일때는 처리전으로 결과 바꿈 
							    if (value === ResultList[0].value || value === ResultList[1].value) {
								    newStatus = StatusList[1].value; 
								} else if (value === ResultList[2].value) {
								    newStatus = StatusList[0].value;
								}
							    
						        //상태변경(처리전/처리완료)
						        for(let i = 0; i < detailList.length; i++){
									if(newStatus === detailList[i].DCO_ID){
										updates.statusDetail = {ID: detailList[i].ID}
						    			break;
									}
								}
								
								
								//처리결과
								for(let i = 0; i < detailList.length; i++){
									if(value === detailList[i].DCO_ID){
										updates.resultDetail = {ID: detailList[i].ID}
						    			break;
									}
								}
							}
				    	});
				            //ajax 요청
				            $.ajax({
				            type: 'PUT', // 수정하는 경우 PUT 메서드를 사용
				            url: `/admin/report/${repNo}`, // 수정 API 엔드포인트
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
	    // Ajax 요청으로 서버에 데이터 전송
	    $.ajax({
			url: `/admin/report/${repNo}`, // 현재 상태에 따라 URL 선택
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