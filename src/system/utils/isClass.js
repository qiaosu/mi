define(function(require){
    var _ = require("../core/mi");
    /**
     * check the object is a class
     * @name isClass
     * @return {Boolean}
     */
    _.util("isClass", function(theObject){
        return !!theObject.constructor.isClass;
    }, true);
})