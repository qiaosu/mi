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

    /**
     * enable console log if console supported
     * @type {Boolean}
     */
    mi.log.enable = true;

    /**
     * setup application core which method user want to support
     */
    require("./application/setup");


    var app = function(){
            mi.log.info('hello app!');
    };

    module.exports = app;

});
