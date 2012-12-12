define(function(require){

    var mi = require("../core/mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.log.info("system.libraries.setup initialize ...");

    require("./jquery");

    mi.dispatcher.trigger(SystemCoreEvent.LIBRARY_SETUP_FINISHED);

})