define(function(require){
    var mi = require("../core/mi");
    /**
     * trim string's blanks
     * @name trim
     * @param {String} stringOrNumber
     * @return {String}
     */
    mi.util("trim", function(stringOrNumber){
        return stringOrNumber+"".replace(/^\s+|\s+$/g, "");
    }, true);
})