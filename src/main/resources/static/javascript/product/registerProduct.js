$(document).ready(function() {
	
	const uploadButton = document.getElementById('imageUploadButton');
	const imageInput = document.getElementById('imageInput');
	const imageList = document.getElementById('imageList');
	const imageCountDisplay = document.getElementById('imageCount');
	let currentImageCount = 0;
	const maxImages = 5;
	let selectedFiles = []; // 여러 개의 파일을 저장할 배열

	// 이미지 갯수 업데이트 함수
	function updateImageCountDisplay() {
		imageCountDisplay.textContent = `${currentImageCount}/${maxImages}`;
	}

	// 초기 이미지 개수 표시 (0/5)
	updateImageCountDisplay();

	if (uploadButton && imageInput) {
		uploadButton.addEventListener('click', function() {
			if (currentImageCount < maxImages) {
				imageInput.click();
			} else {
				alert('최대 5개의 이미지만 추가할 수 있습니다.');
			}
		});

		// 이미지 파일 선택 시 미리보기 기능 구현
		imageInput.addEventListener('change', function(event) {
			const files = event.target.files;

			// 추가된 이미지가 현재 이미지 갯수와 합쳐서 5개 초과 시 경고
			if (currentImageCount + files.length > maxImages) {
				alert(`최대 ${maxImages}개의 이미지만 추가할 수 있습니다.`);
				return;
			}

			// 파일을 읽어서 미리보기 생성 및 selectedFiles 배열에 저장
			Array.from(files).forEach(file => {
				if (currentImageCount >= maxImages) {
					alert('최대 5개의 이미지만 추가할 수 있습니다.');
					return;
				}

				selectedFiles.push(file); // 배열에 파일 추가

				const reader = new FileReader();
				reader.onload = function(e) {
					const imgElement = document.createElement('img');
					imgElement.src = e.target.result;
					imgElement.alt = '이미지 미리보기';
					imgElement.className = 'w-20 h-20 mr-1.5 border border-solid border-jnGreen rounded-lg relative';
					imgElement.style.position = 'relative';

					const liElement = document.createElement('li');
					liElement.style.position = 'relative';
					liElement.style.display = 'inline-block';

					// 삭제 버튼 추가
					const deleteButton = document.createElement('button');
					deleteButton.className = 'absolute top-0 right-2 bg-transparent';
					deleteButton.innerHTML = `
                        <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" fill="white"></path>
                            <path d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5V18.5C14.6944 18.5 18.5 14.6944 18.5 10H17.5ZM10 17.5C5.85786 17.5 2.5 14.1421 2.5 10H1.5C1.5 14.6944 5.30558 18.5 10 18.5V17.5ZM2.5 10C2.5 5.85786 5.85786 2.5 10 2.5V1.5C5.30558 1.5 1.5 5.30558 1.5 10H2.5ZM10 2.5C14.1421 2.5 17.5 5.85786 17.5 10H18.5C18.5 5.30558 14.6944 1.5 10 1.5V2.5Z" fill="#DADEE5"></path>
                            <path d="M7 7L13 13M13 7L7 13" stroke="#363C45" stroke-linecap="round"></path>
                        </svg>`;

					// 삭제 버튼 클릭 이벤트
					deleteButton.addEventListener('click', function() {
						const index = selectedFiles.indexOf(file);
						if (index > -1) {
							selectedFiles.splice(index, 1); // 배열에서 파일 제거
						}
						liElement.remove(); // 클릭 시 이미지 미리보기 삭제
						currentImageCount--;
						updateImageCountDisplay();
					});

					liElement.appendChild(imgElement);
					liElement.appendChild(deleteButton);
					imageList.appendChild(liElement);

					// 이미지 갯수 업데이트
					currentImageCount++;
					updateImageCountDisplay();
				};
				reader.readAsDataURL(file);
			});
		});
	}

	// 카테고리 데이터를 가져와서 셀렉트 박스에 추가
	$.ajax({
		url: '/getProductCategory',
		type: 'GET',
		success: function(data) {
			var categoryDiv = document.getElementById('category-depth-1');
			var selectElement = document.createElement('select');
			selectElement.id = 'categoryList';
			selectElement.classList.add('flex', 'flex-col', 'border-solid', 'border-jnGray-300');

			// 기본 옵션인 '카테고리 선택'을 select에 추가
			var defaultOption = document.createElement('option');
			defaultOption.value = '';
			defaultOption.textContent = '카테고리 선택';
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

	// 동일한 방식으로 지역 셀렉트 박스에 추가
	$.ajax({
		url: '/getProductLocation',
		type: 'GET',
		success: function(data) {
			var locationDiv1 = document.getElementById('location-depth-1');
			var selectElement = document.createElement('select');
			selectElement.id = 'locationList1';
			selectElement.classList.add('flex', 'flex-col', 'border-solid', 'border-jnGray-300');

			var defaultOption = document.createElement('option');
			defaultOption.value = '';
			defaultOption.textContent = '지역 선택';
			defaultOption.disabled = true;  // 기본 옵션을 비활성화하여 목록에 표시되지 않게 함
			defaultOption.selected = true;  // 기본 선택 상태로 유지
			selectElement.appendChild(defaultOption);

			var scoMap = new Map();
			data.forEach(function(item) {
				if (!scoMap.has(item["SCO_ID"])) {
					scoMap.set(item["SCO_ID"], []);
					var option = document.createElement('option');
					option.value = item["SCO_ID"];
					option.textContent = item["SCO_VALUE"];
					selectElement.appendChild(option);
				}
				scoMap.get(item["SCO_ID"]).push({ DCO_ID: item["DCO_ID"], DCO_VALUE: item["DCO_VALUE"], MCO_ID: item["MCO_ID"] });
			});

			locationDiv1.appendChild(selectElement);

			selectElement.addEventListener('change', function() {
				var selectedScoId = this.value;
				var dcoList = scoMap.get(selectedScoId) || [];

				var locationDiv2 = document.getElementById('location-depth-2');
				locationDiv2.classList.remove('hidden');
				locationDiv2.innerHTML = '';

				var selectElement2 = document.createElement('select');
				selectElement2.id = 'locationList2';
				selectElement2.classList.add('flex', 'flex-col', 'border-solid', 'border-jnGray-300');

				var defaultOption2 = document.createElement('option');
				defaultOption2.value = '';
				defaultOption2.textContent = '세부 지역 선택';
				defaultOption2.disabled = true;  // 기본 옵션을 비활성화하여 목록에 표시되지 않게 함
				defaultOption2.selected = true;  // 기본 선택 상태로 유지
				selectElement2.appendChild(defaultOption2);

				dcoList.forEach(function(dcoItem) {
					if (dcoItem["DCO_ID"] && dcoItem["DCO_VALUE"]) {
						var option2 = document.createElement('option');
						option2.value = dcoItem["DCO_ID"];
						option2.textContent = dcoItem["DCO_VALUE"];
						option2.setAttribute('data-scoid', selectedScoId);
						option2.setAttribute('data-mcoid', dcoItem["MCO_ID"]);
						selectElement2.appendChild(option2);
					}
				});

				locationDiv2.appendChild(selectElement2);
			});
		},
		error: function(xhr, status, error) {
			console.error('Error occurred:', error);
		}
	});

	// 상품 상태 버튼 생성
	$.ajax({
		url: '/getProductState',
		type: 'GET',
		success: function(data) {
			var productStateDiv = document.getElementById('productState_depth');
			productStateDiv.innerHTML = '';

			data.forEach(function(item, index) {
				var button = document.createElement('button');
				button.type = 'button';
				button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
				button.textContent = item["DCO_VALUE"];

				button.setAttribute('data-stateid', item["DCO_ID"]);
				button.setAttribute('data-scoid', item["SCO_ID"]);
				button.setAttribute('data-mcoid', item["MCO_ID"]);

				if (index === 0) {
					button.classList.add('text-white', 'bg-jngreen', 'border-jngreen');
					button.classList.add('selected');
				} else {
					button.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
				}

				button.addEventListener('click', function() {
					var selectedButton = document.querySelector('#productState_depth .selected');
					if (selectedButton) {
						selectedButton.classList.remove('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
						selectedButton.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
					}

					this.classList.add('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
					this.classList.remove('text-jnblack', 'bg-white', 'border-jnblack');
				});

				productStateDiv.appendChild(button);
			});
		},
		error: function(xhr, status, error) {
			console.error('Error occurred while fetching product state:', error);
		}
	});

	// 판매 타입 버튼 생성
	$.ajax({
		url: '/getProductType',
		type: 'GET',
		success: function(data) {
			var productTypeDiv = document.getElementById('productType_depth');
			productTypeDiv.innerHTML = '';

			data.forEach(function(item, index) {
				var button = document.createElement('button');
				button.type = 'button';
				button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
				button.textContent = item["DCO_VALUE"];

				button.setAttribute('data-typeid', item["DCO_ID"]);

				if (index === 0) {
					button.classList.add('text-white', 'bg-jngreen', 'border-jngreen');
					button.classList.add('selected');
				} else {
					button.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
				}

				button.addEventListener('click', function() {
					var selectedButton = document.querySelector('#productType_depth .selected');
					if (selectedButton) {
						selectedButton.classList.remove('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
						selectedButton.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
					}

					this.classList.add('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
					this.classList.remove('text-jnblack', 'bg-white', 'border-jnblack');
				});

				productTypeDiv.appendChild(button);
			});
		},
		error: function(xhr, status, error) {
			console.error('Error occurred while fetching product type:', error);
		}
	});

	// 네고 여부 버튼 생성
	$.ajax({
		url: '/getProductNego',
		type: 'GET',
		success: function(data) {
			var productNegoDiv = document.getElementById('productNego_depth');
			productNegoDiv.innerHTML = '';

			data.forEach(function(item, index) {
				var button = document.createElement('button');
				button.type = 'button';
				button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
				button.textContent = item["DCO_VALUE"];

				button.setAttribute('data-negoid', item["DCO_ID"]);

				if (index === 0) {
					button.classList.add('text-white', 'bg-jngreen', 'border-jngreen');
					button.classList.add('selected');
				} else {
					button.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
				}

				button.addEventListener('click', function() {
					var selectedButton = document.querySelector('#productNego_depth .selected');
					if (selectedButton) {
						selectedButton.classList.remove('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
						selectedButton.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
					}

					this.classList.add('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
					this.classList.remove('text-jnblack', 'bg-white', 'border-jnblack');
				});

				productNegoDiv.appendChild(button);
			});
		},
		error: function(xhr, status, error) {
			console.error('Error occurred while fetching product nego:', error);
		}
	});

	// 상품 설명 글자 수 표시
	const productDescription = document.getElementById('productDescription');
	const charCount = document.getElementById('charCount');

	productDescription.addEventListener('input', function() {
		const currentLength = productDescription.value.length;
		charCount.textContent = `${currentLength}/1000`;
	});

	// 폼 제출 시
	document.getElementById('insertProductForm').addEventListener('submit', function(e) {
		e.preventDefault();

		const formData = new FormData(this);

		// 선택된 파일들을 FormData에 추가
		selectedFiles.forEach(file => {
			formData.append('media', file);
		});

		// 선택된 카테고리의 DCO_ID 가져오기
		const categorySelect = document.getElementById('categoryList');
		const selectedCategoryOption = categorySelect.options[categorySelect.selectedIndex];
		const categoryDcoId = selectedCategoryOption.value;

		// 카테고리 값 FormData에 추가
		formData.append('categoryDcoId', categoryDcoId);

		// 선택된 지역의 DCO_ID 가져오기
		const locationSelect = document.getElementById('locationList2');
		const selectedLocationOption = locationSelect.options[locationSelect.selectedIndex];
		const locationDcoId = selectedLocationOption.value;

		// 지역 값 FormData에 추가
		formData.append('locationDcoId', locationDcoId);

		// 선택된 상품 상태의 DCO_ID 가져오기
		const selectedStateButton = document.querySelector('#productState_depth .selected');
		const selectedStateDcoId = selectedStateButton.getAttribute('data-stateid');

		// 선택된 상품 상태 값 FormData에 추가
		formData.append('stateDcoId', selectedStateDcoId);

		// 선택된 판매 타입의 DCO_ID 가져오기
		const selectedTypeButton = document.querySelector('#productType_depth .selected');
		const selectedTypeDcoId = selectedTypeButton.getAttribute('data-typeid');
		formData.append('typeDcoId', selectedTypeDcoId);

		// 선택된 네고 여부의 DCO_ID 가져오기
		const selectedNegoButton = document.querySelector('#productNego_depth .selected');
		const selectedNegoDcoId = selectedNegoButton.getAttribute('data-negoid');
		formData.append('negoDcoId', selectedNegoDcoId);

		// 세션에서 MEM_NO를 가져오기 위한 AJAX 호출
		$.ajax({
			url: '/getMemNoByMemId',
			type: 'GET',
			success: function(memNo) {
				if (memNo === null) {
					alert('회원 정보를 찾을 수 없습니다.');
					return;
				}
				console.log('MEM_NO:', memNo);
				// MEM_NO를 formData에 추가
				formData.append('memNo', memNo);

				// insertProduct AJAX 요청 보내기
				$.ajax({
					url: '/insertProduct',
					type: 'POST',
					data: formData,
					processData: false,  // 파일 처리
					contentType: false,  // multipart/form-data 자동 처리
					success: function(response) {
						alert('판매등록을 완료했습니다!');
						window.location.href = response.redirectUrl;  // 필요에 따라 활성화
					},
					error: function(xhr, status, error) {
						console.error('Error occurred:', error);
						alert('판매등록에 실패했습니다.');
					}
				});
			},
		});
	});
});
