define(function(require){
    var _ = require("../core/mi");
    _.util("rmb", function(stringOrNumber){
        return (stringOrNumber + "").replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,");
    }, true)
})