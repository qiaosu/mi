$(document).ready(function() {
	$('.cmdonly input').each(function(i, item){
		$(item).on('click', function(e){
			var len = $('.cmdonly input:checked').length;
			if (len != 0){
				$('#J_ns_download').attr('disabled', 'disabled');
			} else {
				$('#J_ns_download').removeAttr('disabled');
			}
		});
	})

	$('#J_ns_download').on('click', function(e){
		//check submit data
		var ns, source=[];
		ns = $('input[name="namespace"]').val().trim();
		if (ns === '') {
			view.showError('namespace is required.');
			return false;
		}
		if (!ns.match(/^[a-zA-Z_]+$/)) {
			view.showError('please use "a-z, A-Z, or _".');
			return false;
		}

		source.push($('input[name="class"]:checked').val());
		$('input[type="checkbox"]:checked').each(function(i,item){
			source.push(item.value);
		});

		$.ajax({
	    	type: 'POST',
	      	url: /*/\?dev/.test(window.location) ? 'http://10.5.17.108:4567', :*/ 'http://mitoolkit.herokuapp.com',
	      	dataType: 'jsonpi',
	        params: {
	          	source: source.toString(),
	          	namespace: ns
	        }
	      })
		e.preventDefault();
	});

	$('#J_cmd_download').on('click', function(e){
		e.preventDefault();
		alert('not published. :-)');
	});

	$('#J_ns_download').removeAttr('disabled');

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

	      		form.appendTo('body').submit()
	    	}
	  	}
	});

	var view = {
		showError: function(msg){
			var tgt = $('input[name="namespace"]').next('.item-explain');
			tgt.html(msg);
			tgt.addClass('error');
		}
	}
});
