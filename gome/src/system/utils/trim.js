define(function(require){
    var _ = require("../core/mi");
    _.util("trim", function(stringOrNumber){
        return stringOrNumber+"".replace(/^\s+|\s+$/g, "");
    }, true)
})