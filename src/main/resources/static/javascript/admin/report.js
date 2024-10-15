$(document).ready(function() {
	let initialData = [];
	
	let selectedResult = [];
	let selectedSection = [];
	let selectStatus = [];
	let detailList = [];
	
	
	// 초기 데이터 가져오기 (페이지 로드 시)
	fetchData();
	// 텍스트 수정기능
	class CustomTextEditor {
	      constructor(props) {
	        const el = document.createElement('input');
	        const { maxLength } = props.columnInfo.editor.options;

	        el.type = 'text';
	        el.maxLength = maxLength;
	        el.value = String(props.value);
			
			if (props.value !== ''){
				// el.disabled = props.columnInfo.editor.options.disabled;	
			}
			
	        this.el = el;
	      }

	      getElement() {
	        return this.el;
	      }

	      getValue() {
	        return this.el.value;
	      }

	      mounted() {
	        this.el.select();
	      }
    }

    const grid = new tui.Grid({
      el: document.getElementById('grid'),
      scrollX: false,
      bodyHeight: 500,
//      scrollY: false,
      rowHeaders: ['checkbox'],
      columns: [
   	  	{
   	        header: 'REP_NO', // 숨길 NO
   	        name: 'REP_NO',
   	        hidden: true  // 숨기기 설정
   	    },
   	    {
          header: '처리상태',
          name: 'REP_STATUS',
          validation: { required: true },//노란색
          filter: 'select',
//          formatter: 'listItemText',
//          editor: {
//            type: 'select',
//            options: {
//              listItems: selectStatus, //동적으로 설정
//            }
//          }
        },
        {
          header: '신고분류',
          name: 'REP_SECTION',
          filter: 'select',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: selectedSection, //동적으로 설정
            }
          }
        },
   	    {
   	        header: '회원아이디',
   	        name: 'MEM_NO',
   	        hidden: true  // 숨기기 설정
   	    },
   	    {
   	        header: '상품번호',
   	        name: 'PRO_NO',
   	        hidden: true  // 숨기기 설정
   	    },
        {
          header: '신고내용',
          name: 'REP_CONTENT',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
            type: CustomTextEditor,//사용자 정의 편집기
            options: {
			  maxLength: 5000, //글자수 제한
//              disabled: true
            }
          }
        },
        {
          header: '접수 날자',
          name: 'REP_DATE',
          sortable: true,
          rowSpan: true
        },
        {
          header: '처리결과',
          name: 'REP_RESULT',
          filter: 'select',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: selectedResult, //동적으로 설정
            }
          }
        },
      ]
    });
    
	// 그리드 이벤트 핸들러
    grid.on('beforeChange', ev => {
    	console.log('before change:', ev);
    });
    
    grid.on('afterChange', ev => {
    	console.log('after change:', ev);
    })
    
    
    // 클릭 이벤트 핸들러
	grid.on('click', (ev) => {
		
	    const { rowKey, columnName } = ev;
	    const repNo = grid.getValue(rowKey, 'REP_NO');
	    if (columnName === 'REP_STATUS' && ev.targetType !== 'columnHeader' && repNo !== null) {
	        window.location.href = `info?REP_NO=${repNo}`;
	    }
	    
	    if (columnName === 'REP_CONTENT' && ev.targetType !== 'columnHeader') { // 수정할 열
        const currentContent = grid.getValue(rowKey, 'REP_CONTENT');
        document.getElementById('editTextArea').value = currentContent; // 현재 내용을 텍스트 영역에 표시
        document.getElementById('editTextArea').readOnly = true; // 읽기 전용으로 설정
        
        // 모달과 오버레이 표시
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
        
        // 닫기 버튼 클릭 이벤트
        document.getElementById('cancelEditButton').onclick = closeModal;
    	}
	    
	    
	});
	
	// 체크된 행 삭제 버튼 클릭 이벤트 처리
	$('#deleteButton').click(function() {
	    const checkedRows = grid.getCheckedRowKeys(); // 체크된 행의 인덱스 가져오기
	    const currentData = grid.getData(); //전체 데이터
	    
	    //전체데이터 중에 체크된 아이디가 null인 행
	    const checkedRowsData = currentData.filter((row, index) =>  checkedRows.includes(index));
	    
	    //전체데이터 중에 체크된 아이디가 null이 아닌 행(DB삭제)
	    const dbData = checkedRowsData.filter((row, index) => row.REP_NO !== null);
	    const filteredIds = dbData.map(row => row.REP_NO);
	    // ID 가 있는 배열 (DB)
	    // 필터링된 ID를 저장할 배열
	    if (checkedRows.length === 0) {
	        alert('삭제할 행을 선택해 주세요.');
	        return;
	    }
	    
	
	    // 확인 대화상자
	    if (confirm('선택한 ' + checkedRows.length + '개의 행을 삭제하시겠습니까?')) {
	        // AJAX 요청으로 서버에 DELETE
	        $.ajax({
	            type: 'DELETE',
	            url: '/admin/report/delete', // 삭제 요청을 보낼 API 엔드포인트
	            contentType: 'application/json',
	            data: JSON.stringify(filteredIds), // 체크된 행의 ID 배열 전송
	            success: function(response) {
	                console.log('삭제 성공:', response);
	                alert('삭제 완료!' + filteredIds.length + '개의 행이 삭제되었습니다.');
	                // 삭제 후, 데이터 다시 가져오기
                	fetchData(); // 데이터 가져오는 함수 호출
	                

	            },
	            error: function(xhr, status, error) {
	                console.error('삭제 오류:', error);
	                alert('삭제 실패! 오류: ' + error);
	            }
	        });
	    }
	});
	

    
  	// 저장 버튼 클릭 이벤트 처리
    $('#saveButton').click(function() {
        const currentData = grid.getData();
        let newStatus;
        
        
		// 수정된 데이터 필터링
	    const updatedData = currentData.filter((row, index) => {
			// 인덱스가 초기 데이터 길이 내에 있는지 확인
		    if (index < initialData.length) {
		        const initialRow = initialData[index];
		        // 필드 비교하여 변경된 경우만 필터링
		        return (
		            row.REP_NO !== null && // 업데이트할 데이터 확인
		            (row.REP_RESULT !== initialRow.REP_RESULT)
		        );
		    }
	    	return false; // 유효하지 않은 인덱스인 경우 false 반환
	    });
	    
	    const updateList = updatedData.map(row => ({
			REP_NO: row.REP_NO,
		    resultDetail : { ID: row.REP_RESULT },
		    sectionDetail: { ID: row.REP_SECTION },
		    statusDetail : { ID: row.REP_STATUS }
		}));
	    
	    // 새로운 상태를 결정하기 위한 반복문
		updatedData.forEach((row, index) => {
		    // 승인완료, 미승인 일때에는 처리완료, 승인대기일때는 처리전으로 결과 바꿈 
		    if (row.REP_RESULT === selectedResult[0].value || row.REP_RESULT === selectedResult[1].value) {
		        newStatus = selectStatus[1].value; // 처리완료
		    } else if (row.REP_RESULT === selectedResult[2].value) {
		        newStatus = selectStatus[0].value; // 처리전
		    }
		    
	        for(let i = 0; i < detailList.length; i++){
				if(newStatus === detailList[i].DCO_ID){
				updateList[index].statusDetail = { ID: detailList[i].ID };
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
	        }
		    
		});

		const newData = currentData.filter((row, index) => row.REP_NO === null);
        
		
		// 수정할 데이터에 대한 중복 체크
	    for (let i = 0; i < updatedData.length; i++) {
	        const row = updatedData[i];
	        for(let j = 0; j < detailList.length; j++){
				if(updatedData[i].REP_RESULT === detailList[j].DCO_ID){
				updateList[i].resultDetail.ID = detailList[j].ID;
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
			}
	    }
	    
	    // 수정할 데이터에 대한 중복 체크
	    for (let i = 0; i < updatedData.length; i++) {
	        const row = updatedData[i];
	        for(let j = 0; j < detailList.length; j++){
				if(updatedData[i].REP_SECTION === detailList[j].DCO_ID){
				updateList[i].sectionDetail.ID = detailList[j].ID;
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
			}
	    }
        // AJAX 요청으로 서버에 업데이트
	    $.ajax({
			
	        type: 'PUT',
	        url: '/admin/report/update', // 데이터 업데이트를 위한 API 엔드포인트
	        contentType: 'application/json',
	        data: JSON.stringify(updateList), // 수정된 데이터 전송
	
	        success: function(response) {
	            console.log('업데이트 성공:', response);
	            alert('업데이트 성공!');
	        },
	        error: function(error) {
	            console.error('업데이트 오류:', error);
	            alert('업데이트 실패! 오류: ' + error);
	        }
	     });
	     
    });
    
    
    //------함수
    
    	// 모달 닫기 함수
	function closeModal() {
	    document.getElementById('editModal').style.display = 'none';
	    document.getElementById('modalOverlay').style.display = 'none';
	}
    
    // DB에서 데이터 가져와서 화면에 뿌리기
	function fetchData() {
		
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
	        url: '/admin/report/list', // 데이터 가져올 API 엔드포인트
	        success: function(response) {
				console.log('서버 응답:', response); // 여기서 응답 데이터 출력
				initialData = response; // 초기 데이터 저장(데이터 수정시 비교)
	            // 데이터를 그리드에 뿌리기
	            grid.resetData(response.map(item => ({
	                REP_NO: item.REP_NO,           
	                MEM_NO: item.memberNo.mem_id,
	                PRO_NO: item.productNo.pro_no,
	                REP_CONTENT: item.REP_CONTENT, 
	                REP_RESULT: item.resultDetail.DCO_ID,
	                REP_SECTION: item.sectionDetail.DCO_ID,
	                REP_STATUS: `${item.statusDetail.DCO_ID}(${item.statusDetail.DCO_VALUE})`,
	                REP_DATE: item.REP_DATE,
	            })));
	        },
	        error: function(error) {
	            console.error('Error fetching data:', error);
	            alert('데이터를 가져오는 데 실패했습니다.'); // 사용자에게 에러 메시지 알림
	        }
	    });
	}

   
});


