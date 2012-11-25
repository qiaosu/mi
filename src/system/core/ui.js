define(function(require){
    var mi = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    /**
     * create utils
     * @name ui
     * @param {String} theUIName the util name
     * @param {Function} [theUIValue] the util function
     * @return {Object} the util which created just now
     */
    mi.set("ui", (function(){
        var _uis = {};
        return function(theUIName, theUIValue){
            var args = arguments.length;
            if(args.length == 0){
                throw new Error("");
            } else if(args == 1){
                return _uis[theUIName];
            } else {
                _uis[theUIName] = _(theUIValue);

                mi.log.info("uis."+theUIName + " added successful!");

                return _uis[theUIName];
            }
        }
    }()))

    mi.dispatcher.trigger(SystemCoreEvent.UI_SET_FINISHED);

    mi.log.info("system.core.ui set successful!");
})

