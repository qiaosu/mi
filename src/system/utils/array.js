define(function(require){
    var mi = require("../core/mi");
    var _copy = mi.util("copy");
    var _is   = mi.util("is");
    /**
     * convert an object to array if success
     * @name array
     * @param {Object} theObject
     * @return {Array|Object}
     */
    mi.util("array", function(theObject){
        var theObjectArray = [];
        if(theObject.callee){
            theObjectArray = _copy(theObject);
        } else if(theObject.item){
            for(var i= 0, len = theObject.length;i<len;i++){
                theObjectArray.push(theObject[i]);
            }
        } else if(_is("array", theObject)){
            theObjectArray = theObject;
        } else {
            return theObject;
        }
        return theObjectArray;
    }, true);

})