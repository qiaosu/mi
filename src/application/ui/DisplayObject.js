define(function(require){
    
    var mi = require("../../system/core/mi");
    
    var UIEvent = require("../events/ui_event");
    
    return mi.ui("DisplayObject", {
        id: "",
        dom: null,
        /**
         * initialize
         * @param {String} id
         * @return {void}
         */
        initialize : function(id){
            this.id = id;
            if(!this.id){
                throw new Error("component id must be defined!");
            }
        }
    });
})