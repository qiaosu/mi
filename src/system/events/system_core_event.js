define(function(require, exports){
    /**
     * system setup event const
     * @type {Object}
     */
    var SystemCoreEvent = {
        CORE_SETUP_FINISHED: "system_core_setup_finished",
        HELPER_SETUP_FINISHED: "system_helper_setup_finished",
        UTIL_SETUP_FINISHED: "system_util_setup_finished",
        LIBRARY_SETUP_FINISHED: "system_library_setup_finished",
        MODEL_SETUP_FINISHED: "system_model_setup_finished",
        CONTROLLER_SETUP_FINISHED: "system_collection_setup_finished",
        UTIL_SET_FINISHED: "system_core_util_set_finished",
        LIBRARY_SET_FINISHED: "system_library_set_finished",
        HELPER_SET_FINISHED:"system_core_helper_set_finished",
        UI_SET_FINISHED:"system_core_ui_set_finished",
        MODEL_SET_FINISHED:"system_core_model_set_finished",
        CONTROLLER_SET_FINISHED:"system_core_controller_set_finished",
        VIEW_SET_FINISHED:"system_core_view_set_finished",
        COLLECTION_SET_FINISHED:"system_core_collection_set_finished"
    };

    return SystemCoreEvent;
})

