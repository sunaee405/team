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
   	        header: 'INQ_NO', // 숨길 NO
   	        name: 'INQ_NO',
   	        hidden: true  // 숨기기 설정
   	    },
   	    {
          header: '회원번호',
          name: 'MEM_NO',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
        },
        {
          header: '문의제목',
          name: 'INQ_TITLE',
          validation: { required: true },
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
        },
        {
          header: '문의내용',
          name: 'INQ_CONTENT',
          filter: { type: 'text', showApplyBtn: true, showClearBtn: true },
          editor: {
            type: CustomTextEditor,
            options: {
              disabled: true
            }
          }
        },
        {
          header: '문의날자',
          name: 'INQ_DATE',
          sortable: true,
          rowSpan: true
        },
        {
          header: '처리결과',
          name: 'RESULT',
          filter: 'select',
        },
      ]
    });
    
    // 체크된 행 삭제 버튼 클릭 이벤트 처리
	$('#deleteButton').click(function() {
	    const checkedRows = grid.getCheckedRowKeys(); // 체크된 행의 인덱스 가져오기
	    const currentData = grid.getData(); //전체 데이터
	    
	    //전체데이터 중에 체크된 아이디가 null인 행
	    const checkedRowsData = currentData.filter((row, index) =>  checkedRows.includes(index));
	    
	    //전체데이터 중에 체크된 아이디가 null이 아닌 행(DB삭제)
	    const dbData = checkedRowsData.filter((row, index) => row.INQ_NO !== null);
	    const filteredIds = dbData.map(row => row.INQ_NO);
	    
	    if (checkedRows.length === 0) {
	        alert('삭제할 행을 선택해 주세요.');
	        return;
	    }
	
	    // 삭제
	    if (confirm('선택한 ' + checkedRows.length + '개의 행을 삭제하시겠습니까?')) {
	        // AJAX 요청으로 서버에 DELETE
	        $.ajax({
	            type: 'POST',
	            url: '/admin/inquiry/delete', // 삭제 요청을 보낼 API 엔드포인트
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
	    if (columnName === 'INQ_TITLE' && ev.targetType !== 'columnHeader') { // pro_title 열이 클릭된 경우
	        const inqNo = grid.getValue(rowKey, 'INQ_NO');
	        window.location.href = `info?INQ_NO=${inqNo}`;
	    }
	    
	    
	    if (columnName === 'INQ_CONTENT' && ev.targetType !== 'columnHeader') { // 수정할 열
        const currentContent = grid.getValue(rowKey, 'INQ_CONTENT');
        document.getElementById('editTextArea').value = currentContent; // 현재 내용을 텍스트 영역에 표시
        document.getElementById('editTextArea').readOnly = true; // 읽기 전용으로 설정
        
        // 모달과 오버레이 표시
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
        
        
    	}
	   
	});
	
    // 닫기 버튼 클릭 이벤트
    document.getElementById('cancelEditButton').onclick = closeModal; 
    
    //------함수
    
    // closeModal 함수 정의
	function closeModal() {
	    document.getElementById('editModal').style.display = 'none';
	    document.getElementById('modalOverlay').style.display = 'none';
	}
    
    
    // DB에서 데이터 가져와서 화면에 뿌리기
	function fetchData() {
	    
	    $.ajax({
	        type: 'GET',
	        url: '/admin/inquiry', // 데이터 가져올 API 엔드포인트
	        success: function(response) {
				console.log('서버 응답:', response); // 여기서 응답 데이터 출력
				// 데이터를 로컬 스토리지에 저장
            	//localStorage.setItem('subList', JSON.stringify(response));
	            // 데이터를 그리드에 뿌리기
	            grid.resetData(response.map(item => ({
	                INQ_NO: item.INQ_NO,           
	                MEM_NO: item.MEM_NO, 
	                INQ_TITLE: item.INQ_TITLE,
	                INQ_CONTENT: item.INQ_CONTENT,   
	                INQ_DATE: item.INQ_DATE,
	                RESULT: item.RESULT
	            })));
	        },
	        error: function(error) {
	            console.error('Error fetching data:', error);
	            alert('데이터를 가져오는 데 실패했습니다.'); // 사용자에게 에러 메시지 알림
	        }
	    });
	}

   
});


