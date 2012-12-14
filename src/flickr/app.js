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

    /**
     * setup application core which method user want to support
     */
    require("./setup");

    /**
     * setup application ui
     */

    /**
     * setup application models
     */
    require("./models/query")

    /**
     * setup application views
     */

    mi.create('App', {
        initialize: function(){
            mi.log.info('App.init')
        }
    });

    module.exports = mi.App;

});
