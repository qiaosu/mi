define(function(require){
    var _ = require("../../../system/core/mi");
    var FormEvent = require("../../events/form_event");

    return require("./form").extend({
        /**
         * add query form field
         * @return {void}
         */
        addQueryForm:function(){
            this.addField({
                name:"queryForm",
                value:"byStatusType",
                type: "hidden"
            })
        },
        /**
         * reset the form field value if use doesn't click the submit
         * @return {void}
         */
        resetValue: function(){
            this.setValue('refundStatusType', this.getValue('refundStatusType'));
            this.setValue('statusStartDate', this.getValue('statusStartDate'));
            this.setValue('statusEndDate', this.getValue('statusEndDate'));
        },
        /**
         * init and load aralex.validator.ClassicValidator
         * @return {void}
         */
        init : function(){
            this.addQueryForm();
            this.data = this.serialize();
        }
    });
})