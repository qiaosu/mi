/**
 * create helper
 * @param {String} theName
 * @param {Object} [theValue]
 * @return {Object}
 */
mi.set("helper", (function(){
    var _helpers = {};
    return function(theHelperName, theHelperValue){
        if(arguments.length == 0){
             throw new Error("");
         } else if(arguments.length == 1){
             return _helpers[theHelperName];
         }

         if(window[theHelperName]){
             throw new Error("");
         }

         window[theHelperName] = theHelperValue;

         /** store the helper */
         _helpers[theHelperName] = theHelperValue;

         return _helpers[theHelperName];
    }
}()))