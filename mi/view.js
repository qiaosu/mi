mi.set("view", (function(){
    var _views = {};
    return function(theViewName, theViewValue){
        var args = arguments.length;
        if(args == 0) { throw new Error(""); }
        if(args == 1){
            return _views[theViewName];
        }
        if(args == 2){
            return _views[theViewName] = theViewValue;
        }
    }
}()))

