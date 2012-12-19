define(function(require){
    var mi = require("../../system/core/mi");

    var $ = require("../../system/libraries/jquery");

    var ModelEvent = require("../events/model_event");

    var ViewEvent = require("../events/view_event");

    var queryModel = require("../models/query");

    var _bind = require("../utils/bind");

    var QueryView = mi.View.extend({
        initialize: function(attr){
            this.el = attr.el;
            this.model = attr.model;
            this.btn = this.el.find('input[type="button"]');
            this.input = {
                "tags" : $('input[name="tags"]'),
                "tagmode" : $('input[name="tagmode"]'),
                "userId" : $('input[name="userId"]'),
                "lang" : $('select[name="lang"]')
            };
            this.subscribe();
            this.bind();
        },
        subscribe: function(){
            mi.dispatcher.on(ModelEvent.ValidateError, this.showError, this);
        },
        bind: function(){
            this.btn.on('click', _bind(this.go, this));
            for (var item in this.input) {
                this.input[item].on('focus', this.clearError);
            }
        },
        /**
         * todo
         * @param {Object} data
         */
        render: function(data){
        },
        go: function(e){
            var result = this.model.set({
                'tags': this.input.tags.val().trim(),
                'tagmode': this.input.tagmode.filter(':checked').val(),
                'ids': this.input.userId.val().trim(),
                'lang': this.input.lang.val()
            });
            if (result !== false) {
                mi.log.info(this.model.attrs);
                mi.dispatcher.trigger(ViewEvent.SearchTrigger, this.model.attrs);
            }
            e.preventDefault();
        },
        showError: function(arg){
            var _tgt = this.input[arg['data']];
            if (!_tgt.parent('.mi-form-item').hasClass('mi-form-item-error')) {
                _tgt.parent('.mi-form-item').addClass('mi-form-item-error')
                                            .append('<div class="mi-form-explain">'+ arg['type'] +'</div>')
            }
        },
        clearError: function(e){
            var _tgt = $(e.target).parent('.mi-form-item');
            if (_tgt.hasClass('mi-form-item-error')) {
                _tgt.removeClass('mi-form-item-error')
                    .find('.mi-form-explain').empty();
            }
        }
    });

    var queryView = new QueryView({
        el: $('#J_queryBox'),
        model: queryModel
    });

    return queryView;

});


