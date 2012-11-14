define(function(require){
    var _ = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    /**
     * create utils
     * @param {String} theUtilName the util name
     * @param {Function} [theUtilValue] the util function
     * @param {Boolean} [mixed] weither mix to core as a static method
     * @return {Object} the util which created just now
     */
    _.set("util", (function(){
        var _utils = {};
        return function(theUtilName, theUtilValue, mixed){
            var args = arguments.length;
            if(args.length == 0){
                throw new Error("");
            } else if(args == 1){
                return _utils[theUtilName];
            } else {
                _utils[theUtilName] = theUtilValue;

                if(mixed){
                    _.set(theUtilName, theUtilValue);
                }
            }
        }
    }()))

    _.dispatcher.trigger(SystemCoreEvent.UTIL_SET_FINISHED);

})

