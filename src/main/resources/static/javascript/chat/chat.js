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
});
	
