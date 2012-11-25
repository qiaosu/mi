define(function(require){

    var mi = require("./core/mi");

    var SystemCoreEvent = require("./events/system_core_event");

    mi.log.info("system.setup initialize ...");

    /** setup system core */
    require("./core/setup");

    /**
     *  setup system helpers
     */
    require("./helpers/setup");

    /**
     * setup system libraries
     */
    require("./libraries/setup");

    /**
     * setup system utils
     */
    require("./utils/setup");

    mi.dispatcher.trigger(SystemCoreEvent.SETUP_FINISHED);

})