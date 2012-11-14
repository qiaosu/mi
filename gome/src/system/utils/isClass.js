define(function(require){
    var _ = require("../core/mi");
    _.util("isClass", function(theObject){
        return !!theObject.constructor.isClass;
    }, true)
})