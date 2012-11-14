define(function(require){
    var _ = require("../core/mi");
    _.util("is", function(theTypeOfObject, theObject){
        var _type = _.util("type");
        var _is_class = _.util("isClass");
        if(theTypeOfObject === "class"){
            return _is_class(theTypeOfObject);
        } else if(theTypeOfObject === "undefined"){
            return typeof(theObject) === theTypeOfObject;
        } else if(theTypeOfObject === "NaN"){
            return isNaN(theObject);
        } else {
            return _type(theObject) === theTypeOfObject;
        }
    }, true)
})