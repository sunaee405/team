$(function() {
	bodyInner();
	$('#proListType>li:first').trigger('click');
});

$(document).on('click', '#deleteMem', function() {
	var confText = `<ol style="list-style-type: decimal; text-align: left;">
						<li>탈퇴 신청일로부터 6개월 동안 동일한 아이디와 휴대폰 번호로 재가입이 불가능하며, 6개월이 경과한 후 계정이 삭제됩니다.</li> <br><br>
						<li>회원 탈퇴 시 본인 계정에 등록된 모든 게시물은 삭제됩니다.</li>
					</ol>
					`

	Swal.fire({
		title: '회원 탈퇴 동의',
		html: confText,
		background: '#fff', // 모달 배경 색상
		color: '#000', // 글자 색상
		confirmButtonColor: '#0AC26E', // 확인 버튼 색상
		cancelButtonColor: '#C0C0C0', // 취소 버튼 색상
		showCancelButton: true,
		confirmButtonText: '회원탈퇴',
		cancelButtonText: '취소'
	}).then((result) => {
		// 취소면 리턴
		if (!result.isConfirmed) return;


		const MEM_RESPITE = new Date();
		// 6개월 더하기
		const MEM_OUT = new Date(MEM_RESPITE); // 현재 날짜를 복사
		MEM_OUT.setMonth(MEM_RESPITE.getMonth() + 6); // 6개월 더해서 삭제일 구하기

		const outDate = {
			'MEM_RESPITE': MEM_RESPITE.toISOString(),
			'MEM_OUT': MEM_OUT.toISOString()
		}


		$.ajax({
			url: '/deleteMember',
			type: 'PUT',
			contentType: 'application/json', // JSON 형식으로 전송
			data: JSON.stringify(outDate), // JSON 문자열로 변환
			success: (data) => {
				// 로그아웃
				if (data == 'success') location.href = '/api/topLogout';
			},
			error: (error) => {
				const errorMsg = error.responseText;
				if (errorMsg == "login") {
					alert('비정상적인 접근 로그인 된 회원이 아닙니다.');
				} else if (errorMsg = 'nullMember') {
					alert('비정상적인 접근 존재하지 않는  회원입니다.');
				}
			}
		});
	});
});


// 페이지 로드시 body 영역
function bodyInner() {
	const nickName = sessionStorage.getItem('memNick');

	var text =
		`<main class="relative flex-grow border-b-2" style="min-height: 0px !important; height: auto !important;">
            <h1 class="a11yHidden">${nickName} 페이지</h1>
            <div class="mx-auto px-4 md:px-8 2xl:px-16 box-content max-w-[1024px] min-[1600px]:max-w-[1280px] justify-between lg:gap-10 flex">
                <div class="hidden lg:block [&amp;_h3]:text-xl [&amp;_ul]:mb-6 [&amp;_li]:w-fit [&amp;_li]:cursor-pointer [&amp;_li]:mb-[10px] [&amp;_li]:text-jnGray-800 [&amp;_li]:text-sm flex-auto flex-shrink flex-grow-0 basis-[180px] mt-[72px]">
                    <h2 class="mb-6 text-2xl font-semibold text-jnBlack">마이 페이지</h2>
                    <h3 class="mb-3 text-lg font-semibold border-t border-[#DADEE5] pt-6 text-jnBlack">내 정보</h3>
                	<ul>
                        <li><a href="/myPage/myData">회원 정보</a></li>
                        <li id="deleteMem">탈퇴하기</li>
                        <li><a href="/myPage/myInquiry">내 문의내역</a></li>
                    </ul>
                </div>
                <div class="mx-auto box-content max-w-[1024px] min-[1600px]:max-w-[1280px] basis-[calc(100%-180px)] flex-grow px-0 md:px-0 2xl:px-0">
                    <div class="block mt-8 lg:mt-[72px] mb-5 lg:mb-0">
                        <div class="relative w-full h-full col-span-2 text-black grid grid-cols-1 gap-y-4 gap-x-0 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6 lg:min-w-[800px]">
                            <div class="flex flex-col space-y-2 justify-start">
                                <div class="flex items-center">
                                    <div class="w-full">
                                        <div class="w-full lg:flex lg:items-center">
                                            <h2 class="mr-3 text-[22px] lg:text-[28px] leading-[39px] font-semibold cursor-pointer inline-block lg:block">${nickName}</h2>
                                            <div class="min-[480px]:relative flex space-x-[6px] mt-1 text-[#787E89] text-[12px] mb-[1px] flex-auto"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-start">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="detailPoint" class="px-0 mt-8 lg:mt-[60px]">
                        <div class="flex flex-col w-full mb-4 lg:mb-5">
                            <h3 class="text-lg font-bold md:text-[22px] text-jnBlack">내 문의내역</h3>
                            <div class="mt-3 mr-0 mb-9 lg:mt-2">
                                <ul id="proListType" class="colors flex flex-nowrap justify-between lg:justify-start -me-3 border-b border-[#DADEE5]">
                                    <li class="shrink grow lg:grow-0 cursor-pointer py-4 basis-[84px] lg:basis-[160px] flex justify-center items-center font-medium transition duration-200 ease-in-out text-black border-b-[2px] border-black">전체 문의내역</li>
                                </ul>
                            </div>
                            <!-- 아래는 추가한 부분입니다. -->
                            <div class="tbl_area">
                                <table cellspacing="0" cellpadding="0" class="tbl_notice_list">
                                    <colgroup>
                                        <col style="width: 40px;">
                                        <col style="width: 120px;">
                                        <col style="width: 560px;">
                                        <col style="">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">번호</th>
                                            <th scope="col">닉네임</th>
                                            <th scope="col" class="tit">제목</th>
                                            <th scope="col">작성 일시</th>	
                                            <th scope="col">답변 여부</th>
                                            <th scope="col">답변 일시</th>
                                        </tr>
                                    </thead>
                                    	<tbody>
                                    	</tbody>
                                </table>
                            </div>
                            <!-- 추가한 부분 끝 -->
                        </div>
                    </div>
                </div>
            </div>
        </main>`;
	$('body').append(text);
}


// 문의내역 값 들고오는 함수 
function selectTable() {
	const memId = sessionStorage.getItem('MEM_ID');
	const memNo = sessionStorage.getItem('memNo');
	$.ajax({
		url: '/members/selectTable',
		type: 'GET',
		dataType: 'json',
		data: { MEM_NO: memNo },
		success: function(data) {
			let tableContent = '';
			data.forEach(function(item) {
				debugger;
				const formattedDate = item.INQ_DATE.split('T')[0];

				tableContent += `
            <tr>
                <td>${item.NUMBER}</td>
                <td>${memId}</td>
                <td>  
                	<a href="/teamproject/inquiry/answer?INQ_TITLE=${item.INQ_TITLE}&
            										 INQ_CONTENT=${item.INQ_CONTENT}&
            										 ANS_CONTENT=${item.ANS_CONTENT}&
          												  ANS_DATE=${item.ANS_DATE}">
               		${item.INQ_TITLE}</a></td>
                <td>${formattedDate}</td>
                <td>${item.RESULT}</td>
                <td>${item.ANS_DATE}</td> 
            </tr>
        `;
			});
			debugger;

			$('.tbl_notice_list tbody').html(tableContent);
		}
	});
}

$(document).ready(function() {
	selectTable();
});






