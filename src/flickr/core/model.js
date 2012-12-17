define(function(require){
    var mi = require("../../system/core/mi");

    var ModelEvent = require("../events/model_event");

    delete mi["model"];

    mi.log.info("system.core.model has been unsetted!");

    /**
     * create Application.Model
     */
    mi.create("Model", {
        attrs: {},
        _backup: {},
        _changed: false,
    
        /** 
         * 预留接口,自己实现
         */
        initialize: function(attrs, options){
            this._id = 'M' + (new Date()).getTime();
            this.attrs = this._backup = attrs;
        },
        
        reset: function(){
            this._changed = false;
        },
        
        /** 
         * @attr
         */
        get: function(attr){
            return this.attrs[attr];
        },
        
        /** 
         * @attr
         */
        has: function(attr){
            return this.get(attr) != null;
        },
        
        /**
         * @options: 'silent' 是否发布数据变更事件
         */
        set: function(obj, options){
            options || (options = {})
            if (!obj) {
                return this;
            }
            if (obj.attrs) {
                obj = obj.attrs;
            }
            
            // Run validation.
            if (!this._validate(obj, options)) 
                return false;
            
            for (var attr in obj) {
                var val = obj[attr], now = this.get(attr);
                if (val !== now) {
                    this.attrs[attr] = val;
                    this._changed = true;
                }
            }
            
            if (!options.silent && this._changed) {
                _.events.trigger('Changed' + this._id, obj, options);
            }
        },
        
        /**
         * @attr
         * @options: 'silent' 是否发布数据变更事件
         */
        unset: function(attr, options){
            (options || (options = {})).unset = true;
            return this.set(attr, null, options);
        },
        
        /**
         * return boolean
         */
        hasChanged: function(){
            return this._changed === true;
        },
        
        /**
         * reduce
         * 还原备份数据
         */
        reduce: function(){
            if (this.hasChanged) {
                this.set(this._backup);
                _.events.trigger('Reduce' + this._id, this._backup);
            }
        },
        
        /**
         * 预留接口, 自己实现
         */
        _validate: function(attrs, options){
            var rules = this.validate || {};
            for (var attr in attrs) {
                if (rules[attr] && !attrs[attr].match(rules[attr])) {
                    _.events.trigger('ValidateError', attr);
                    return false;
                }
            }
            return true;
        }
    });

    mi.log.info("application.core.model set successful!");
})

