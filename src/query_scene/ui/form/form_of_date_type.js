define(function(require){
    var _ = require("../../../system/core/mi");

    return require("./form").extend({
        /**
         * add query form field
         * @return {void}
         */
        addQueryForm:function(){
            this.addField({
                name:"queryForm",
                value:"byDateType",
                type: "hidden"
            })
        },
        /**
         * reset form field value if user doesn't click submit button
         * @return {void}
         */
        resetValue: function(){
            this.setValue('dateType', this.getValue('dateType'));
            this.setValue('startDate', this.getValue('startDate'));
            this.setValue('endDate', this.getValue('endDate'));
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