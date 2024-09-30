$(function () {
	fetch('/getSession', {
		headers: {'X-Requested-With': 'XMLHttpRequest'}
	})
    .then(response => response.json())
    .then(data => {
		if(data != null && data.length != 0) {
			sessionStorage.setItem('memId', data.mem_id);
			sessionStorage.setItem('memNo', data.mem_no);
			sessionStorage.setItem('memNick', data.mem_nick);
		} else {
			sessionStorage.clear();
		}
		$(document).trigger('sessionLoaded');
    })
    .catch(error => {
		console.error('Error:', error)
	});
})


