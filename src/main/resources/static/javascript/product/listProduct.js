$(document).ready(function() {
	$.ajax({
		url: '/getSortList',
		type: 'GET',
		success: function(data) {
			// 응답 데이터를 받아와서 각각의 DCO_ID, DCO_VALUE로 <li>와 <button>을 생성
			let sortListContainer = $('.inline-flex'); // <ul> 태그 선택

			// 기존 내용을 비우기 (필요한 경우)
			sortListContainer.empty();

			// 응답으로 받은 data 배열을 순회
			data.forEach(function(item) {
				// <li> 요소 생성
				let listItem = $('<li>')
					.addClass("text-sm leading-[17px] font-medium text-jnGray-900")
					.append(
						$('<button>')
							.addClass("px-2 sort-btn") // 정렬 버튼에 클래스 추가
							.text(item.DCO_VALUE) // DCO_VALUE를 버튼 텍스트로 설정
							.attr("data-id", item.DCO_ID) // DCO_ID를 data-id 속성에 저장
							.attr("data-sort-type", mapSortType(item.DCO_ID)) // DCO_ID에 따른 data-sort-type 설정
					);

				// <li> 요소에 스타일 적용 (마지막 요소 처리)
				listItem.addClass("[&:not(:last-child)]:after:content-['']")
					.addClass("after:inline-block after:border after:border-jnGray-300 after:h-[10px]")
					.addClass("[&:last-of-type]:after:border-none");

				// 생성한 <li>를 <ul>에 추가
				sortListContainer.append(listItem);
			});
		},
		error: function(xhr, status, error) {
			console.error('Sort list load error:', error);
		}
	});

	function mapSortType(dcoId) {
		console.log('Received dcoId:', dcoId);
		switch (dcoId) {
			case 'ARD1': return 'views';        // 조회순
			case 'ARD2': return 'date';         // 최신순
			case 'ARD3': return 'price_high';   // 높은 가격순
			case 'ARD4': return 'price_low';    // 낮은 가격순
			default: return 'views';              // 기본값은 조회순
		}
	}

	$.ajax({
		url: '/listMainProducts', // 조회순으로 정렬된 리스트를 가져오는 API
		type: 'GET',
		data: { page: 0, size: 20 }, // 페이지와 사이즈를 조정할 수 있음
		success: function(data) {
			console.log(data); // 응답 데이터 확인
			data.forEach(function(product) {
				console.log(product.proTitle); // 각 제품의 필드 확인
			});

			let productListContainer = $('.search-results'); // UL 태그 선택
			productListContainer.empty();

			// 응답으로 받은 data 배열을 순회
			data.forEach(function(product) {
				// product.proImage가 유효한지 확인
				if (product.proImg) {
					let images = product.proImg.split(','); // PRO_IMAGE 값을 ,로 나눔
					let firstImage = images[0]; // 첫 번째 이미지 파일 선택
					console.log(firstImage);

					let imageUrl = '/images/' + firstImage;
					console.log(imageUrl);

					let productItem = $('<div>')
						.addClass("relative w-full rounded-md overflow-hidden dim pt-[100%] mb-3 md:mb-3.5")
						.append(
							$('<img>')
								.attr('src', imageUrl) 
								.attr('alt', product.proTitle) // alt 속성 설정
								.addClass("w-full h-full object-cover") // 적절한 클래스 추가
						);

					productListContainer.append(productItem);
				} else {
					console.warn('proImage 값이 없습니다:', product);
				}
			});
		},
		error: function(xhr, status, error) {
			console.error('Product list load error:', error);
		}
	});






});


