$(document).ready(function() {
	$('#J_ns_download').on('click', function(e){
		$.ajax({
	    	type: 'POST',
	      	url: /*/\?dev/.test(window.location) ? */'http://0.0.0.0:4567', /*: 'http://bootstrap.herokuapp.com'*/
	      	dataType: 'jsonpi',
	        params: {
	          	source: ['klass','event']
	        }
	      })
		e.preventDefault();
	});
});
