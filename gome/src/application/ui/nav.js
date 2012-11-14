define(function(require){
    var _ = require("../../system/core/mi");
    var UIEvent = require("../events/ui_event");
    return _.ui("Nav", {
        id: null,
        initialize : function(id){
            this.id = id;
            if(!this.id){
                throw new Error("nav id must be defined!");
            }
        },
        load : function(){
            var that = this;
            Loader.use('aralex.iNav', function() {
                var nav = new aralex.iNav ({
                    id: that.id /** 之前定义的导航id */
                });
                that.trigger(UIEvent.LOAD);
            });
        }
    });
})