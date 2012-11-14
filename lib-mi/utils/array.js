mi.util("array",    function(theObject){
    var theObjectArray = [], _copy = mi.util("copy"), _is = mi.util("is");
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
})