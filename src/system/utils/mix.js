define(function(require){
    var mi = require("../core/mi");
    /**
     * mix an objects's value to another
     * @name mix
     * @param {Object} theObject
     * @param {Object} inheritsObject
     * @param {Boolean} override
     * @return {Object}
     */
    mi.util("mix", function(theObject, inheritsObject, override) {
        var isOverride = override === void(0) || override;
        if (theObject && inheritsObject) {
            for (var key in inheritsObject) {
                if (isOverride || !(key in theObject)) {
                    theObject[key] = inheritsObject[key];
                }
            }
        }
        return theObject
    }, true);
})