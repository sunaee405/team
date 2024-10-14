$(async function() {
	await $.ajax({
        method: 'GET',
        url: '/getCategory',
        dataType: 'json',
        success: (data) => {
			$('body').append(`<table id="bannerTable" border="1 solid black"><tr><td>id</td><td>파일</td><td>코드</td><td>상세정보</td></tr></table>`);
			data.forEach((item) => {
				var line =`<tr> 
							<td class="numId">${item.ID}</td>
							<td><input data-id={item.DCO_ID} class="bannerFile" type="file"></td>
							<td class="dcId">${item.DCO_ID}</td>
							<td class="dcVal">${item.DCO_VALUE}</td>
						   </tr>`
				$('#bannerTable').append(line);
			});
		},
		error: (error) => {
			debugger;
		}
	});
});


$(document).on('click', '#bannerUpload', async function() {
    const selectedFiles = $('.bannerFile').filter(function() {
        return this.files.length > 0;
    });
	//form 형식으로 데이터 저장
    const formFileData = new FormData();
    
    await selectedFiles.each(function() {
        const files = this.files;
        

        // 파일이 비어있으면 리턴
        if (files.length === 0) return;

        const fileExtension = files[0].name.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            alert('지원하지 않는 파일 형식입니다. (jpg, jpeg, png만 가능)');
            return;
        }

        // 현재 테이블의 행에 접근
        const currLine = $(this).parents('tr');
        
        // FormData에 파일 및 관련 데이터 추가
        for(let i = 0; i < files.length; i++) {
            formFileData.append('files[]', files[i]);
            formFileData.append('id[]', currLine.find('.numId').text());
        	formFileData.append('BAN_CODE[]', currLine.find('.dcId').text());
        }
    });
    
        	debugger;
    try {
        fetch('/insertBanner', {
            method: 'POST',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            body: formFileData
        });
        
        debugger;
    } catch (error) {
        console.error('업로드 중 오류 발생:', error);
        alert('업로드 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
});



$(document).on('.bannerFile', 'change', function(event) {
	const file = event.target;
	const imgCk = file.files[0].name.split('.').pop();
	if(!['jpg', 'jpeg', 'png'].includes(imgCk)) {
		file.value = '';
		alert('이미지 파일만 업로드 가능');
		return;
	}	
});