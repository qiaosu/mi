define(function(require){
    var _ = require("../core/mi");
    /**
     * wrap a callbacks before method executed
     * @param {String} method
     * @param {Function|Array} callback callback list
     * @return {Function}
     */
    _.util("before", function(method, callback){
        var _method = _.util("method");
        return _method(method, callback, "before", this);
    }, true)

})