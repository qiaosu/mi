define(function(require){
    var mi = require("../../system/core/mi");

    var ModelEvent = require("../events/model_event");

    var QueryModel = mi.Model.extend({
    	initialize: function(attrs, options){
	        this.supr(attrs, options);
	    },
	    validate: { 
            'tags': /^[\w\W]+$/
	    }
    });

    var queryModel = new QueryModel({
    	'tags': '',
    	'tagmode': 'all',
    	'ids': '',
    	'lang': 'zh-hk'
    })

    return queryModel;

});