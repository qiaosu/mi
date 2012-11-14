define(function(require){
    var _ = require("../core/mi");
    _.util("mix", function(theObject, inheritsObject, override) {
        var isOverride = override === void(0) || override;
        if (theObject && inheritsObject) {
            for (var key in inheritsObject) {
                if (isOverride || !(key in theObject)) {
                    theObject[key] = inheritsObject[key];
                }
            }
        }
        return theObject
    }, true)
})