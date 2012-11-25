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


    var Circle = require("./application/ui/circle");

    var app = function(){

        var divs = document.getElementById("circle").getElementsByTagName("div");

        mi.each(divs, function(div, index){
            new Circle(div).init(index * 30).move();
        });

    };

    module.exports = app;

});
