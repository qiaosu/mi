define(function(require){
    var mi = require("../core/mi");
    /**
     * @name copy
     * @return {Array}
     */
    mi.util("copy", function(){
        return Array.prototype.slice.call(arguments[0]);
    }, true);
})