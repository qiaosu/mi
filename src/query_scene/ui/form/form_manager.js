define(function(require){
    var mi = require("../../../system/core/mi");
    var FormEvent = require("../../events/form_event");
    return mi.ui("FormManager", {
        /**
         * current form
         * @type {Class}
         */
        currentForm: null,
        /**
         * forms with {id:value}
         * @type {Object}
         */
        forms : {},
        /**
         * initialize
         * @return {void}
         */
        initialize : function(){
            mi.dispatcher.on(FormEvent.BEFORE_SUBMIT, this.beforeSubmitHandler, this);
            mi.dispatcher.on(FormEvent.VALIDATE_ALL, this.validateAll, this);
        },
        validateAll: function(evt){
            if(this.currentForm && this.currentForm !== evt.data.target){
                this.currentForm.form.removeAttrs("data-current");
                this.currentForm = evt.data.target;
                this.currentForm.form.attr("data-current", "true");
            }
        },
        /**
         * set form
         * @param {Class} theForm
         * @return {Class}
         */
        set : function(theForm){
            var theFormId = theForm.formId;
            if(!this.forms[theFormId]){
                this.forms[theFormId] = theForm;
                if(theForm.isCurrent){
                    this.setCurrentForm(theForm);
                }
            }
            return this.forms[theFormId];
        },
        /**
         * get form by id
         * @param {String} theFormId
         * @return {Class}
         */
        get: function(theFormId){
            return this.forms[theFormId];
        },
        /**
         * get current search form
         * @return {Class}
         */
        getCurrentForm: function(){
            return this.currentForm;
        },
        /**
         * set current search form
         * @param {Class} theForm
         * @return {Class}
         */
        setCurrentForm: function(theForm){
            this.currentForm = theForm;
            return this.currentForm;
        },
        /**
         * add field to current search form
         * @param {Object} theField
         * @return {void}
         */
        addFieldToCurrentForm: function(theField){
            if(this.currentForm){
                this.currentForm.addField(theField);
            }
        },
        /**
         * enable all forms
         * @return {Class}
         */
        enable : function(){
            mi.each(this.forms, function(theForm){
                theForm.enable();
            });
            return this;
        },
        /**
         * disable all forms
         * @return {Class}
         */
        disable : function(){
            var _this = this;
            mi.each(this.forms, function(theForm){
                theForm.disable();
            });

            mi.delay(function(){
                _this.enable();
            }, 1000)();

            return this;
        },
        /**
         * before form submit handler
         * @return {void}
         */
        beforeSubmitHandler : function(evt){
            if(this.currentForm && this.currentForm.resetValue){
                mi.log.info("user data");
                mi.each(this.currentForm.serialize(), function(value, key){
                    mi.log('    ' + key + ":" + value);
                });
                if(mi.is("function", this.currentForm.resetValue)){
                    this.currentForm.resetValue();
                }
                mi.log.info("original data");
                mi.each(this.currentForm.serialize(), function(value, key){
                    mi.log('    ' + key + ":" + value);
                });
            }
            if(this.currentForm && !this.currentForm.isDownloadState){
                this.disable();
            }
        }
    });
})