define(function(require){
    var mi = require("../../system/core/mi");

    var ModelEvent = require("../events/view_event");

    delete mi["view"];

    mi.log.info("system.core.view has been unsetted!");

    /**
     * create Application.Model
     */
    mi.create("View", {
        /** 
         * 初始化, 可由子类扩展
         */
        initialize: function(){
            this._id = 'V' + (new Date()).getTime();
        },
        /** 
         * 订阅接口, 自己实现
         */
        subscribe: function(){
        
        },
        /** 
         * 事件绑定, 自己实现
         */
        bind: function(){
        
        }
    });

    mi.log.info("application.core.view set successful!");
})

