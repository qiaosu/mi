define(function(require){
    var mi = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    /**
     * create utils
     * @name util
     * @param {String} theUtilName the util name
     * @param {Function} [theUtilValue] the util function
     * @param {Boolean} [mixed] weither mix to core as a static method
     * @return {Object} the util which created just now
     */
    mi.set("util", (function(){
        var _utils = {};
        return function(theUtilName, theUtilValue, mixed){
            var args = arguments.length;
            if(args.length == 0){
                throw new Error("parameter error!");
            } else if(args == 1){
                return _utils[theUtilName];
            } else {
                _utils[theUtilName] = theUtilValue;

                if(mixed){
                    mi.set(theUtilName, theUtilValue);
                }

                mi.log.info("utils."+theUtilName + " added"  + (mixed? " and mixed to mi" : "") + " successful!");
            }
        }
    }()))

    mi.dispatcher.trigger(SystemCoreEvent.UTIL_SET_FINISHED);

    mi.log.info("system.core.util set successful!");

})

