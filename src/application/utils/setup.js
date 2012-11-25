define(function(require, exports){
    var _ = require("../../system/core/mi");

    var ApplicationCoreEvent = require("../events/application_core_event");

    _.log.info("application.utils.setup initialize...");

    /**
     * include application utils
     */
    require("./is_out_of_date");

    _.dispatcher.trigger(ApplicationCoreEvent.UTIL_SET_FINISHED);
})