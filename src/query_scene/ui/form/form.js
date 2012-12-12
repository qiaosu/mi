define(function(require){
    var mi = require("../../../system/core/mi");

    var FormEvent = require("../../events/form_event");

    return mi.ui("Form", {
        formId: '',
        submitButtonId:'',
        form:null,
        submitButton: null,
        button:null,
        currentValueKey: 'data-current',
        isCurrent: false,
        isDownloadState: false,
        data:{},
        /**
         * initialize
         * @param {String} theFormId
         * @param {String} theSubmitButtonId
         * @return {void}
         */
        initialize : function(theFormId, theSubmitButtonId){
            this.formId = theFormId;
            this.submitButtonId = theSubmitButtonId;
            this.form = $(this.formId);
            this.submitButton = $(theSubmitButtonId);
            this.button = $$("input", this.submitButton)[0];
            this.isCurrent = !!this.form.attr(this.currentValueKey);
            this.bind();
        },

        submitHandler: function(evt){
            mi.dispatcher.trigger(FormEvent.BEFORE_SUBMIT);
            evt.stopEvent();
        },

        bind: function(){
            E.on(this.form, 'submit', this, this.submitHandler);
            E.on(this.submitButton, 'click', this, this.submitFormClickHandler);
        },

        /**
         * form submit button enable
         * @return {void}
         */
        enable: function(){
            this.submitButton.removeClass("mi-button-morange-disabled");
            this.button.removeAttrs("disabled");
        },
        /**
         * form submit button diable
         * @return {void}
         */
        disable: function(){
            this.submitButton.addClass("mi-button-morange-disabled");
            this.button.attr("disabled", "disabled");
        },
        /**
         * reset form action to search
         * @param {Object} evt arale event object
         * @return {void}
         */
        submitFormClickHandler: function(evt){
            /**
             * reset form action
             */
            this.setActionToSearch();

            /**
             * reset form data
             * @type {Object}
             */
            this.data = this.serialize();

            mi.dispatcher.trigger(FormEvent.VALIDATE_ALL, {target: this});

        },
        /**
         * serialize form field value
         * @param {Object} theFormObject
         * @param {Boolean} encode
         * @return {Object}
         */
        serialize : function(theFormObject, encode){
            var theForm, theFormElements, theFormData = {};
            theFormObject = theFormObject || this.form;
            theForm = theFormObject.node ? theFormObject.node : theFormObject;
            theFormElements = theForm.elements;
            mi.each(theFormElements, function(theFormElement){
                var theFieldValue = false;
                if(theFormElement.name && theFormElement.name != "_form_token"){
                    if (/select/i.test(theFormElement.type)) {

                        theFieldValue = theFormElement.selectedIndex > -1 ? theFormElement.value : false

                    } else if (/checkbox|radio/i.test(theFormElement.type)) {
                        theFieldValue = theFormElement.checked !== false ? theFormElement.value : false
                    } else{
                        theFieldValue = theFormElement.value
                    }
                    if (theFieldValue !== false) {
                        theFormData[theFormElement.name] = encode ? encodeURIComponent(theFieldValue) : theFieldValue;
                    }
                }
            }, this);
            return theFormData;
        },
        /**
         * add field to form
         * @param {Object} fieldConfig
         * @return {void}
         */
        addField: function(fieldConfig, reCreated){
            var fieldConfig = fieldConfig || {};
            var fieldParent = this.form.node, field;
            if(!fieldConfig.name){return;}
            if(typeof(fieldParent[fieldConfig.name]) != "undefined"){
                this.setValue(fieldConfig.name, fieldConfig.value || "");
            } else {
                if(fieldConfig.appendTo){
                    fieldParent = fieldConfig.appendTo;
                    delete fieldConfig.appendTo;
                }
                try{
                    field = document.createElement('<input name="'+fieldConfig.name+'" />');
                    delete fieldConfig.name;
                }catch(ex){
                    field = document.createElement("INPUT");
                }
                mi.each(fieldConfig, function(value, key){
                    field.setAttribute(key, value);
                });
                fieldParent.appendChild(field);
            }
        },
        /**
         * set field value
         * @param {String} fieldName
         * @param {Object} fieldValue
         * @return {void}
         */
        setValue : function(fieldName, fieldValue){
            if(arguments.legnth < 2){
                throw new Error("form.setValue have two arguments!");
            }
            var field = this.form.node[fieldName];
            if(field){
                switch(field.type.toLowerCase()){
                    case "select":
                        mi.each(field.options, function(option, index){
                            if(option.value == fieldValue){
                                field.selectedIndex = index;
                            }
                        }, this);
                        break;
                    case "checkbox":
                    case "radio":
                        field.checked = fieldValue;
                        break;
                    case "textarea":
                    case "text":
                    case "hidden":
                         field.value = fieldValue;
                        break;
                }
            }
        },
        /**
         * get field value
         * @param {String}fieldName
         * @return {Object}
         */
        getValue : function(fieldName){
            return this.data[fieldName];
        },
        /**
         * set action to download url
         * @return {void}
         */
        setActionToDownloadUrl: function(){
            this.setStateDownload();
            this.form.attr('action', this.form.attr('data-downloadUrl'));
            mi.log("set #"+ this.formId +" form action to download!");
        },
        /**
         * set action to search url
         * @return {void}
         */
        setActionToSearch: function(){
            this.unsetStateDownload();
            this.form.attr('action', this.form.attr('data-actionUrl'));
            mi.log("set #"+ this.formId +" form action to search!");
        },
        setStateDownload: function(){
            this.isDownloadState = true;
        },
        unsetStateDownload: function(){
            this.isDownloadState = false;
        },
        /**
         * submit form
         * @return {void}
         */
        submit : function(){
            mi.dispatcher.trigger(FormEvent.BEFORE_SUBMIT);
        }
    });
})