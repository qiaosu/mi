define(function(require){
    var mi = require("../core/mi");
    var _array = mi.util("array");
    var _is = mi.util("is");
    /**
     * @name indexOf
     * @return {Number|Boolean} return number if theObject is array, return true/false if theObject is object
     */
    mi.util("indexOf", function(theObject, valueOrKey){

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
    }, true);
})