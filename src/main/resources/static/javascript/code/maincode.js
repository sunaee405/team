$(document).ready(function() {
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
   	        header: 'ID', // 숨길 ID
   	        name: 'ID',
   	        hidden: true  // 숨기기 설정
   	    },
        {
          header: '메인 공통 코드 ID',
          name: 'MCO_ID',
          editor: {
            type: CustomTextEditor,//사용자 정의 편집기
            options: {
              maxLength: 10, //글자수 제한
              disabled: true
            }
          }
        },
        {
          header: '메인 공통 코드 값',
          name: 'MCO_VALUE',
          editor: {
            type: CustomTextEditor,
            options: {
              maxLength: 20,
              disabled: false
            }
          }
        },
      ]
    });
    
    // 체크된 행 삭제 버튼 클릭 이벤트 처리
	$('#deleteButton').click(function() {
	    const checkedRows = grid.getCheckedRowKeys(); // 체크된 행의 인덱스 가져오기
	    const currentData = grid.getData(); //전체 데이터
	    
	    //전체데이터 중에 체크된 아이디가 null인 행
	    const checkedRowsData = currentData.filter((row, index) =>  checkedRows.includes(index));
		// const viewData = checkedRowsData.filter((row, index) => row.ID === null && checkedRows.includes(index));	    
	    
	    //전체데이터 중에 체크된 아이디가 null이 아닌 행(DB삭제)
	    const dbData = checkedRowsData.filter((row, index) => row.ID !== null);
	    const filteredIds = dbData.map(row => row.ID);
	    // ID 가 있는 배열 (DB)
	    // 필터링된 ID를 저장할 배열
	    
//	    const filteredIds = []; 
//	    for(let i = 0; i < currentData.length; i++){
//			if (currentData[i].ID !== null) {
//        		filteredIds.push(currentData[i].ID); // ID가 null이 아닐 경우 배열에 추가
//    		}
//		}
	    // ID null 배열
//	    grid.removeRows(checkedRows);
	    
//	    return;
	    
	    if (checkedRows.length === 0) {
	        alert('삭제할 행을 선택해 주세요.');
	        return;
	    }
	
	    // 확인 대화상자
	    if (confirm('선택한 ' + checkedRows.length + '개의 행을 삭제하시겠습니까?')) {
	        // AJAX 요청으로 서버에 DELETE
	        $.ajax({
	            type: 'DELETE',
	            url: '/admin/maincodes', // 삭제 요청을 보낼 API 엔드포인트
	            contentType: 'application/json',
	            data: JSON.stringify(filteredIds), // 체크된 행의 ID 배열 전송
	            success: function(response) {
	                console.log('삭제 성공:', response);
	                alert('삭제 완료!' + filteredIds.length + '개의 행이 삭제되었습니다.');
	                // 삭제 후, 데이터 다시 가져오기
                	fetchData(); // 데이터 가져오는 함수 호출
	                

	            },
	            error: function(xhr) {
			        console.error('삭제 오류:', xhr);
			        let errorMessage;
			
			        // 서버에서 전달한 오류 메시지 확인
			        if (xhr.status === 400) {
						debugger;
			            errorMessage = xhr.responseText || '삭제 실패! 외래 키 제약 조건을 확인하세요.';
			        } else {
						debugger;
			            errorMessage = '삭제 실패! 오류 코드: ' + xhr.status + ', 메시지: ' + xhr.responseText;
			        }
			
			        alert(errorMessage);
			    }
//	            error: function(xhr, status, error) {
//	                console.error('삭제 오류:', error);
//	                alert('삭제 실패! 오류: ' + error);
//	                if (xhr.status === 400){
//						alert('삭제 실패! 외래 키 제약 조건을 확인하세요.');
//					}
//	            }
	        });
	    }
	});
	
	// 그리드 이벤트 핸들러
    grid.on('beforeChange', ev => {
		
		const curr = grid.getData();
		const dbData = curr.filter((row, index) => row.ID !== null);
		const newData = curr.filter((row, index) => row.ID === null);
		
//		if (DB에 있던거면, ID가 null이 아닌거){
//			return false;
//		}

		// 중복 체크
		for(let i = 0; i < dbData.length; i++){
			if (dbData[i].MCO_ID == ev.changes[0].nextValue) {
	            alert(`"${dbData[i].MCO_ID}"는 이미 존재합니다. 다른 ID를 사용하세요.`);
	            ev.changes[0].nextValue = "";
	            grid.el.onfocus = true;
	            return;
        	}
		}
		
		
		// TODO
		
    	console.log('before change:', ev);
    });
    
    grid.on('afterChange', ev => {
    	console.log('after change:', ev);
    })
    
    grid.on('click', ev => {
//	    if (ev.columnName === 'MCO_ID') {
//	        alert('메인 공통 코드 ID는 수정할 수 없습니다.');
//	        ev.stop(); // 편집 중단
//	    }
	});
	
	
	// 편집 가능 여부 설정
//	grid.on('beforeEditStart', ev => {
//	    console.log('before edit start:', ev);
//	    
//	    // MCO_ID 열의 수정 여부 체크
//	    if (ev.columnName === 'MCO_ID') {
//	        const isNewRow = ev.rowKey === 'create'; // 새로 추가된 행인지 확인
//	
//	        if (!isNewRow) {
//	            // 기존 행인 경우 수정 불가
//	            alert('메인 공통 코드 ID는 수정할 수 없습니다.');
//	            ev.stop(); // 편집 중단
//	        }
//	    }
//	});
	
    
    
//    grid.resetData(gridData);
    

    
    // 행 추가 버튼 클릭 이벤트 처리
    $('#addRowButton').click(function() {
        const currentData = grid.getData();
        // 새 행 추가
        grid.appendRow({ ID: null, MCO_ID: '', MCO_VALUE: '' });
        // 편집 모드로 전환    
        requestAnimationFrame(() => {
            const indexToEdit = grid.getData().length - 1;
            grid.setEditing(indexToEdit, 'MCO_ID');
        });
    });
    
  	 
  	// 저장 버튼 클릭 이벤트 처리
    $('#saveButton').click(function() {
        const currentData = grid.getData();
        
		const dataToInsert = []; // INSERT할 데이터
		const existingMCO_IDs = currentData.map(row => row.MCO_ID); // 기존 MCO_ID 배열
		//아이디가 null이 아니면 update
		const updatedData = currentData.filter((row, index) => row.ID !== null);
		//아이디가 null인것은 저장
		const newData = currentData.filter((row, index) => row.ID === null);
		
		// 필드 체크
		for (let i = 0; i < newData.length; i++) {
	        const row = newData[i];
	        if (row.MCO_ID === '' || row.MCO_VALUE === '') {
	            alert('모든 필드를 채워야 저장할 수 있습니다. 비어 있는 행이 있습니다.');
	            return;
	        }
	        
	        dataToInsert.push(row); // 모든 필드가 채워진 행을 추가
	    }
		
        // AJAX 요청으로 서버에 INSERT
        $.ajax({
            type: 'POST',
            url: '/admin/maincodes',
            contentType: 'application/json',
            data: JSON.stringify(dataToInsert),// ID를 제외한 데이터 전송
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
        
        
        
		// 수정할 데이터에 대한 중복 체크
	    for (let i = 0; i < updatedData.length; i++) {
	        const row = updatedData[i];
	        if (row.MCO_ID === '' || row.MCO_VALUE === '') {
	            alert('모든 필드를 채워야 저장할 수 있습니다. 비어 있는 행이 있습니다.');
	            return;
	        }
	        
	        // 중복 체크
//	        if (existingMCO_IDs.includes(modifiedMCO_ID) && modifiedMCO_ID !== row.originalMCO_ID) {
//	            alert(`MCO_ID "${row.MCO_ID}"는 이미 존재합니다. 다른 ID를 사용하세요.`);
//	            debugger;
//	            return;
//	        }

	    }
        
        // AJAX 요청으로 서버에 업데이트
	    $.ajax({
	        type: 'PUT',
	        url: '/admin/maincodes', // 데이터 업데이트를 위한 API 엔드포인트
	        contentType: 'application/json',
	        data: JSON.stringify(updatedData), // 수정된 데이터 전송
	
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
    
    // DB에서 데이터 가져와서 화면에 뿌리기
	function fetchData() {
	    $.ajax({
	        type: 'GET',
	        url: '/admin/maincodes', // 데이터 가져올 API 엔드포인트
	        success: function(response) {
				
				console.log('서버 응답:', response); // 여기서 응답 데이터 출력
	            
	            // 데이터를 로컬 스토리지에 저장
            	localStorage.setItem('mainList', JSON.stringify(response));
            	
	            grid.resetData(response.map(item => ({
	                ID: item.ID,           // ID 필드 포함
	                MCO_ID: item.MCO_ID,   // MCO_ID 필드
	                MCO_VALUE: item.MCO_VALUE // MCO_VALUE 필드
	            })));
	        },
	        error: function(error) {
	            console.error('Error fetching data:', error);
	            alert('데이터를 가져오는 데 실패했습니다.'); // 사용자에게 에러 메시지 알림
	        }
	    });
	}
	
	$('#subButton').click(function(){
		// 페이지 이동
        window.location.href = 'subCrud'; // 이동할 페이지의 경로로 변경
	});
	
//	$('#subButton').click(function() {
//		// 그리드 초기화
//	    if (grid) {
//	        grid.destroy(); // 기존 그리드 인스턴스 제거
//	    }
//	    $.getScript('/static/javascript/code/subcode.js', function() {
//	        console.log('서브코드 관련 스크립트가 로드되었습니다.');
//	        // 필요한 함수 호출
//	        if (typeof initializeSubCode === "function") {
//	            initializeSubCode(); // 서브코드 초기화 함수 호출
//	        }
//	    });
//	});
   
});




