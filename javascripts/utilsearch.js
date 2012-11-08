$(document).ready(function() {
	

	$('#J_utility_search').on('click', function(e){
		//check submit data
		var tag;
		tag = $('input[name="tag"]').val().trim();
		tag = tag.split(' ')[0];

		console.log(tag);

		$.ajax({
	    	type: 'POST',
	      	url: /*/\?dev/.test(window.location) ? */'http://0.0.0.0:4567/tag/', /*: 'http://mitoolkit.herokuapp.com',*/
	      	dataType: 'jsonpi',
	        params: {
	          	tag: tag
	        },
	        success: function(data, state, xhr){
	        	console.log(xhr);
	        }
	      })
		e.preventDefault();
	});

	// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
	$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
	  	var url = opts.url;

	  	return {
	    	send: function(_, completeCallback) {
	      		var name = 'jQuery_iframe_' + jQuery.now()
	        	, iframe, form

	      		iframe = $('<iframe>')
	        	.attr('name', name)
	        	.appendTo('head')

	      		form = $('<form>')
	        	.attr('method', opts.type) // GET or POST
	        	.attr('action', url)
	        	.attr('target', name)

	      		$.each(opts.params, function(k, v) {

	        		$('<input>')
	          		.attr('type', 'hidden')
	          		.attr('name', k)
	          		.attr('value', typeof v == 'string' ? v : JSON.stringify(v))
	          		.appendTo(form)
	      		})

	      		$('<input>')
	          		.attr('type', 'hidden')
	          		.attr('name', 'callback')
	          		.attr('value', name)
	          		.appendTo(form)

	      		form.appendTo('body').submit()
	    	}
	  	}
	});

	var view = {
		showError: function(msg){
			var tgt = $('input[name="tag"]').next('.item-explain');
			tgt.html(msg);
			tgt.addClass('error');
		}
	}
});
