$(document).on('click', '.chatBtn', function() {
	
	
	let userWidth = window.screen.availWidth;
	let userHeight = window.screen.availHeight;
	
	let width = 500;
	let height = 700;
	
	
	if(userWidth < width) width = userWidth;
	if(userHeight < height) height = userHeight;
	
	
	let left = (userWidth - width) / 2;
	let top = (userHeight - height) / 2;
	
	let chatRoom = window.open("/myPage/chatRoom",
					 'myWindow',
					 `width=${width},height=${height},
					  resizable=no,
					  top=${top},
					  left=${left}`
				   );
	chatRoom.onresize = () => {
	    // 특정 최대 크기로 제한
	    let maxWidth = chatRoom.outerWidth;
	    let maxHeight = hatRoom.outerHeight;
	    
	    chatRoom.resizeTo(maxWidth, maxHeight);
    }
	 
//	debugger;				 
});
	
	
	
	
	
	
