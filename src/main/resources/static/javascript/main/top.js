$(function() {
	$.ajax({
		method: 'GET',
		url: '/getCategory',
		dataType: 'json',
		success: (data) => {
			
			data.forEach((data) => {
				let htmlText = 
					`<li>
		            	<a class="flex items-center py-2 ps-5 xl:ps-7 pe-3 xl:pe-3.5 hover:text-heading hover:bg-gray-300" href="/search?category=1">${data.DCO_VALUE}</a>
		             </li>`
				
				$('#categoryList').append(htmlText);
			});
		},
		error: (error) => {
			
		}
	});
	
});