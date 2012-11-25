define(function(require){
    var mi = require("../core/mi");
    /**
     * @name delay
     * @return {Function}
     */
    mi.util("delay", function(callback, time){
        var timer = null;
        return function(){
            clearTimeout(timer);
            var context = this, args = arguments;
            timer = setTimeout(function(){
                callback.apply(context, args);
            }, time || 100);
        }
    }, true);
})