/**
 * app
 * @path app.js
 */
define(function(require, exports, module) {

    /**
     * include the core mi, must be include first
     * @type {Function}
     */
    var mi = require("./system/core/mi");

    var SystemCoreEvent = require("./system/events/system_core_event");

    var ApplicationCoreEvent = require("./application/events/application_core_event");

    /**
     * enable console log if console supported
     * @type {Boolean}
     */
    mi.log.enable = true;

    mi.dispatcher.on(SystemCoreEvent.UTIL_SETUP_FINISHED, function(){
        mi.log('system util setup finished!');
    })

    mi.dispatcher.on(ApplicationCoreEvent.UTIL_SETUP_FINISHED, function(){
        mi.log('application util setup finished!');
    })

    /**
     * setup application core which method user want to support
     */
    require("./application/setup");


    var Circle = require("./application/ui/circle");

    var app = function(){

        var divs = document.getElementById("circle").getElementsByTagName("div");

        mi.each(divs, function(div, index){
            new Circle(div).init(index * 500).move();
        });

    };

    module.exports = app;

});
