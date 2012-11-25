define(function(require){
    var mi = require("../core/mi");
    var _array = mi.util("array");
    var _is = mi.util("is");

    /**
     * @name filter
     * @return {Array|Object} the new array or new object
     */
    mi.util("filter", function(theObject, callback, context){

        var theObject = _array(theObject), theReturnObject = null;

        if(_is("array", theObject)){
            theReturnObject = [];
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    if(callback.call(context, theObject[i], i, theObject) !== false){
                        theReturnObject.push(theObject[i]);
                    }
                }
            }
        } else if(_is("object", theObject) || _is("function", theObject)){
            theReturnObject = {};
            for(var attr in theObject){
                if(callback.call(context, theObject[attr], attr, theObject) !== false){
                    theReturnObject[attr] = theObject[attr];
                }
            }
        }

        return theReturnObject;
    }, true);
})