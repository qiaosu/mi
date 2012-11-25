define(function(require, exports){
    var mi = require("../../system/core/mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.log.info("system.utils.setup initialize...");

    /** include util fx */
    require("./type");

    /** include util isClass */
    require("./isClass");

    /** include util map */
    require("./copy");

    /** include util delay */
    require("./is");

    /** include util indexOf */
    require("./date");

    /** include util method */
    require("./mix");

    /** include util rmb */
    require("./rmb");

    /** include util trim */
    require("./trim");

    /** include util before */
    require("./fx");

    /** include util each */
    require("./delay");

    /** include util is */
    require("./array");

    /** include util type */
    require("./aop");

    /** include util aop */
    require("./method");

    /** include util after */
    require("./after");

    /** include util array */
    require("./before");

    /** include util filter */
    require("./each");

    /** include util list */
    require("./map");

    /** include util mix */
    require("./filter");

    /** include util copy */
    require("./indexOf");

    /** include util isClass */
    require("./list");

    mi.dispatcher.trigger(SystemCoreEvent.UTIL_SET_FINISHED);
})