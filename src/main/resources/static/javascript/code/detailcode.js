$(document).ready(function() {
	
	let selectOptions = []; // 전역 변수로 선언하여 모든 함수에서 접근 가능하게 함
	let subList = [];
	
	// 초기 데이터 가져오기 (페이지 로드 시)
	//mainCode();
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
      scrollY: false,
      rowHeaders: ['checkbox'],
      columns: [
   	  	{
   	        header: 'ID', // 숨길 ID
   	        name: 'ID',
   	        hidden: true  // 숨기기 설정
   	    },
   	    {
          header: '서브 공통 코드',
          name: 'SCO_ID',
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: selectOptions, //동적으로 설정
            }
          }
        },
        {
          header: '디테일 공통 코드 ID',
          name: 'DCO_ID',
          editor: {
            type: CustomTextEditor,//사용자 정의 편집기
            options: {
              maxLength: 10, //글자수 제한
              disabled: true
            }
          }
        },
        {
          header: '디테일 공통 코드 값',
          name: 'DCO_VALUE',
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
	    
	    
	    if (checkedRows.length === 0) {
	        alert('삭제할 행을 선택해 주세요.');
	        return;
	    }
	
	    // 확인 대화상자
	    if (confirm('선택한 ' + checkedRows.length + '개의 행을 삭제하시겠습니까?')) {
	        // AJAX 요청으로 서버에 DELETE
	        $.ajax({
	            type: 'DELETE',
	            url: '/admin/detailcodes', // 삭제 요청을 보낼 API 엔드포인트
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
		
		const curr = grid.getData();
		const dbData = curr.filter((row, index) => row.ID !== null);
		const newData = curr.filter((row, index) => row.ID === null);
		
//		if (DB에 있던거면, ID가 null이 아닌거){
//			return false;
//		}

		// 중복 체크
		for(let i = 0; i < dbData.length; i++){
			if (dbData[i].DCO_ID == ev.changes[0].nextValue) {
	            alert(`"${dbData[i].DCO_ID}"는 이미 존재합니다. 다른 ID를 사용하세요.`);
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
    
    // 행 추가 버튼 클릭 이벤트 처리
    $('#addRowButton').click(function() {
        const currentData = grid.getData();
        // 새 행 추가
        grid.appendRow({ ID: null, SCO_ID: '', DCO_ID: '', DCO_VALUE: '' });
        // 편집 모드로 전환    
        requestAnimationFrame(() => {
            const indexToEdit = grid.getData().length - 1;
            grid.setEditing(indexToEdit, 'SCO_ID');
        });
    });
    
  	 
  	// 저장 버튼 클릭 이벤트 처리
    $('#saveButton').click(function() {
        const currentData = grid.getData();
        
		//const dataToInsert = []; // INSERT할 데이터
		
		const existingMCO_IDs = currentData.map(row => row.SCO_ID); // 기존 SCO_ID 배열
		//아이디가 null이 아니면 update
		const updatedData = currentData.filter((row, index) => row.ID !== null);
		//아이디가 null인것은 저장
		const newData = currentData.filter((row, index) => row.ID === null);
		
		const dataToInsert = newData.map(row => ({
			ID: null,
		    DCO_ID: row.DCO_ID,
		    DCO_VALUE: row.DCO_VALUE,
		    subCode: { ID: row.SCO_ID } // subCode 객체에 SCO_ID 포함
		}));
		
		// 필드 체크
		for (let i = 0; i < newData.length; i++) {
	        const row = newData[i];
	        if (row.SCO_ID === '' || row.DCO_ID === '' || row.DCO_VALUE === '') {
	            alert('모든 필드를 채워야 저장할 수 있습니다. 비어 있는 행이 있습니다.');
	            return;
	        }
	        for(let j = 0; j < subList.length; j++){
				if(newData[i].SCO_ID === subList[j].SCO_ID){
				dataToInsert[i].subCode.ID = subList[j].ID;
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
			}
	        
	    }
	    
		
        // AJAX 요청으로 서버에 INSERT
        $.ajax({
            type: 'POST',
            url: '/admin/detailcodes',
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
        
        
        const updateList = updatedData.map(row => ({
			ID: row.ID,
		    DCO_ID: row.DCO_ID,
		    DCO_VALUE: row.DCO_VALUE,
		    subCode: { ID: row.SCO_ID } // subCode 객체에 SCO_ID 포함
		}));
        
        
        
		// 수정할 데이터에 대한 중복 체크
	    for (let i = 0; i < updatedData.length; i++) {
	        const row = updatedData[i];
	        if (row.SCO_ID === '' || row.DCO_ID === '' || row.DCO_VALUE === '') {
	            alert('모든 필드를 채워야 저장할 수 있습니다. 비어 있는 행이 있습니다.');
	            return;
	        }for(let j = 0; j < subList.length; j++){
				if(updatedData[i].SCO_ID === subList[j].SCO_ID){
				updateList[i].subCode.ID = subList[j].ID;
				break; // 변환이 완료되면 더 이상 반복할 필요 없음
				}
				
			}

	    }
   
        
        // AJAX 요청으로 서버에 업데이트
	    $.ajax({
	        type: 'PUT',
	        url: '/admin/detailcodes', // 데이터 업데이트를 위한 API 엔드포인트
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
    
    // DB에서 데이터 가져와서 화면에 뿌리기
	function fetchData() {
		
		const listItems = [];// MCO_ID를 저장할 배열 초기화
		// 로컬 스토리지에서 데이터 읽기
	    subList = JSON.parse(localStorage.getItem('subList'));
	    for(let i = 0; i < subList.length; i++){
			listItems.push(subList[i].SCO_ID);// MCO_ID를 배열에 추가
		}
		
		// listItems를 셀렉트 박스의 옵션 형식으로 변환
		selectOptions = listItems.map(item => ({
		    text: item,  // 표시할 텍스트
		    value: item  // 실제 값
		}));
	    
	    
	    $.ajax({
	        type: 'GET',
	        url: '/admin/detailcodes', // 데이터 가져올 API 엔드포인트
	        success: function(response) {
				console.log('서버 응답:', response); // 여기서 응답 데이터 출력
	            // 데이터를 그리드에 뿌리기
	            grid.resetData(response.map(item => ({
	                ID: item.ID,           // ID 필드 포함
	                SCO_ID: item.subCode.SCO_ID, // SCO_ID 필드
	                DCO_ID: item.DCO_ID,   // DCO_ID 필드
	                DCO_VALUE: item.DCO_VALUE // DCO_VALUE 필드
	            })));
	        },
	        error: function(error) {
	            console.error('Error fetching data:', error);
	            alert('데이터를 가져오는 데 실패했습니다.'); // 사용자에게 에러 메시지 알림
	        }
	    });
	}

   
});


