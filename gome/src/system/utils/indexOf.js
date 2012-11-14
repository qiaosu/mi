define(function(require){
    var _ = require("../core/mi");
    _.util("indexOf", function(theObject, valueOrKey){
        var _array = _.util("array");
        var _is = _.util("is");
        var theObject = _array(theObject);

        if(_is("array", theObject)){
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    if(valueOrKey === theObject[i]){
                        return i;
                    }
                }
            }
            return -1;
        } else if(_is("object", theObject) || _is("function", theObject)){
            for(var attr in theObject){
                if(valueOrKey === attr){
                    return true;
                }
            }
            return false;
        }

        return false;
    }, true)
})