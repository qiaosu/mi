define(function(require){
    var _ = require("../../system/core/mi");
    var UIEvent = require("../events/ui_event");
    var FormEvent = require("../events/form_event");

    return require("./form").extend({
        init : function(){
            var _this = this;
            Loader.use('aralex.validator.ClassicValidator', function() {
                var validatorDateType = new aralex.validator.ClassicValidator({
                    itemClass: "mi-form-item",
                    notifyClass: "mi-form-explain",
                    errorClass: "mi-form-item-error",
                    hoverClass: "mi-form-item-hover",
                    focusClass: "mi-form-item-focus",
                    formId: _this.formId,
                    triggerMethod: ["blur"],
                    checkOnSubmit: true,
                    stopSubmit: true,
                    beforeSubmit: function() {
                        _.dispatcher.trigger(FormEvent.BEFORE_SUBMIT);
                    },
                    rules: {
                        "select[name='dateType']" : {
                            type: ['requiredText'],
                            desc: "日期类型"
                        },
                        "input[name='dateStart']" : {
                            type: ['requiredText'],
                            desc: "开始日期"
                        },
                        "input[name='dateEnd']" : {
                            type: ['requiredText'],
                            desc: "结束日期"
                        }
                    },
                    beforeValidateAll : function(){

                        this.unValidatedField = [];
                    },
                    afterValidate : function(ele, bValid, errorMsg){
                        if(!bValid){
                            if(typeof(this.unValidatedField) == "undefined"){
                                this.unValidatedField = [];
                            }
                            this.unValidatedField.push({
                                field : ele,
                                message : errorMsg
                            });
                        }
                    },
                    afterValidateAll : function(isValidated){
                         if(isValidated === false){
                             var unValidatedField = this.unValidatedField[0];
                             if(unValidatedField){
                                 if(unValidatedField.field.tagName == "SELECT" && this.unValidatedField.length >= 2){
                                     unValidatedField = this.unValidatedField[1];
                                 }
                                 var ele = unValidatedField.field;
                                 var errorMsg = unValidatedField.message;
                                 var p = this.getParentItem(ele);
                                 p.removeClass(this.hoverClass);
                                p.addClass(this.errorClass);
                                errorMsg && (this.getExplain(ele).node.innerHTML = this._strfix(errorMsg));
                             }
                         } else {
                             var dateStart = $$('input[name=dateStart]', this.domNode)[0];
                             var dateEnd = $$('input[name=dateEnd]', this.domNode)[0];
                             var isOutOfDate = _.isOutOfDate(dateStart.attr("value"), dateEnd.attr("value"));

                             if(isOutOfDate){
                                 var ele = dateStart;
                                 var errorMsg = isOutOfDate == 1 ? "查询区间不能超过1年。" : "起始日期应小于结束日期。";
                                 var p = this.getParentItem(ele);
                                 p.removeClass(this.hoverClass);
                                p.addClass(this.errorClass);
                                errorMsg && (this.getExplain(ele).node.innerHTML = this._strfix(errorMsg));
                             } else {
                                 this.submit();
                             }
                         }
                    }
                });
                this.validator = validatorDateType;
                _this.trigger(UIEvent.LOAD);
            });
        }
    });
})