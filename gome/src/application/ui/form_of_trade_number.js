define(function(require){
    var _ = require("../../system/core/mi");
    var UIEvent = require("../events/ui_event");
    var FormEvent = require("../events/form_event");

    return require("./form").extend({
        init : function(){
            var _this = this;
            Loader.use('aralex.validator.ClassicValidator', function() {
                var validatorTradeNo = new aralex.validator.ClassicValidator({
                   itemClass: "mi-form-item",
                   notifyClass: "mi-form-explain",
                   errorClass: "mi-form-item-error",
                   hoverClass: "mi-form-item-hover",
                   focusClass: "mi-form-item-focus",
                   formId: _this.formId,
                   triggerMethod: ["blur"],
                   checkOnSubmit: true,
                   stopSubmit: false,
                   beforeSubmit: function() {
                       _.dispatcher.trigger(FormEvent.BEFORE_SUBMIT);
                   },
                   rules: {
                       "input[name='originTradeNo']" : {
                           type: ['requiredText'],
                           desc: "原交易订单号"
                       }
                   },
                    afterValidateAll: function(){

                    }
               });
                this.validator = validatorTradeNo;
                _this.trigger(UIEvent.LOAD);
            });
        }
    });
})