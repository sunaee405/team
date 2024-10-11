$(document).ready(function() {
	let initialData = [];
	let selectOptions = [];
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
				el.disabled = props.columnInfo.editor.options.disabled;	
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
   	        header: 'NEW_NO', // 숨길 NO
   	        name: 'NEW_NO',
   	        hidden: true  // 숨기기 설정
   	    },
        {
          header: '섹션',
          name: 'NEW_SECTION',
          filter: 'select',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: selectOptions, //동적으로 설정
            }
          }
        },
        {
          header: '제목',
          name: 'NEW_NAME',
          validation: { required: true },//노란색
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
            type: CustomTextEditor,//사용자 정의 편집기
            options: {
			  maxLength: 100, //글자수 제한
              //disabled: true
            }
          }
        },
        {
          header: '내용',
          name: 'NEW_CONTENT',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
//            type: CustomTextEditor,//사용자 정의 편집기
//            options: {
//              maxLength: 5000, //글자수 제한
//              //disabled: true
//            }
          }
        },
        
        {
          header: '날자',
          name: 'NEW_DATE',
          sortable: true,
          rowSpan: true
        },
      ]
    });
    
    // 행 추가 버튼 클릭 이벤트 처리
    $('#addRowButton').click(function() {
        const currentData = grid.getData();
        // 새 행 추가
        grid.appendRow({ NEW_NO: null, NEW_SECTION: '', NEW_NAME: '', NEW_CONTENT: '', NEW_DATE: null });
        // 편집 모드로 전환    
        requestAnimationFrame(() => {
            const indexToEdit = grid.getData().length - 1;
            grid.setEditing(indexToEdit, 'NEW_SECTION');
        });
    });
    
    // 체크된 행 삭제 버튼 클릭 이벤트 처리
	$('#deleteButton').click(function() {
	    const checkedRows = grid.getCheckedRowKeys(); // 체크된 행의 인덱스 가져오기
	    const currentData = grid.getData(); //전체 데이터
	    
	    //전체데이터 중에 체크된 아이디가 null인 행
	    const checkedRowsData = currentData.filter((row, index) =>  checkedRows.includes(index));
		// const viewData = checkedRowsData.filter((row, index) => row.ID === null && checkedRows.includes(index));	    
	    
	    //전체데이터 중에 체크된 아이디가 null이 아닌 행(DB삭제)
	    const dbData = checkedRowsData.filter((row, index) => row.NEW_NO !== null);
	    const filteredIds = dbData.map(row => row.NEW_NO);
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
	            url: '/admin/news/delete', // 삭제 요청을 보낼 API 엔드포인트
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
	    const newsNo = grid.getValue(rowKey, 'NEW_NO');
	    if (columnName === 'NEW_NAME' && ev.targetType !== 'columnHeader' && newsNo !== null) { // NEW_NAME 열이 클릭된 경우
	        //const newsNo = grid.getValue(rowKey, 'NEW_NUM');
	        window.location.href = `info?NEW_NO=${newsNo}`;
	    }
	    
	    if (columnName === 'NEW_CONTENT' && ev.targetType !== 'columnHeader') { // 수정할 열
        const currentContent = grid.getValue(rowKey, 'NEW_CONTENT');
        document.getElementById('editTextArea').value = currentContent; // 현재 내용을 텍스트 영역에 표시
        
        // 모달과 오버레이 표시
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
        
        // 저장 버튼 클릭 이벤트
        document.getElementById('saveEditButton').onclick = function() {
            const newContent = document.getElementById('editTextArea').value;
            grid.setValue(rowKey, 'NEW_CONTENT', newContent); // 그리드에 수정된 내용 반영
            
            // 모달 닫기
            closeModal();
        };
        
        // 취소 버튼 클릭 이벤트
        document.getElementById('cancelEditButton').onclick = closeModal;
    }
	    
	    
	});
	

    
  	// 저장 버튼 클릭 이벤트 처리
    $('#saveButton').click(function() {
        const currentData = grid.getData();
		
		// 수정된 데이터 필터링
    const updatedData = currentData.filter((row, index) => {
		// 인덱스가 초기 데이터 길이 내에 있는지 확인
	    if (index < initialData.length) {
	        const initialRow = initialData[index];
	        // 필드 비교하여 변경된 경우만 필터링
	        return (
	            row.NEW_NO !== null && // 업데이트할 데이터 확인
	            (row.NEW_NAME !== initialRow.NEW_NAME || 
	             row.NEW_CONTENT !== initialRow.NEW_CONTENT || 
	             row.NEW_SECTION !== initialRow.detailCode.DCO_ID)
	        );
	    }
    return false; // 유효하지 않은 인덱스인 경우 false 반환
    });//////
    
		//아이디가 null이 아니면 update
		//const updatedData = currentData.filter((row, index) => row.NEW_NO !== null);
		//아이디가 null인것은 저장
		const newData = currentData.filter((row, index) => row.NEW_NO === null);
		
		const dataToInsert = newData.map(row => ({
			NEW_NO: null,
		    NEW_NAME: row.NEW_NAME,
		    NEW_CONTENT: row.NEW_CONTENT,
		    NEW_DATE: null,
		    detailCode: { ID: row.NEW_SECTION }
		}));
		
		// 필드 체크
		for (let i = 0; i < newData.length; i++) {
	        const row = newData[i];
	        if (row.NEW_SECTION === '' || row.NEW_NAME === '' || row.NEW_CONTENT === '') {
	            alert('모든 필드를 채워야 저장할 수 있습니다. 비어 있는 행이 있습니다.');
	            return;
	        }
	        for(let j = 0; j < detailList.length; j++){
				if(newData[i].NEW_SECTION === detailList[j].DCO_ID){
				dataToInsert[i].detailCode.ID = detailList[j].ID;
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
			}
	        
	    }
	    
		
        // AJAX 요청으로 서버에 INSERT
        $.ajax({
            type: 'POST',
            url: '/admin/news/insert',
            contentType: 'application/json',
            data: JSON.stringify(dataToInsert),
            success: function(response) {
                console.log('INSERT 성공:', response);
                alert('INSERT 성공!');
                fetchData(); // 데이터를 다시 가져오는 함수 호출
            },
            error: function(error) {
                console.error('INSERT 오류:', error);
                alert('INSERT 실패! 오류: ' + error);
            }
        });
        
        const updateList = updatedData.map(row => ({
			NEW_NO: row.NEW_NO,
		    NEW_NAME: row.NEW_NAME,
		    NEW_CONTENT: row.NEW_CONTENT,
		    NEW_DATE: null,
		    detailCode: { ID: row.NEW_SECTION }
		}));
		
		// 수정할 데이터에 대한 중복 체크
	    for (let i = 0; i < updatedData.length; i++) {
	        const row = updatedData[i];
	        if (row.NEW_SECTION === '' || row.NEW_NAME === '' || row.NEW_CONTENT === '') {
	            alert('모든 필드를 채워야 저장할 수 있습니다. 비어 있는 행이 있습니다.');
	            return;
	        }for(let j = 0; j < detailList.length; j++){
				if(updatedData[i].NEW_SECTION === detailList[j].DCO_ID){
				updateList[i].detailCode.ID = detailList[j].ID;
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
				
			}
	    }
   
        // AJAX 요청으로 서버에 업데이트
	    $.ajax({
	        type: 'PUT',
	        url: '/admin/news/update', // 데이터 업데이트를 위한 API 엔드포인트
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
		
		const listItems = [];// DCO_ID를 저장할 배열 초기화
		// 로컬 스토리지에서 데이터 읽기
	    detailList = JSON.parse(localStorage.getItem('detailList'));
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
	        url: '/admin/news/list', // 데이터 가져올 API 엔드포인트
	        success: function(response) {
				console.log('서버 응답:', response); // 여기서 응답 데이터 출력
				initialData = response; // 초기 데이터 저장(데이터 수정시 비교)

	            // 데이터를 그리드에 뿌리기
	            grid.resetData(response.map(item => ({
	                NEW_NO: item.NEW_NO,           
	                NEW_SECTION: item.detailCode.DCO_ID,
	                NEW_NAME: item.NEW_NAME, 
	                NEW_CONTENT: item.NEW_CONTENT,   
	                NEW_DATE: item.NEW_DATE 
	            })));
	        },
	        error: function(error) {
	            console.error('Error fetching data:', error);
	            alert('데이터를 가져오는 데 실패했습니다.'); // 사용자에게 에러 메시지 알림
	        }
	    });
	}

   
});


