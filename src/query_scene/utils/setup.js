define(function(require, exports){
    var mi = require("../../system/core/mi");

    var ApplicationCoreEvent = require("../events/application_core_event");

    mi.log.info("application.utils.setup initialize...");

    mi.dispatcher.trigger(ApplicationCoreEvent.UTIL_SETUP_FINISHED);
})