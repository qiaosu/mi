define(function(require){
    var _ = require("../core/mi");
    _.util("filter", function(theObject, callback, context){
        var _array = _.util("array");
        var _is = _.util("is");
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
    }, true)
})