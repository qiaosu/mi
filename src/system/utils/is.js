define(function(require){
    var mi = require("../core/mi");
    var _type = mi.util("type");
    var _is_class = mi.util("isClass");

    /**
     * check the object type
     * @name is
     * @param {String} theTypeOfObject
     * @param {Object} theObject
     * @return {Boolean}
     */
    mi.util("is", function(theTypeOfObject, theObject){

        if(theTypeOfObject === "class"){
            return _is_class(theTypeOfObject);
        } else if(theTypeOfObject === "undefined"){
            return typeof(theObject) === theTypeOfObject;
        } else if(theTypeOfObject === "NaN"){
            return isNaN(theObject);
        } else {
            return _type(theObject) === theTypeOfObject;
        }
    }, true);
})