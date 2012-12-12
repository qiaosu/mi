define(function(require){
    var mi = require("../../system/core/mi");

    return require("./form").extend({
        /**
         * add query form field
         * @return {void}
         */
        addQueryForm:function(){
            this.addField({
                name:"queryForm",
                value:"byOrderId",
                type: "hidden"
            })
        },
        /**
         * set the original data if user doesn't click submit button
         * @return {void}
         */
        resetValue: function(){
            this.setValue('orderId', this.getValue('orderId'));
        },
        /**
         * init
         * @return {void}
         */
        init : function(){
            this.addQueryForm();
            this.data = this.serialize();
        }
    });
})