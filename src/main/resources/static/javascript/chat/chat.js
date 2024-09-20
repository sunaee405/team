$(document).on('click', '.chatBtn', function() {
	
	let userWidth = window.screen.availWidth;
	let userHeight = window.screen.availHeight;
	
	let width = 400;
	let height = 600;
	
	
	if(userWidth < width) width = userWidth;
	if(userHeight < height) height = userHeight;
	
	
	let left = (userWidth - width) / 2;
	let top = (userHeight - height) / 2;
	
	
	
	const selMember = encodeURIComponent($('#selMember').val());
	const url = `/myPage/chatRoom?selMember=${selMember}`
	
	let chatRoom = window.open(url,
					 'chatRoom',
					 `width=${width},height=${height},
					  resizable=no,
					  top=${top},
					  left=${left},
					  toolbar=no,
					  menubar=no,
					  location=no,
					  status=no`
				   );
					   
//	chatRoom.onresize = () => {
//	    // 특정 최대 크기로 제한
//	    let maxWidth = chatRoom.outerWidth;
//	    let maxHeight = chatRoom.outerHeight;
//	    
//	    chatRoom.resizeTo(maxWidth, maxHeight);
//    }


// 페이지 스크립트로 html 구현 ===========================================================
//	// 페이지에 css 추가
//	$('<link>').attr('href', '/static/css/chat/chat.css')
//		   .attr('rel', 'stylesheet')
//		   .attr('type', 'text/css')
//		   .appendTo('head');
//		   
//	//요청을 보낼 URL
//	const roomUrl = '/chatRoom';
//	// 요청 옵션
//	const options = {
//	    method: 'GET',
//	    headers: {
//			'X-Requested-With': 'XMLHttpRequest', // 필터링에서 ajax 요청으로 인식하도록 헤더 설정
//	        'Content-Type': 'application/json' // 요청의 데이터 형식
//	    },
//	    body: JSON.stringify({
//	        user1: 1 // 판매자 id값
//	    })
//	};
//	
//	// fetch 요청 보내기
////	fetch(roomUrl, options)
////	    .then(response => response.json()) // 응답을 JSON으로 변환
////	    .then(success => {
////			
////			
////	    })
////	    .catch(error => {
////			
////	    });
//    
////	fetch('chat.html')
////		.then(response => response.text())
////        .then(data => {
////            body.append(data);
////        });
//	
//    $('body').append(`
//        <div class="chatRoom">
//            <div id="messageArea">
//            	<ul class="messages">
//            		
//            	</ul>
//            </div>
//            <div class="inputArea">
//                <input type="text" id="chatInput" maxlength="200">
//                <button id="sendButton">전송</button>
//            </div>
//        </div>
//    `);
//
//    // 채팅창 크기 제한 함수
//    function resizeChatRoom() {
//		let maxWidth = 400;
//		let maxHeight = 600;
//		
//		const screenWidth = window.screen.width;
//		const screenHeight = window.screen.height;
//		
//		if(maxHeight > screenHeight) maxHeight = screenHeight;
//		if(maxWidth > screenWidth) maxWidth = screenWidth; 
//
//        $('.chatRoom').css({
//            'width': maxWidth + 'px',
//            'height': maxHeight + 'px'
//        });
//    }
//
//    // 크기 조절
//    resizeChatRoom();

    // 창 크기 조절 시 크기 제한 적용
//    $(window).resize(resizeChatContainer);

	 
//	debugger;				 
});
	
	
	
	
	
	
