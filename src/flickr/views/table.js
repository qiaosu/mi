define(function(require){
    var mi = require("../../system/core/mi");

    var $ = require("../../system/libraries/jquery");

    var RouteEvent = require("../events/route_event");

    var ViewEvent = require("../events/view_event");

    var _bind = require("../utils/bind");

    var TableView = mi.View.extend({
        initialize: function(attr){
            this.el = attr.el;
            this.dataArr = [];
            this.subscribe();
            this.bind();
        },
        subscribe: function(){
            mi.dispatcher.on(RouteEvent.RenderData, this.prepare, this);
        },
        bind: function(){
            
        },
        prepare: function(data){
            var items = data.data.data.items, _m;
            for (var item in items) {
                _m = new mi.Model(items[item])
                this.dataArr.push(_m);
            }
            this.render();
        },
        render: function(){
            this.el.empty();
            for (var item in this.dataArr) {
                $(this.dataArr[item].get('description')).appendTo(this.el);
            }
        }
    });

    var tableView = new TableView({
        el: $('#J_views')
    });

    return tableView;

});


