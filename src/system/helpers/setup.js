define(function(require){

    var mi = require("../core/mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.log.info("system.helpers.setup initialize ...");

    mi.dispatcher.trigger(SystemCoreEvent.HELPER_SETUP_FINISHED);

})