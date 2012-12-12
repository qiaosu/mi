define(function(require, exports){
    var mi = require("../../system/core/mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.log.info("system.utils.setup initialize...");

    /** include util type */
    require("./type");

    /** include util is_class */
    require("./is_class");

    /** include util copy */
    require("./copy");

    /** include util is */
    require("./is");

    /** include util date */
    require("./date");

    /** include util mix */
    require("./mix");

    /** include util rmb */
    require("./rmb");

    /** include util trim */
    require("./trim");

    /** include util fx */
    require("./fx");

    /** include util delay */
    require("./delay");

    /** include util array */
    require("./array");

    /** include util aop */
    require("./aop");

    /** include util method */
    require("./method");

    /** include util after */
    require("./after");

    /** include util before */
    require("./before");

    /** include util each */
    require("./each");

    /** include util map */
    require("./map");

    /** include util filter */
    require("./filter");

    /** include util index_of */
    require("./index_of");

    /** include util list */
    require("./list");

    /** include util dataToTree */
    require("./data_to_tree");

    /** include uri */
    require("./uri");


    mi.dispatcher.trigger(SystemCoreEvent.UTIL_SETUP_FINISHED);
})