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
   	        header: 'mem_no', // 숨길 NO
   	        name: 'mem_no',
   	        hidden: true  // 숨기기 설정
   	    },
   	    {
          header: '아이디',
          name: 'mem_id',
          validation: { required: true },//노란색
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
            type: CustomTextEditor,//사용자 정의 편집기
            options: {
              disabled: true
            }
          }
        },
        {
          header: '이름',
          name: 'mem_name',
          validation: { required: true },//노란색
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
            type: CustomTextEditor,//사용자 정의 편집기
            options: {
              maxLength: 10, //글자수 제한
              disabled: false
            }
          }
        },
        
        {
          header: '닉네임',
          name: 'mem_nick',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
            type: CustomTextEditor,
            options: {
              disabled: true
            }
          }
        },
        {
          header: '패스워드',
          name: 'mem_pw',
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
	            url: '/admin/subcodes', // 삭제 요청을 보낼 API 엔드포인트
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
			if (dbData[i].SCO_ID == ev.changes[0].nextValue) {
	            alert(`"${dbData[i].SCO_ID}"는 이미 존재합니다. 다른 ID를 사용하세요.`);
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
    
    // 클릭 이벤트 핸들러
	grid.on('click', (ev) => {
	    const { rowKey, columnName } = ev;
	    if (columnName === 'mem_id' && ev.targetType !== 'columnHeader') { // mem_id 열이 클릭된 경우
	        const memNo = grid.getValue(rowKey, 'mem_no');
	        window.location.href = `detail?mem_no=${memNo}`;
	    }
	});
    
  	// 저장 버튼 클릭 이벤트 처리
    $('#saveButton').click(function() {
        const currentData = grid.getData();
        
		//아이디가 null이 아니면 update
		const updatedData = currentData.filter((row, index) => row.mem_no !== null);
		    
        const updateList = updatedData.map(row => ({
			mem_no : row.mem_no,
			mem_name: row.mem_name,
		    mem_pw: row.mem_pw,
		}));
		
        // AJAX 요청으로 서버에 업데이트
	    $.ajax({
	        type: 'PUT',
	        url: '/admin/members', // 데이터 업데이트를 위한 API 엔드포인트
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
	    
	    $.ajax({
	        type: 'GET',
	        url: '/admin/members', // 데이터 가져올 API 엔드포인트
	        success: function(response) {
				console.log('서버 응답:', response); // 여기서 응답 데이터 출력
				
				// 데이터를 로컬 스토리지에 저장
            	//localStorage.setItem('subList', JSON.stringify(response));

	            // 데이터를 그리드에 뿌리기
	            grid.resetData(response.map(item => ({
	                mem_no: item.mem_no,           // ID 필드 포함
	                mem_id: item.mem_id, // MCO_VALUE 필드
	                mem_name: item.mem_name,   // MCO_ID 필드
	                mem_nick: item.mem_nick, // MCO_VALUE 필드
	                mem_pw: item.mem_pw // MCO_VALUE 필드
	            })));
	        },
	        error: function(error) {
	            console.error('Error fetching data:', error);
	            alert('데이터를 가져오는 데 실패했습니다.'); // 사용자에게 에러 메시지 알림
	        }
	    });
	}
	
	$('#detailButton').click(function(){
		// 페이지 이동
        window.location.href = 'detailCrud'; // 이동할 페이지의 경로로 변경
	});

   
});


