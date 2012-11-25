define(function(require){
    
    var mi = require("../../system/core/mi");

    return mi.ui("DisplayObject", {
        id: "",
        dom: null,
        /**
         * initialize
         * @param {String} id
         * @return {void}
         */
        initialize : function(id){
            if(mi.is("string", id)){
                this.id = id;
            } else if(id.nodeType == 1){
                this.dom = id;
            }
        }
    });
})