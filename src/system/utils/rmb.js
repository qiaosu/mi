define(function(require){
    var mi = require("../core/mi");
    /**
     * convert a number or number string with dot every 3 bit
     * @name rmb
     * @param {String|Number} stringOrNumber
     * @return {String}
     */
    mi.util("rmb", function(stringOrNumber){
        return (stringOrNumber + "").replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,");
    }, true);
})