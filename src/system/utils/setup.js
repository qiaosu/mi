define(function(require, exports){
    var mi = require("../../system/core/mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.log.info("system.utils.setup initialize...");

    /**
     * include system utils
     */
    /** include util after */
    require("./after");

    /** include util array */
    require("./array");

    /** include util before */
    require("./before");

    /** include util copy */
    require("./copy");

    /** include util delay */
    require("./delay");

    /** include util each */
    require("./each");

    /** include util filter */
    require("./filter");

    /** include util indexOf */
    require("./indexOf");

    /** include util is */
    require("./is");

    /** include util isClass */
    require("./isClass");

    /** include util list */
    require("./list");

    /** include util map */
    require("./map");

    /** include util aop */
    require("./aop");

    /** include util method */
    require("./method");

    /** include util mix */
    require("./mix");

    /** include util rmb */
    require("./rmb");

    /** include util trim */
    require("./trim");

    /** include util type */
    require("./type");

    /** include util date */
    require("./date");

    mi.dispatcher.trigger(SystemCoreEvent.UTIL_SET_FINISHED);
})