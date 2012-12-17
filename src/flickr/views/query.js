define(function(require){
    var mi = require("../../system/core/mi");

    var ViewEvent = require("../events/view_event");

    var QueryView = mi.View.extend({
        initialize: function(attr){
            this.el = attr.el;
            this.model = attr.model;
            this.subscribe();
            this.bind();
        },
        subscribe: function(){
            
        },
        bind: function(){
            this.el.query('input[type="button"]').on('click', this.go);
        },
        /**
         * todo
         * @param {Object} data
         */
        render: function(data){
        },
        go: function(e){
            console.log('gogogo');
            /*
            _.searchCore.set({
                'startDate': $('J_startDate').attr('value'),
                'endDate': $('J_endDate').attr('value')
            });
            _.events.trigger('SEARCHTRIGGER');
            */
            e.stopEvent();
        },
        showError: function(arg){
            window.console && console.log && console.log(arg);
        }
    });

    return QueryView;

});


