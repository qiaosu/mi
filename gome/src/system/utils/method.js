define(function(require){
    var _ = require("../core/mi");
    /**
     * create before or after callbacks for method
     * @param {String} method the wrap method
     * @param {Function|Array} callback the callbacks
     * @param {String} position the position of wrap method
     * @param {Object} context the method context
     * @return {Function}
     */
    _.util("method", function(method, callback, position, context){
        var originalMethod = context[method], callbacks;
        var _is = _.util("is");
        var _aop = _.util("aop");
        if(originalMethod && _is("function", originalMethod)){
            if(_is("undefined", callback) || _is("object", callback)){
                throw new Error("");
            } else {
                if(!_is("array", callback)){
                    callbacks = [callback];
                } else {
                    callbacks = callback;
                }

                callbacks[position == "before" ? "push" : "unshift"](originalMethod);

                context[method] = _aop(callbacks);

                return context[method];
            }
        }
        return originalMethod;
    }, true)
})