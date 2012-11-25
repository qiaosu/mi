define(function(require){
    var mi = require("../core/mi");
    /**
     * wrap a callbacks after method executed
     * @name after
     * @param {String} method
     * @param {Function|Array} callback callback list
     * @return {Function}
     */
    mi.util("after", function(method, callback){
        var _method = mi.util("method");
        return _method(method, callback, "after", this);
    }, true);

})


