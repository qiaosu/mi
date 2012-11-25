define(function(require){
    var mi = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");


    /**
     * create utils
     * @name model
     * @param {String} theUtilName the util name
     * @param {Function} [theUtilValue] the util function
     * @param {Boolean} [mixed] weither mix to core as a static method
     * @return {Object} the util which created just now
     */
    mi.set("model", (function(){
        var _models = {};
        return function(theModelName, theModelValue){
            var args = arguments.length;
            if(args == 1){
                return _models[theModelName];
            }
            if(args == 2){
                _models[theModelName] = typeof(theModelValue) == "function" ? new theModelValue : theModelValue;

                mi.log.info("models."+theModelName + " added successful!");

                return _models[theModelName];
            }
        }
    }()))

    mi.dispatcher.trigger(SystemCoreEvent.MODEL_SET_FINISHED);

    mi.log.info("system.core.model set successful!");
})
