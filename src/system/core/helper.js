define(function(require){
    var mi = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    /**
     * create helper
     * @name helper
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

            mi.log.info("window."+theUIName + " added successful!");

            return _helpers[theHelperName];
        }
    }()))

    mi.dispatcher.trigger(SystemCoreEvent.HELPER_SET_FINISHED);

    mi.log.info("system.core.helper set successful!");
})