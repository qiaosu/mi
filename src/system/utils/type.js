define(function(require){
    var mi = require("../core/mi");
    /**
     * get theObject's type
     * @name type
     * @param {Object} theObject
     * @return {String}
     */
    mi.util("type", function(theObject){
        return Object.prototype.toString.call(theObject).replace(/([^\s]+\s)|]$/ig, "").toLowerCase();
    }, true);
})