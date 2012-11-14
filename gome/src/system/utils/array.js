define(function(require){
    var _ = require("../core/mi");
    _.util("array", function(theObject){
        var theObjectArray = [], _copy = _.util("copy"), _is = _.util("is");
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
    }, true)
})