$(function() {
	const urlParams = new URLSearchParams(window.location.search);
	const newsNo = urlParams.get('NEW_NO');
	
	const listItems = [];// DCO_ID를 저장할 배열 초기화
	// 로컬 스토리지에서 데이터 읽기
    let detailList = JSON.parse(localStorage.getItem('detailList'));
    for(let i = 0; i < detailList.length; i++){
		if(detailList[i].subCode.ID == 9){
			listItems.push({
        	text: `${detailList[i].DCO_ID}(${detailList[i].DCO_VALUE})`, // 표시할 텍스트
        	value: detailList[i].DCO_ID // 실제 값
    		});
		}
		
	}
		
		// listItems를 셀렉트 박스의 옵션 형식으로 변환
		selectOptions = listItems.map(item => ({
		    text: item.text,  // 표시할 텍스트
		    value: item.value  // 실제 값
		}));
	
	
	$.ajax({
            type: 'GET',
            url: `/admin/news/${newsNo}`, // 상세 정보 API 엔드포인트
            success: function(data) {
				// 데이터에서 섹션 옵션을 가져오는 예시
				// 셀렉트 박스 HTML 생성
				const selectHTML = `
				    <select class="editable" data-field="NEW_SECTION">
				        ${selectOptions.map(option => `
				            <option value="${option.value}">${option.text}</option>
				        `).join('')}
				    </select>
				`;
				
				
                // 데이터가 성공적으로 반환되면 테이블에 추가
	            $('#news-info').html(`
	            <tr>
                    <th>*번호</th>
                    <td>${data.NEW_NO}</td>
                </tr>
                <tr>
                    <th>섹션</th>
                    <td class="editable" data-field="NEW_SECTION">${data.detailCode.DCO_ID}(${data.detailCode.DCO_VALUE})</td>
                </tr>
                    <th>제목</th>
                    <td class="editable" data-field="NEW_NAME">${data.NEW_NAME}</td>
                </tr>
                <tr>
                    <th>*시간</th>
                    <td data-field="NEW_DATE">${data.NEW_DATE}</td>
                </tr>
                <tr>
                	<th>내용</th>
                	<td class="editable" data-field="NEW_CONTENT"><span id="contentDisplay">${data.NEW_CONTENT}</span></td>
                </tr>
	            `);
	            
	            // 더블 클릭 이벤트 핸들러
		        $('.editable').dblclick(function() {
		            const currentCell = $(this);
		            const currentValue = currentCell.text();
		            const fieldName = currentCell.data('field');
		
		            // NEW_CONTENT 필드인 경우에만 텍스트 영역으로 변경
				    if (fieldName === 'NEW_CONTENT') {
				        // 입력 필드로 변경 (텍스트 영역으로)
				        currentCell.html(`<textarea class="edit-input" data-field="${fieldName}" style="width: 100%; height: 100px; resize: none;">${currentValue}</textarea>`);
				    } else if (fieldName === 'NEW_SECTION') {
				        // 셀렉트 박스 HTML 생성
				        const selectHTML = `
				            <select class="edit-input" data-field="${fieldName}" style="width: 100%;">
				                ${selectOptions.map(option => `
				                    <option value="${option.value}" ${option.value === currentValue ? 'selected' : ''}>
				                        ${option.text}
				                    </option>
				                `).join('')}
				            </select>
				        `;
				        currentCell.html(selectHTML); // 셀렉트 박스로 변경
				    } else {
				        // 나머지 필드는 일반 입력 필드로 변경
				        currentCell.html(`<input type="text" value="${currentValue}" class="edit-input" data-field="${fieldName}" />`);
				    }
				
				    const inputField = currentCell.find('.edit-input');
		
		            // 입력 필드에 포커스
		            inputField.focus();
		            
		            // 저장 버튼 클릭 이벤트
				    $('#saveButton').off('click').on('click', function() {
				        const updates = {
							NEW_DATE: null
						}; // 수정할 값들을 담을 객체
				        // 각 입력 필드를 찾아서 값을 수집
				        $('.edit-input').each(function() {
				            const field = $(this).data('field'); // 필드 이름
				            const value = $(this).val(); // 입력된 값
					        updates[field] = value; 
				        	detailList;
					        // 섹션 필드일 경우 ID를 설정
					        if (field === 'NEW_SECTION') {
					            
					            for(let i = 0; i < detailList.length; i++){
									if(value === detailList[i].DCO_ID){
										updates.detailCode = {ID: detailList[i].ID}
						    			break;
									}
								}
					        }
				    	});
			            //ajax 요청
			            $.ajax({
			            type: 'PUT', // 수정하는 경우 PUT 메서드를 사용
			            url: `/admin/news/${newsNo}`, // 수정 API 엔드포인트
			            contentType: 'application/json', // JSON 형식으로 설정
			            data: JSON.stringify(updates), // updates 객체를 JSON 문자열로 변환
			            success: function(response) {
			                alert('수정이 완료되었습니다.');
			                // 각 셀의 텍스트 업데이트
			                $.each(updates, function(field, value) {
			                    $(`.editable[data-field="${field}"]`).text(value);
			                });
			                // NEW_DATE를 업데이트
			                const newDateValue = response.NEW_DATE; // 서버에서 반환된 NEW_DATE 값
						    $('td[data-field="NEW_DATE"]').text(newDateValue); // 시간 셀 업데이트

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
			url: `/admin/news/${newsNo}`, // 현재 상태에 따라 URL 선택
	        type: 'DELETE',
	        contentType: 'application/json',
//	        data: JSON.stringify(data),
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