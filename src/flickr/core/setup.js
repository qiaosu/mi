define(function(require){

    var mi = require("../../system/core/mi");

    var ApplicationCoreEvent = require("../events/application_core_event");

    mi.log.info("application.core.setup initialize ...");

    /**
     * application model
     */
    require("./model");

    /**
     * application view
     */
    require("./view");

    mi.dispatcher.trigger(ApplicationCoreEvent.CORE_SETUP_FINISHED);

})