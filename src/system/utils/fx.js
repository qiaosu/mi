define(function(require){
    
    var mi = require("../core/mi");
    /**
     * animation
     * @name fx
     * @param {Function} callback callback
     * @param {Object} opts options
     * @param {Object} callback context
     * @return {Number}
     */
    mi.util("fx", function(callback, opts, context){
        var D = Date, opts = opts || {}, d = +new D, thread, time = opts.time || 480, end = opts.end || D, z;
        var fx = opts.fx || function(x){
            return (x /= 0.5) < 1 ? (0.5 * Math.pow(x, 2)) : (-0.5 * ((x -= 2) * x - 2));
        };

        context = context || opts;
        
        if (opts.init && false === opts.init.call(context)){
            return 0;
        }
        
        function v(f, t){
            return +f + (t - f) * fx(z)
        };

        return thread = setInterval(function(){
            z = Math.min(1, (new D - d) / time);
            if (false === callback.call(context, v, z) || z == 1) 
                end.call(context, opts, clearInterval(thread));
        }, 10);

    }, true);

})


