define(function(require){
    var mi = require("../core/mi");

    var _is = mi.util("is");

    var _copy = mi.util("copy");

    /**
     * change arguments, arr to array, but not HTMLElementsCollection
     * @name aop
     * @param {Array|Arguments}
     * @return {Function}
     */
    mi.util("aop", function(){
        var queues = (arguments.length == 1 && _is("array", arguments[0])) ? arguments[0] : _copy(arguments);
        return function(){
            var params = _copy(arguments), lastReturnValue = null;
            for(var i=0, l = queues.length;i<l;i++){
                lastReturnValue = queues[i].apply(this, params.concat(lastReturnValue));
                if(lastReturnValue === false){break;}
            }
            return lastReturnValue;
        }
    }, true);
})