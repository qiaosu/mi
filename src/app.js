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
        
        var red = new Circle("circle");
        red.move();

        var blue = new Circle("circle_blue");
        blue.time = 1000;
        blue.pos = [[0, 0], [300, 0], [300, 300], [0, 300]];
        mi.delay(function(){
            blue.move();
        }, 1000)();

        var green = new Circle("circle_green");
        green.time = 800;
        green.pos = [[0, 0], [400, 0], [400, 400], [0, 400]];
        mi.delay(function(){
            green.move();
        }, 1500)();

    };

    module.exports = app;

});
