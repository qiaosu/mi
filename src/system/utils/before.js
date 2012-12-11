define(function(require){
    var mi = require("../core/mi");

    var _method = mi.util("method");

    /**
     * wrap a callbacks before method executed
     * @name before
     * @param {String} method
     * @param {Function|Array} callback callback list
     * @return {Function}
     */
    mi.util("before", function(method, callback){
        return _method(method, callback, "before", this);
    }, true);
})