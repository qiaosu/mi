define(function(require){

    var mi = require("../../system/core/mi");

    var ApplicationCoreEvent = require("../events/application_core_event");

    mi.log.info("application.libraries.setup initialize ...");

    mi.dispatcher.trigger(ApplicationCoreEvent.LIBRARY_SETUP_FINISHED);

})