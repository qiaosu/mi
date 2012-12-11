define(function(require){

    var mi = require("../system/core/mi");

    var ApplicationCoreEvent = require("./events/application_core_event");

    /**
     * system setup
     */
    require("../system/setup");

    mi.log.info("application.setup initialize ...");

    /**
     * application setup
     */
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

    mi.dispatcher.trigger(ApplicationCoreEvent.SETUP_FINISHED);

})