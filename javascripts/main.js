$(document).ready(function() {
	$('#J_ns_download').on('click', function(e){
		$.ajax({
	    	type: 'POST',
	      	url: /*/\?dev/.test(window.location) ? */'http://localhost:4567', /*: 'http://bootstrap.herokuapp.com'*/
	      	dataType: 'jsonp',
	        params: {
	          	source: 'klass**event'
	        }
	      })
		e.preventDefault();
	});
});
