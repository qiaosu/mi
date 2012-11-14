define(function(require){
    var _ = require("../../system/core/mi");

    var ApplicationCoreEvent = require("../events/application_core_event");

    /** setup util */
    require("../../system/core/util.js");

    /** setup helper */
    require("../../system/core/helper.js");

    /** setup ui */
    require("../../system/core/ui.js");

    /** setup model */
    require("../../system/core/model.js");

    _.dispatcher.trigger(ApplicationCoreEvent.SETUP_FINISHED);

})