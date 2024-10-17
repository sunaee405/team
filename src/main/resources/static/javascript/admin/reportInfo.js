$(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const repNo = urlParams.get('REP_NO');
	
	const listItems = [];
	
	const ResultList = [];
	const SectionList = [];
	const StatusList = [];
	
	// 로컬 스토리지에서 데이터 읽기
    detailList = JSON.parse(localStorage.getItem('detailList'));
    
    //처리결과
    for(let i = 0; i < detailList.length; i++){
		if(detailList[i].subCode.ID === 12){
			ResultList.push({
        	text: `${detailList[i].DCO_ID}(${detailList[i].DCO_VALUE})`, // 표시할 텍스트
        	value: detailList[i].DCO_ID // 실제 값
    		});
		}
	}
	
	// ResultList를 셀렉트 박스의 옵션 형식으로 변환
	selectedResult = ResultList.map(item => ({
	    text: item.text,  // 표시할 텍스트
	    value: item.value  // 실제 값
	}));
	
	//신고 섹션
	for(let i = 0; i < detailList.length; i++){
		if(detailList[i].subCode.ID == 8){
			SectionList.push({
        	text: `${detailList[i].DCO_ID}(${detailList[i].DCO_VALUE})`, // 표시할 텍스트
        	value: detailList[i].DCO_ID // 실제 값
    		});
		}
	}
	// SectionList를 셀렉트 박스의 옵션 형식으로 변환
	selectedSection = SectionList.map(item => ({
	    text: item.text,  // 표시할 텍스트
	    value: item.value  // 실제 값
	}));
	
	//처리상태
	for(let i = 0; i < detailList.length; i++){
		if(detailList[i].subCode.ID == 11){
			StatusList.push({
        	text: `${detailList[i].DCO_ID}(${detailList[i].DCO_VALUE})`, // 표시할 텍스트
        	value: detailList[i].DCO_ID // 실제 값
    		});
		}
	}
	
	// StatusList를 셀렉트 박스의 옵션 형식으로 변환
	selectStatus = StatusList.map(item => ({
	    text: item.text,  // 표시할 텍스트
	    value: item.value  // 실제 값
	}));	
	
	$.ajax({
            type: 'GET',
            url: `/admin/report/${repNo}`, // 상세 정보 API 엔드포인트
            success: function(data) {
				// 데이터에서 섹션 옵션을 가져오는 예시
				// 셀렉트 박스 HTML 생성
//				const selectHTML = `
//				    <select class="editable" data-field="REP_RESULT">
//				        ${ResultList.map(option => `
//				            <option value="${option.value}">${option.text}</option>
//				        `).join('')}
//				    </select>
//				`;
				
                // 데이터가 성공적으로 반환되면 테이블에 추가
	            $('#report-info').html(`
	            <tr>
                    <th>번호</th>
                    <td>${data.REP_NO}</td>
                </tr>
                <tr>
                    <th>*회원 번호(클릭시 회원정보로 이동)</th>
                    <td class="clickable" data-url="/admin/member/info?mem_no=${data.memberNo.mem_no}">${data.memberNo.mem_no}</td>
                </tr>
                <tr>
                    <th>*상품 번호(클릭시 상품정보로 이동)</th>
                    <td class="clickable" data-url="/admin/product/info?pro_no=${data.productNo.pro_no}">${data.productNo.pro_no}</td>
                </tr>
                <tr>
                    <th>신고날자</th>
                    <td data-field="REP_DATE">${data.REP_DATE}</td>
                </tr>
                <tr>
                    <th>신고구분(*)</th>
                    <td class="editable" data-field="REP_SECTION">${data.sectionDetail.DCO_ID}(${data.sectionDetail.DCO_VALUE})</td>
                </tr>
                    <th>처리상태</th>
                    <td id="statusField" data-field="REP_STATUS">${data.statusDetail.DCO_ID}(${data.statusDetail.DCO_VALUE})</td>
                </tr>
                <tr>
                    <th>처리결과(*)</th>
                    <td id="resultField" class="editable" data-field="REP_RESULT">${data.resultDetail.DCO_ID}(${data.resultDetail.DCO_VALUE})</td>
                </tr>
                <tr>
                	<th>신고내용</th>
                	<td class="editable" data-field="REP_CONTENT"><span id="contentDisplay">${data.REP_CONTENT}</span></td>
                </tr>
	            `);
	            
	            
	            $(document).on('click', '.clickable', function() {
				    const url = $(this).data('url'); // data-url에서 URL 가져오기
				    if (url) {
				        window.location.href = url; // 해당 URL로 이동
				    }
				});
	            
	            
	            // 더블 클릭 이벤트 핸들러
		        $('.editable').dblclick(function() {
		            const currentCell = $(this);
		            const currentValue = currentCell.text();
		            const fieldName = currentCell.data('field');
		
		            // REP_CONTENT 필드인 경우에만 텍스트 영역으로 변경
				    if (fieldName === 'REP_CONTENT') {
				        // 입력 필드로 변경 (텍스트 영역으로)
				        //currentCell.html(`<textarea class="edit-input" data-field="${fieldName}" style="width: 100%; height: 100px; resize: none;">${currentValue}</textarea>`);
				    } else if (fieldName === 'REP_RESULT') {
				        // 셀렉트 박스 HTML 생성
				        const resultHTML = `
				            <select class="edit-input" data-field="${fieldName}" style="width: 100%;">
				                ${ResultList.map(option => `
				                    <option value="${option.value}" ${option.value === currentValue ? 'selected' : ''}>
				                        ${option.text}
				                    </option>
				                `).join('')}
				            </select>
				        `;
				        currentCell.html(resultHTML); // 셀렉트 박스로 변경
				    } else if(fieldName === 'REP_SECTION') {
						// 셀렉트 박스 HTML 생성
				        const selectHTML = `
				            <select class="edit-input" data-field="${fieldName}" style="width: 100%;">
				                ${SectionList.map(option => `
				                    <option value="${option.value}" ${option.value === currentValue ? 'selected' : ''}>
				                        ${option.text}
				                    </option>
				                `).join('')}
				            </select>
				        `;
				        currentCell.html(selectHTML); // 셀렉트 박스로 변경
				    }
				
				    const inputField = currentCell.find('.edit-input');
		
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
				                fetchReportDetails(repNo);
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

function fetchReportDetails(repNo) {
    $.ajax({
        type: 'GET',
        url: `/admin/report/${repNo}`,
        success: function(data) {
            $('#report-info').html(`
                <tr>
                    <th>번호</th>
                    <td>${data.REP_NO}</td>
                </tr>
                <tr>
                    <th>*회원 번호(클릭시 회원정보로 이동)</th>
                    <td class="clickable" data-url="/admin/member/info?mem_no=${data.memberNo.mem_no}">${data.memberNo.mem_no}</td>
                </tr>
                <tr>
                    <th>*상품 번호(클릭시 상품정보로 이동)</th>
                    <td class="clickable" data-url="/admin/product/info?pro_no=${data.productNo.pro_no}">${data.productNo.pro_no}</td>
                </tr>
                <tr>
                    <th>신고날자</th>
                    <td data-field="REP_DATE">${data.REP_DATE}</td>
                </tr>
                <tr>
                    <th>신고구분(*)</th>
                    <td class="editable" data-field="REP_SECTION">${data.sectionDetail.DCO_ID}(${data.sectionDetail.DCO_VALUE})</td>
                </tr>
                <tr>
                    <th>처리상태</th>
                    <td id="statusField" data-field="REP_STATUS">${data.statusDetail.DCO_ID}(${data.statusDetail.DCO_VALUE})</td>
                </tr>
                <tr>
                    <th>처리결과(*)</th>
                    <td id="resultField" class="editable" data-field="REP_RESULT">${data.resultDetail.DCO_ID}(${data.resultDetail.DCO_VALUE})</td>
                </tr>
                <tr>
                    <th>신고내용</th>
                    <td class="editable" data-field="REP_CONTENT"><span id="contentDisplay">${data.REP_CONTENT}</span></td>
                </tr>
            `);

            // 클릭 이벤트 핸들러
            $(document).on('click', '.clickable', function() {
                const url = $(this).data('url');
                if (url) {
                    window.location.href = url;
                }
            });
        },
        error: function(error) {
            console.error('Error fetching report details:', error);
            alert('신고 정보를 가져오는 데 실패했습니다.');
        }
    });
}