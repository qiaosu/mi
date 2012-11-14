define(function(require){
    var _ = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    /**
     * create utils
     * @param {String} theUIName the util name
     * @param {Function} [theUIValue] the util function
     * @return {Object} the util which created just now
     */
    _.set("ui", (function(){
        var _uis = {};
        return function(theUIName, theUIValue){
            var args = arguments.length;
            if(args.length == 0){
                throw new Error("");
            } else if(args == 1){
                return _uis[theUIName];
            } else {
                _uis[theUIName] = _(theUIValue);
                return _uis[theUIName];
            }
        }
    }()))

    _.dispatcher.trigger(SystemCoreEvent.UI_SET_FINISHED);
})

