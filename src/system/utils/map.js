define(function(require){
    var mi = require("../core/mi");
    var _array = mi.util("array");
    var _is = mi.util("is");
    /**
     * process theObject each value with callback
     * @name map
     * @param {Object} theObject
     * @param {Function} callback
     * @param {Object} context
     * @return {Object}
     */
    mi.util("map", function(theObject, callback, context){

        var theObject = _array(theObject);

        if(_is("array", theObject)){
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    theObject[i] = callback.call(context, theObject[i], i, theObject);
                }
            }
        } else if(_is("object", theObject) || _is("function", theObject)){
            for(var attr in theObject){
                theObject[attr] = callback.call(context, theObject[attr], attr, theObject);
            }
        }
        return theObject;

    }, true);
})