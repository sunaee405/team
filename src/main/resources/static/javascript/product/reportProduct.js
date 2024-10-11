$(document).ready(function() {

	// 상품 번호 설정
	//	const proNo = 100; // 실제 상품 번호로 변경
	const urlParams = new URLSearchParams(window.location.search);
	const proNo = urlParams.get('proNo'); // URL의 proNo 파라미터 가져오기
	const memNo = urlParams.get('memNo');

	// 카테고리 데이터를 가져와서 셀렉트 박스에 추가
	$.ajax({
		url: '/getReportCategory',
		type: 'GET',
		success: function(data) {
			var categoryDiv = document.getElementById('category-depth-1');
			var selectElement = document.createElement('select');
			selectElement.id = 'categoryList';
			selectElement.classList.add('flex', 'flex-col', 'border-solid', 'border-jnGray-300');

			// 기본 옵션인 '카테고리 선택'을 select에 추가
			var defaultOption = document.createElement('option');
			defaultOption.value = '';
			defaultOption.textContent = '신고항목 선택';
			defaultOption.disabled = true;  // 기본 옵션을 비활성화하여 목록에 표시되지 않게 함
			defaultOption.selected = true;  // 기본 선택 상태로 유지
			selectElement.appendChild(defaultOption);

			// 가져온 데이터로 option 요소들을 추가
			data.forEach(function(item) {
				var option = document.createElement('option');
				option.value = item["DCO_ID"];
				option.textContent = item["DCO_VALUE"];
				option.setAttribute('data-scoid', item["SCO_ID"]);
				option.setAttribute('data-mcoid', item["MCO_ID"]);
				selectElement.appendChild(option);
			});

			categoryDiv.appendChild(selectElement);
		},
		error: function(xhr, status, error) {
			console.error('Error occurred:', error);
		}
	});

	// 글자 수 표시
	const reportDescription = document.getElementById('reportDescription');
	const charCount = document.getElementById('charCount');

	reportDescription.addEventListener('input', function() {
		const currentLength = reportDescription.value.length;
		charCount.textContent = `${currentLength}/1000`;
	});

	// 폼 제출 시
	document.getElementById('insertReportForm').addEventListener('submit', function(e) {
		e.preventDefault();

		const formData = new FormData(this);

		// 선택된 카테고리의 DCO_ID 가져오기
		const categorySelect = document.getElementById('categoryList');
		const selectedCategoryOption = categorySelect.options[categorySelect.selectedIndex];
		const categoryDcoId = selectedCategoryOption.value;

		// 카테고리 값 FormData에 추가
		formData.append('categoryDcoId', categoryDcoId);
		formData.append('proNo', proNo);
		formData.append('memNo', memNo);
		
		console.log(categoryDcoId);
		console.log(proNo);
		console.log(memNo);
		

		// insertReport AJAX 요청 보내기
		$.ajax({
			url: '/insertReport',
			type: 'POST',
			data: formData,
			processData: false,  // 파일 처리
			contentType: false,  // multipart/form-data 자동 처리
			success: function(response) {
				alert('신고를 완료했습니다!');
				window.location.href = response.redirectUrl;  // 필요에 따라 활성화
			},
			error: function(xhr, status, error) {
				console.error('Error occurred:', error);
				alert('신고에 실패했습니다.');
			}
		});


	});

	$('#backButton').on('click', function() {
		window.history.back();
	});

});
