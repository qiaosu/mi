define(function(require){

    var mi = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.log.info("system.core.setup initialize ...");

    /** setup util */
    require("./util");

    /** setup helper */
    require("./helper");

    /** setup library */
    require("./library");

    /** setup ui */
    require("./ui");

    /** setup model */
    require("./model");

    /** setup view */
    require("./view");

    /** setup controller */
    require("./controller");

    /** setup router */
    require("./router");

    mi.dispatcher.trigger(SystemCoreEvent.CORE_SETUP_FINISHED);

})