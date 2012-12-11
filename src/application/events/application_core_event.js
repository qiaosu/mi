define(function(require, exports){
    /**
     * application setup event const
     * @type {Object}
     */
    var ApplicationCoreEvent = {
        /**
         * applicaiton setup finished event
         */
        SETUP_FINISHED: "application_setup_finished",
        /**
         * application core setup finished event
         */
        CORE_SETUP_FINISHED: "application_core_setup_finished",
        /**
         * application helper setup finished event
         */
        HELPER_SETUP_FINISHED: "application_helper_setup_finished",
        /**
         * application util setup finished event
         */
        UTIL_SETUP_FINISHED: "application_util_setup_finished",
        /**
         * application library setup finished event
         */
        LIBRARY_SETUP_FINISHED: "application_library_setup_finished",
        /**
         * application model setup finished event
         */
        MODEL_SETUP_FINISHED: "application_model_setup_finished",
        /**
         * application collection setup finished event
         */
        CONTROLLER_SETUP_FINISHED: "application_collection_setup_finished",
        /**
         * application core util set finished event
         */
        UTIL_SET_FINISHED: "application_core_util_set_finished",
        /**
         * application core library set finished event
         */
        LIBRARY_SET_FINISHED: "application_core_library_set_finished",
        /**
         * application core helper set finished event
         */
        HELPER_SET_FINISHED:"application_core_helper_set_finished",
        /**
         * application core ui set finished event
         */
        UI_SET_FINISHED:"application_core_ui_set_finished",
        /**
         * application core model set finished event
         */
        MODEL_SET_FINISHED:"application_core_model_set_finished",
        /**
         * application core controller set finished event
         */
        CONTROLLER_SET_FINISHED:"application_core_controller_set_finished",
        /**
         * application core view set finished event
         */
        VIEW_SET_FINISHED:"application_core_view_set_finished",
        /**
         * application core collection set finished event
         */
        COLLECTION_SET_FINISHED:"application_core_collection_set_finished"
    };

    return ApplicationCoreEvent;
})

