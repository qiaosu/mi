define(function(require){
    var _ = require("../../system/core/mi");
    /** the select component */
    var Select = require("./select");

    var UIEvent = require("../events/ui_event");

    var SelectEvent = require("../events/select_event");

    return _.ui("Form", {
        formId: '',
        submitButtonId:'',
        form:null,
        submitButton: null,
        button:null,
        validator:null,
        selects: [],
        data:{},
        initialize : function(theFormId, theSubmitButtonId){
            this.formId = theFormId;
            this.submitButtonId = theSubmitButtonId;
            this.form = $(this.formId);
            this.submitButton = $(theSubmitButtonId);
            this.button = $$("input", this.submitButton)[0];
            this.bind();
        },
        enable: function(){
            this.submitButton.removeClass("mi-button-morange-disabled");
            this.button.removeAttrs("disabled");
        },
        disable: function(){
            this.submitButton.addClass("mi-button-morange-disabled");
            this.button.attr("disabled", "disabled");
        },
        bind: function(){
            this.on(UIEvent.LOAD, this.onValidatorLoad, this);
        },
        onValidatorLoad: function(){
            this.data = this.serialize();
            console.log(this.data);
        },
        select: function(theSelectId){
            var theSelect = new Select({
                width:181,
                size:4
            }).apply(theSelectId);

            theSelect.onChange = function(){
                _.dispatcher.trigger(SelectEvent.CHANGE, {target:this});
            };

            theSelect.onShow = function(){
                _.dispatcher.trigger(SelectEvent.SHOW);
            };

            this.selects.push(theSelect);
        },
        serialize : function(theFormObject, encode){
            var theForm, theFormElements, theFormData = {};
            theFormObject = theFormObject || this.form;
            theForm = theFormObject.node ? theFormObject.node : theFormObject;
            theFormElements = theForm.elements;
            _.each(theFormElements, function(theFormElement){
                var theFieldValue = false;
                if(theFormElement.name && theFormElement.name != "_form_token"){
                    if (/select/i.test(theFormElement.type)) {

                        theFieldValue = theFormElement.selectedIndex > -1 ? theFormElement.value : false

                        this.select(theFormElement.getAttribute("id"));

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
        addField: function(fieldConfig){
            fieldConfig = fieldConfig || {};
            if(!fieldConfig.appendTo){
                fieldConfig.appendTo = this.form.node;
            }
            D.create("INPUT", fieldConfig);
        },
        setValue : function(fieldName, fieldValue){
            if(arguments.legnth < 2){
                throw new Error("form.setValue have two arguments!");
            }
            var field = this.form.node[fieldName];
            if(field){
                switch(field.type.toLowerCase()){
                    case "select":
                        _.each(this.selects, function(theSelect){
                            if(theSelect.select.name == fieldName){
                                theSelect.setCurrent(fieldValue);
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
                /** refresh the form data */
                this.data = this.serialize();
            }
        },
        getValue : function(fieldName){
            return this.data[fieldName];
        },
        submit : function(){
            if(this.validator){
                this.validator.submit();
            }
        }
    });
})