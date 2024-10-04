$(document).ready(function() {
	const proNo = new URLSearchParams(window.location.search).get('proNo'); // URL에서 proNo 가져오기
	let existingImages = []; // 기존 이미지 배열
	let selectedFiles = []; // 새로운 이미지 파일 배열
	let deletedFiles = []; // 삭제된 이미지 배열
	const maxImages = 5; // 최대 이미지 개수
	let currentImageCount = 0; // 현재 이미지 수

	// 이미지 갯수 업데이트 함수
	function updateImageCountDisplay() {
		$('#imageCount').text(`${currentImageCount}/${maxImages}`);
	}

	// 이미지 업로드 버튼 클릭 이벤트 추가
	$('#imageUploadButton').on('click', function() {
		$('#imageInput').click(); // 파일 선택 창 열기
	});

	// 상품 데이터를 가져오기 위한 AJAX 호출
	$.ajax({
		url: '/getContentProduct',
		type: 'GET',
		data: { proNo: proNo },
		success: function(response) {
			const productCategory = response.PRO_CATEGORY; // 상품의 카테고리 값을 저장
			const productTitle = response.PRO_TITLE; // 상품 제목
			const productPrice = response.PRO_PRICE; // 상품 가격
			const productContent = response.PRO_CONTENT; // 상품 내용
			const productState = response.PRO_STATE_VALUE; // 상품 상태
			const productType = response.PRO_TYPE; // 판매 타입
			const productNego = response.PRO_NEG_VALUE; // 네고 여부
			const productStatus = response.PRO_STATUS_VALUE; // 판매 상태
			const productLocationSub = response.LOCATION_SUB; // 상위 지역
			const productLocationValue = response.LOCATION_VALUE; // 하위 지역
			const images = response.PRO_IMG.split(',').map(img => img.trim()); // 이미지 데이터 가져오기

			existingImages = images; // 기존 이미지 저장
			currentImageCount = images.length; // 현재 이미지 수는 불러온 이미지 수

			// 초기 이미지 개수 표시
			updateImageCountDisplay();

			const imageList = document.getElementById('imageList');
			images.forEach(image => {
				const imageUrl = '/images/' + image;

				// 이미지를 미리보기로 추가
				const liElement = document.createElement('li');
				liElement.style.position = 'relative';
				liElement.style.display = 'inline-block';

				const imgElement = document.createElement('img');
				imgElement.src = imageUrl;
				imgElement.alt = '이미지 미리보기';
				imgElement.className = 'w-20 h-20 mr-1.5 border border-solid border-jnGreen rounded-lg relative';

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
					deletedFiles.push(image); // 삭제된 이미지 배열에 추가
					liElement.remove(); // 클릭 시 이미지 미리보기 삭제
					currentImageCount--;
					updateImageCountDisplay(); // 이미지 카운트 업데이트
				});

				liElement.appendChild(imgElement);
				liElement.appendChild(deleteButton);
				imageList.appendChild(liElement);
			});

			// 이미지 갯수 업데이트 함수 호출
			updateImageCountDisplay();

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
					selectElement.appendChild(defaultOption);

					// 가져온 데이터로 option 요소들을 추가
					data.forEach(function(item) {
						var option = document.createElement('option');
						option.value = item["DCO_ID"];
						option.textContent = item["DCO_VALUE"];
						option.setAttribute('data-scoid', item["SCO_ID"]);
						option.setAttribute('data-mcoid', item["MCO_ID"]);

						// 불러온 카테고리와 일치하면 선택 상태로 설정
						if (item["DCO_ID"] === productCategory) {
							option.selected = true;
						}

						selectElement.appendChild(option);
					});

					categoryDiv.appendChild(selectElement);
				},
				error: function(xhr, status, error) {
					console.error('Error occurred:', error);
				}
			});

			// 지역 데이터를 가져와서 상위 및 하위 지역을 선택하도록 처리
			$.ajax({
				url: '/getProductLocation',
				type: 'GET',
				success: function(data) {
					var locationDiv1 = document.getElementById('location-depth-1');
					var locationDiv2 = document.getElementById('location-depth-2');

					// 상위 지역 선택
					var selectElement1 = document.createElement('select');
					selectElement1.id = 'locationList1';
					selectElement1.classList.add('flex', 'flex-col', 'border-solid', 'border-jnGray-300');

					// 기본 옵션 추가
					var defaultOption1 = document.createElement('option');
					defaultOption1.value = '';
					defaultOption1.textContent = '지역 선택';
					defaultOption1.disabled = true;
					defaultOption1.selected = true; // 기본 옵션을 선택 상태로 설정
					selectElement1.appendChild(defaultOption1);

					// 하위 지역 선택
					var selectElement2 = document.createElement('select');
					selectElement2.id = 'locationList2';
					selectElement2.classList.add('flex', 'flex-col', 'border-solid', 'border-jnGray-300');

					var scoMap = new Map();
					data.forEach(function(item) {
						// 상위 지역 추가
						if (!scoMap.has(item["SCO_ID"])) {
							scoMap.set(item["SCO_ID"], []);
							var option = document.createElement('option');
							option.value = item["SCO_ID"];
							option.textContent = item["SCO_VALUE"];
							if (item["SCO_VALUE"] === productLocationSub) {
								option.selected = true;  // 불러온 상위 지역과 일치하는 항목을 선택
							}
							selectElement1.appendChild(option);
						}
						scoMap.get(item["SCO_ID"]).push({ DCO_ID: item["DCO_ID"], DCO_VALUE: item["DCO_VALUE"], MCO_ID: item["MCO_ID"] });
					});

					// 상위 지역 선택 박스를 페이지에 추가
					locationDiv1.appendChild(selectElement1);

					// 하위 지역 선택 박스를 페이지에 추가
					locationDiv2.appendChild(selectElement2);

					// 하위 지역 목록 업데이트 함수
					function updateLowerRegions(selectedUpperRegionId) {
						// 하위 지역 선택 박스 초기화
						selectElement2.innerHTML = '';

						// 기본 옵션 추가
						var defaultOption2 = document.createElement('option');
						defaultOption2.value = '';
						defaultOption2.textContent = '세부 지역 선택';
						defaultOption2.disabled = true;
						defaultOption2.selected = true; // 기본 옵션을 선택 상태로 설정
						selectElement2.appendChild(defaultOption2);

						if (!selectedUpperRegionId) {
							// 상위 지역이 선택되지 않은 경우 하위 지역 목록을 표시하지 않음
							return;
						}

						// 선택된 상위 지역에 해당하는 하위 지역 목록 가져오기
						var dcoList = scoMap.get(selectedUpperRegionId) || [];

						dcoList.forEach(function(dcoItem) {
							var option2 = document.createElement('option');
							option2.value = dcoItem["DCO_ID"];
							option2.textContent = dcoItem["DCO_VALUE"];
							option2.setAttribute('data-scoid', selectedUpperRegionId);
							if (dcoItem["DCO_VALUE"] === productLocationValue) {
								option2.selected = true;  // 불러온 하위 지역과 일치하는 항목을 선택
							}
							selectElement2.appendChild(option2);
						});
					}

					// 상위 지역 선택 시 이벤트 처리
					selectElement1.addEventListener('change', function() {
						var selectedUpperRegionId = this.value;
						updateLowerRegions(selectedUpperRegionId);
					});

					// 페이지 로드 시 초기 하위 지역 목록 업데이트
					var initialSelectedUpperRegionId = selectElement1.value || null;
					updateLowerRegions(initialSelectedUpperRegionId);
				},
				error: function(xhr, status, error) {
					console.error('Error occurred:', error);
				}
			});


			// 상품 상태 버튼 생성 및 기본 값 설정
			$.ajax({
				url: '/getProductState',
				type: 'GET',
				success: function(data) {
					var productStateDiv = document.getElementById('productState_depth');
					productStateDiv.innerHTML = '';

					data.forEach(function(item) {
						var button = document.createElement('button');
						button.type = 'button';
						button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
						button.textContent = item["DCO_VALUE"];

						button.setAttribute('data-stateid', item["DCO_ID"]);
						button.setAttribute('data-scoid', item["SCO_ID"]);
						button.setAttribute('data-mcoid', item["MCO_ID"]);

						if (item["DCO_ID"] === productState) {
							button.classList.add('text-white', 'bg-jngreen', 'border-jngreen', 'selected');
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

			// 판매 타입 버튼 생성 및 기본 값 설정
			$.ajax({
				url: '/getProductType',
				type: 'GET',
				success: function(data) {
					var productTypeDiv = document.getElementById('productType_depth');
					productTypeDiv.innerHTML = '';

					data.forEach(function(item) {
						var button = document.createElement('button');
						button.type = 'button';
						button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
						button.textContent = item["DCO_VALUE"];

						button.setAttribute('data-typeid', item["DCO_ID"]);

						if (item["DCO_ID"] === productType) {
							button.classList.add('text-white', 'bg-jngreen', 'border-jngreen', 'selected');
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

			// 네고 여부 버튼 생성 및 기본 값 설정
			$.ajax({
				url: '/getProductNego',
				type: 'GET',
				success: function(data) {
					var productNegoDiv = document.getElementById('productNego_depth');
					productNegoDiv.innerHTML = '';

					data.forEach(function(item) {
						var button = document.createElement('button');
						button.type = 'button';
						button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
						button.textContent = item["DCO_VALUE"];

						button.setAttribute('data-negoid', item["DCO_ID"]);

						if (item["DCO_ID"] === productNego) {
							button.classList.add('text-white', 'bg-jngreen', 'border-jngreen', 'selected');
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

			// 판매 상태 버튼 생성 및 기본 값 설정
			$.ajax({
				url: '/getProductStatus',
				type: 'GET',
				success: function(data) {
					var productStatusDiv = document.getElementById('productStatus_depth');
					productStatusDiv.innerHTML = '';

					data.forEach(function(item) {
						var button = document.createElement('button');
						button.type = 'button';
						button.classList.add('h-10', 'w-[80px]', 'rounded-md', 'border', 'border-solid', 'font-semibold', 'text-base', 'mb-2');
						button.textContent = item["DCO_VALUE"];

						button.setAttribute('data-statusid', item["DCO_ID"]);

						if (item["DCO_ID"] === productStatus) {
							button.classList.add('text-white', 'bg-jngreen', 'border-jngreen', 'selected');
						} else {
							button.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
						}

						button.addEventListener('click', function() {
							var selectedButton = document.querySelector('#productStatus_depth .selected');
							if (selectedButton) {
								selectedButton.classList.remove('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
								selectedButton.classList.add('text-jnblack', 'bg-white', 'border-jnblack');
							}

							this.classList.add('selected', 'text-white', 'bg-jngreen', 'border-jngreen');
							this.classList.remove('text-jnblack', 'bg-white', 'border-jnblack');
						});

						productStatusDiv.appendChild(button);
					});
				},
				error: function(xhr, status, error) {
					console.error('Error occurred while fetching product status:', error);
				}
			});

			// 상품 제목을 해당 input에 설정
			$('#productTitle').val(productTitle);

			// 상품 가격을 해당 input에 설정
			$('#productPrice').val(productPrice);

			// 상품 내용을 해당 input에 설정
			$('#productDescription').val(productContent);
		},
		error: function(error) {
			console.error('Error fetching product data:', error);
		}
	});

	// 이미지 파일 추가 이벤트 처리
	$('#imageInput').on('change', function(event) {
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
			currentImageCount++; // 이미지 갯수 증가
			updateImageCountDisplay(); // 이미지 갯수 업데이트

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
				$('#imageList').append(liElement);
			};
			reader.readAsDataURL(file);
		});
	});

	// 폼 제출 시 수정된 데이터 전송
	$('#modifyProductForm').on('submit', function(e) {
		e.preventDefault();
		const formData = new FormData(this);
		formData.append('proNo', proNo); // 상품 번호 추가

		// 선택된 카테고리
		const categorySelect = document.getElementById('categoryList');
		const selectedCategoryOption = categorySelect.options[categorySelect.selectedIndex];
		formData.append('categoryDcoId', selectedCategoryOption.value);

		// 선택된 지역
		const locationSelect = document.getElementById('locationList2');
		const selectedLocationOption = locationSelect.options[locationSelect.selectedIndex];
		formData.append('locationDcoId', selectedLocationOption.value);

		// 선택된 상품 상태
		const selectedStateButton = document.querySelector('#productState_depth .selected');
		formData.append('stateDcoId', selectedStateButton.getAttribute('data-stateid'));

		// 선택된 판매 타입
		const selectedTypeButton = document.querySelector('#productType_depth .selected');
		formData.append('typeDcoId', selectedTypeButton.getAttribute('data-typeid'));

		// 선택된 네고 여부
		const selectedNegoButton = document.querySelector('#productNego_depth .selected');
		formData.append('negoDcoId', selectedNegoButton.getAttribute('data-negoid'));

		// 선택된 판매 상태
		const selectedStatusButton = document.querySelector('#productStatus_depth .selected');
		formData.append('statusDcoId', selectedStatusButton.getAttribute('data-statusid'));

		// 기존 이미지 파일 목록을 콤마로 구분된 문자열로 변환하여 추가
		let remainingImagesArray = existingImages.filter(image => !deletedFiles.includes(image));
		formData.append('remainingImages', remainingImagesArray.join(','));

		// 삭제된 이미지 목록도 동일하게 처리
		formData.append('deletedImages', deletedFiles.join(','));

		// 새로 추가된 이미지 파일 추가 (키 이름을 'media'로 유지)
		if (selectedFiles.length > 0) {
			selectedFiles.forEach(file => {
				formData.append('media', file);
			});
		} else {
			// 이미지를 업로드하지 않더라도 빈 Blob을 전송하여 'media' 파라미터를 포함시킴
			formData.append('media', new Blob());
		}

		// 수정 요청을 AJAX로 전송
		$.ajax({
			url: '/updateProduct',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				alert('상품 수정이 완료되었습니다.');
				window.location.href = response.redirectUrl;
			},
			error: function(error) {
				console.error('상품 수정 중 오류 발생:', error);
				alert('상품 수정에 실패했습니다.');
			}
		});
	});

	$('#backButton').on('click', function() {
		window.history.back();
	});

});
