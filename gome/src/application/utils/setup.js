define(function(require, exports){
    var _ = require("../../system/core/mi");

    var ApplicationCoreEvent = require("../events/application_core_event");

    /**
     * include system utils
     */
    /** include util after */
    require("../../system/utils/after");

    /** include util aop */
    require("../../system/utils/aop");

    /** include util array */
    require("../../system/utils/array");

    /** include util before */
    require("../../system/utils/before");

    /** include util copy */
    require("../../system/utils/copy");

    /** include util delay */
    require("../../system/utils/delay");

    /** include util each */
    require("../../system/utils/each");

    /** include util filter */
    require("../../system/utils/filter");

    /** include util indexOf */
    require("../../system/utils/indexOf");

    /** include util is */
    require("../../system/utils/is");

    /** include util isClass */
    require("../../system/utils/isClass");

    /** include util list */
    require("../../system/utils/list");

    /** include util map */
    require("../../system/utils/map");

    /** include util method */
    require("../../system/utils/method");

    /** include util mix */
    require("../../system/utils/mix");

    /** include util rmb */
    require("../../system/utils/rmb");

    /** include util trim */
    require("../../system/utils/trim");

    /** include util type */
    require("../../system/utils/type");

    /**
     * include application utils
     */
    require("./isOutOfDate");

    _.dispatcher.trigger(ApplicationCoreEvent.UTIL_SET_FINISHED);

})