$(document).on('click', '#bannerUpload', function() {
	const file = $('#bannerFile')[0];
	
	if(file.files.length != 0) {
		const imgCk = file.files[0].name.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png'].includes(imgCk)) return;
        
        
        const reader = new FileReader();
   
		const formFile = new FormData();
        formFile.append('file', file.files[0]);
        
        
        debugger;
		
		$.ajax({
			url: '/insertBanner',
			type: 'POST',
			data: formFile,
			processData: false, // jQuery가 파일 데이터를 문자열로 처리 하지 않도록 설정
            contentType: false, // 텍스트 데이터만 전송 가능한 ajax에서 콘텐츠 유형을 false로 설정하여 파일을 전송 할 수 있도록 변경함
			success: (result) => {
				$('body').append(`<img src="${result}" style="height: 100%; width: 100%;">`);
			},
			error: (error) => {
				
			}
		});
	}
});


$(document).on('change', function(event) {
	const file = event.target;
	const imgCk = file.files[0].name.split('.').pop();
	if(!['jpg', 'jpeg', 'png'].includes(imgCk)) {
		file.value = '';
		alert('이미지 파일만 업로드 가능');
		return;
	}	
});