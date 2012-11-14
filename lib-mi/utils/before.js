/**
 * wrap a callbacks before method executed
 * @param {String} method
 * @param {Function|Array} callback callback list
 * @return {Function}
 */
mi.util("before", function(method, callback){
    var _method = mi.util("method");
    return _method(method, callback, "before", this);
})
