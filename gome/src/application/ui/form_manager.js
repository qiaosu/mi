define(function(require){
    var _ = require("../../system/core/mi");
    var FormEvent = require("../events/form_event");
    return _.ui("FormManager", {
        forms : {},
        initialize : function(){
            _.dispatcher.on(FormEvent.BEFORE_SUBMIT, this.beforeSubmitHandler, this);
        },
        add : function(theForm){
            var theFormId = theForm.formId;
            if(!this.forms[theFormId]){
                this.forms[theFormId] = theForm;
            }
        },
        enable : function(){
            _.each(this.forms, function(theForm){
                theForm.enable();
            });
        },
        disable : function(){
            _.each(this.forms, function(theForm){
                theForm.disable();
            });
        },
        beforeSubmitHandler : function(){
            this.disable();
        }
    });
})