define(function(require){
    var _ = require("../core/mi");
    _.util("copy", function(){
        return Array.prototype.slice.call(arguments[0]);
    }, true)
})