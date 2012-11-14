mi.util("type", function(theObject){
    return Object.prototype.toString.call(theObject, theObject).replace(/([^\s]+\s)|]$/ig, "").toLowerCase();
})