define(function(require, exports){
    /**
     * system core event const
     * @type {Object}
     */
    var ApplicationCoreEvent = {
        SETUP_FINISHED: "application_core_setup_finished",
        UTIL_SET_FINISHED: "application_core_util_set_finished",
        HELPER_SET_FINISHED:"application_core_helper_set_finished",
        UI_SET_FINISHED:"application_core_ui_set_finished",
        MODEL_SET_FINISHED:"application_core_model_set_finished",
        CONTROLLER_SET_FINISHED:"application_core_controller_set_finished",
        VIEW_SET_FINISHED:"application_core_view_set_finished",
        COLLECTION_SET_FINISHED:"application_core_collection_set_finished"
    };

    return ApplicationCoreEvent;
})

