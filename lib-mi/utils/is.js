mi.util("is", function(theTypeOfObject, theObject){
    var _type = mi.util("type");
    if(theTypeOfObject === "undefined"){
        return typeof(theObject) === theTypeOfObject;
    } else if(theTypeOfObject === "NaN"){
        return isNaN(theObject);
    } else {
        return _type(theObject) === theTypeOfObject;
    }
})