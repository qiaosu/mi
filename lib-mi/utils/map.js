mi.util("map", function(theObject, callback, context){
    var _array = mi.util("array");
    var _is = mi.util("is");
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
})