define(function(require, exports){
    /**
     * system setup event const
     * @type {Object}
     */
    var SystemCoreEvent = {
        /**
         * system setup finished event
         */
        SETUP_FINISHED: "system_setup_finished",
        /**
         * core setup finished event
         */
        CORE_SETUP_FINISHED: "system_core_setup_finished",
        /**
         * helper setup finished event
         */
        HELPER_SETUP_FINISHED: "system_helper_setup_finished",
        /**
         * util setup finished event
         */
        UTIL_SETUP_FINISHED: "system_util_setup_finished",
        /**
         * library setup finished event
         */
        LIBRARY_SETUP_FINISHED: "system_library_setup_finished",
        /**
         * model setup finished event
         */
        MODEL_SETUP_FINISHED: "system_model_setup_finished",
        /**
         * collection setup finished event
         */
        CONTROLLER_SETUP_FINISHED: "system_collection_setup_finished",
        /**
         * system core util set finished event
         */
        UTIL_SET_FINISHED: "system_core_util_set_finished",
        /**
         * system library set finished event
         */
        LIBRARY_SET_FINISHED: "system_core_library_set_finished",
        /**
         * system helper set finished event
         */
        HELPER_SET_FINISHED:"system_core_helper_set_finished",
        /**
         * system ui set finished event
         */
        UI_SET_FINISHED:"system_core_ui_set_finished",
        /**
         * system model set finished event
         */
        MODEL_SET_FINISHED:"system_core_model_set_finished",
        /**
         * system controller set finished event
         */
        CONTROLLER_SET_FINISHED:"system_core_controller_set_finished",
        /**
         * system view set finished event
         */
        VIEW_SET_FINISHED:"system_core_view_set_finished",
        /**
         * system collection set finished event
         */
        COLLECTION_SET_FINISHED:"system_core_collection_set_finished"
    };

    return SystemCoreEvent;
})

