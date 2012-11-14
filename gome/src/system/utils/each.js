define(function(require){
    var _ = require("../core/mi");
    _.util("each", function(theObject, callback, context){
        var _array = _.util("array");
        var _is = _.util("is");
        var theObject = _array(theObject);

        if(_is("array", theObject)){
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    if(callback.call(context, theObject[i], i, theObject) === false){
                        return false;
                    }
                }
            }
        } else if(_is("object", theObject) || _is("function", theObject)){
            for(var attr in theObject){
                if(callback.call(context, theObject[attr], attr, theObject) === false){
                    return false;
                }
            }
        }

        return true;

    }, true)
})