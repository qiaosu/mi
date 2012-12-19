define(function(require){
    var mi = require("../../system/core/mi");

    var $ = require("../../system/libraries/jquery");

    var RouteEvent = require("../events/route_event");

    var ViewEvent = require("../events/view_event");

    delete mi["route"];

    mi.log.info("system.core.route has been unsetted!");

    /**
     * create Application.Model
     */
    mi.create("Route", {
        initialize: function(url){
            this.url = url;
            this.subscribe();
        },
        subscribe: function(){
            mi.dispatcher.on(ViewEvent.SearchTrigger, this.triggerSearch, this);
            mi.dispatcher.on(RouteEvent.PostCallback, this.split, this);
            mi.dispatcher.on(RouteEvent.DataRenderDone, this.hideLoading, this);
        },
        /**
         * 组装数据到Route
         */
        assemble: function(searchData){
            var data = {};
            mi.mix(data, searchData.data);
            return data;
        },
        /**
         * 分离数据到Model
         */
        split: function(data){
            /**
             * 分离数据.1 渲染searchCore
             */
            //_.searchCore.set(data['search']);
            //_.events.trigger('RENDERSEARCHDATA', data['search']);
            
            /**
             * 分离数据.3 渲染content
             */
            mi.dispatcher.trigger(RouteEvent.RenderData, data);
            //_.events.trigger('RENDERTABLEDATA', data['content']);
        },
        /**
         * ajax处理
         */
        jsonp: function(data){
            var _self = this;
            
            this.showLoading();

            /**
             * 提交请求
             */
            $.getJSON(_self.url + '?' + data + '&format=json&jsoncallback=?', function(data) {
                mi.dispatcher.trigger(RouteEvent.PostCallback, data);
            });
        },
        showLoading: function(){
            //$('J_tableContent').addClass('fn-hide');
            //$$('.table-xbox .loading')[0].removeClass('fn-hide');
        },
        hideLoading: function(){
            //$$('.table-xbox .loading')[0].addClass('fn-hide');
            //$('J_tableContent').removeClass('fn-hide');
        },
        processArgs: function(obj){
            var arr = [], str = "";
            for (var item in obj) {
                arr.push(item+'='+obj[item]);
            }
            str = arr.join('&');
            return str;
        },
        /**
         * 触发提交请求，开始组装数据
         */
        triggerSearch: function(data){
            var _attrs = this.assemble(data);
            this.jsonp(this.processArgs(_attrs));
        }
    });

    var flickrRoute = new mi.Route('http://api.flickr.com/services/feeds/photos_public.gne');
 
    mi.log.info("application.core.route set successful!");

    return flickrRoute;
})

