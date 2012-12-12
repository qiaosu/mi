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

    /**
     * enable console log if console supported
     * @type {Boolean}
     */
    mi.log.enable = true;

    require("./setup");

    var JSWorkFlow = require("./tools/js_workflow");

    var CSSWorkFlow = require("./tools/css_workflow");

    var app = function(){
        var jsWorkFlow = new JSWorkFlow();

        jsWorkFlow.implement({
            before: mi.before,
            after: mi.after
        });

        jsWorkFlow.before("readFiles", function(){
            mi.log.warn('before read js files!');
        });
        jsWorkFlow.after("readFiles", function(){
            mi.log.warn("after read js files!");
        });

        jsWorkFlow.execute();

        var cssWorkFlow = new CSSWorkFlow();

        cssWorkFlow.execute();


    };

    module.exports = app;

});
