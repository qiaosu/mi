/**
 * app
 * @path app.js
 */
define(function(require, exports, module) {

    /**
     * include the core mi, must be include first
     * @type {Function}
     */
    var mi = require("../system/core/mi");

    var SystemCoreEvent = require("../system/events/system_core_event");

    var ApplicationCoreEvent = require("./events/application_core_event");

    /**
     * enable console log if console supported
     * @type {Boolean}
     */
    mi.log.enable = true;


    /**
     * setup application core which method user want to support
     */
    require("./setup");

    var app = function(){

        mi.log('query scene...');

    };

    module.exports = app;

});
