(function(mi){
    if (typeof define === "function") {
        define(function(){return mi;});
    } else {
        this.mi = this.mi || mi;
    }
}((function(){

    var _mi, _instances_array = [];

    /** the event object */
    var _events = {};


    /**
    * @name log
    * @param {Arguments} args  log() is the same as log.log()
    * @method {Function} info  log.info()
    * @method {Function} warn  log.warn()
    * @method {Function} error log.error()
    * @method {Function} log   log.log()
    * @return {Function}
    */
    var _log = (function(){
        var types = "log|info|warn|error".split("|");
        var _trace = function(){
            var args = arguments;
            if(_trace.enable && args.length){
                var type = "log", cs = console;
                if(args.length >=2 && new RegExp(types.join("|"), "i").test(args[args.length - 1])){
                    type = (args = [].slice.call(args)).pop();
                }
                if(cs && cs[type] && typeof(cs[type]) == "function"){
                    cs[type].apply(cs, args);
                }
            }
        };

        while(type = types.pop()){
            _trace[type] = (function(type){
                return function(){
                    this.apply(this, [].slice.call(arguments).concat(type));
                };
            }(type));
        }

        return _trace;

    }());

    /**
    * utils function
    * @param {Object} theObject
    * @return {String} the type of theObject by lowercase
    */
    function _type(theObject){
        return Object.prototype.toString.call(theObject).replace(/([^\s]+\s)|]$/ig, "").toLowerCase();
    }

    /**
    * the namespace parser
    * @param {Array} arr the namespace array
    * @param {Function} callback the parser callback
    * @param {Object} [root] the namespace root object
    * @return {Object} the last object of namespace
    */
    function _parse(arr, callback, root){
        var array = arr || [], len = array.length, i = 0, last = root;
        if (len == 0 && arguments.length == 2) {
            throw new TypeError()
        }
        while (i < len) {
            if (i in array) {
                last = callback.call(null, last, array[i], i, array);
                if(last === false){
                    break;
                }
            }
            i++
        }
        return last;
    }

    /**
    * the namespace creator
    * @param {String} path the namespace path with dot, such as a.b.c
    * @param {Object} [value] the namespace root object
    * @param {Object} [root] the last object default value
    * @return {Object} the last object of namespace
    */
    function _package(path, value, root){
        var args = arguments.length, isGet = false, isDefine = false;
        if(args == 0){ throw new Error(""); }
        if(args == 1){ isGet = true; }
        if(args >= 2){ isDefine = true; }

        return _type(path) == "string" ? _parse(path.split("."), function (theObject,key,i,arr){
            if(isGet){
                return theObject[key] ? theObject[key] : false;
            }
            if(isDefine){
                if(!theObject[key]){
                    return theObject[key] = (arr.length - 1 == i  ? value : {});
                } else if(_type(theObject[key]) === "object"){
                    return theObject[key];
                } else {
                    throw new Error("[ " + key + " ] is exists, and it is a root node!");
                }
            }
        }, root || _mi) : path;
    }

    /**
     * create path, and set value for path, if you want to create package only, you can use method package instead
     * @param {String} path the namespace path
     * @param {Object} value the namespace path value
     * @return {Object}
     */
    function _set(path, value){
        return _package(path, value || {});
    }

    /**
     * get value by path
     * @param path
     * @return {Object}
     * @private
     */
    function _get(path){
        return _package(path);
    }

    /**
     * return an object inherits from inheritsObject
     * @param {Object} theObject
     * @param {Object} inheritsObject
     * @param {Boolean} [override]
     * @return {Object}
     */
    function _mix(theObject, inheritsObject, override) {
        var isOverride = override === void(0) || override;
        if (theObject && inheritsObject) {
            for (var key in inheritsObject) {
                if (isOverride || !(key in theObject)) {
                    theObject[key] = inheritsObject[key];
                }
            }
        }
        return theObject
    }

    /**
     * iteration an object
     * @param {Object} theObject
     * @param {Function} callback
     * @param {Object} [context]
     * @return {Boolean} true / false
     */
    function _each(theObject, callback, context){
        for(var attr in theObject){
            if(callback.call(context, theObject[attr], attr, theObject) === false){
                return false;
            }
        }
        return true;
    }


    /**
    * create a single instance of mi
    * @return {Object} instance the single instance
    */
    function _dispatcher(){
        return new (_mi());
    }

    /** the events object */
    _events = (function(){
        /**
        * {Object} list the private event list
        */
        var _list = {};

        return {
            /**
            * add event listener
            * @param {String} type the event name
            * @param {Function} callback the event callback
            * @param {Object} [callbackContext] the callback context
            * @return {void} undefined
            */
            on : function(type, callback, callbackContext){
                _list[type] = _list[type] || [];
                _list[type].push([type, callback, this, callbackContext || this]);
            },
            /**
            * remove event listener
            * @param {String} [type] the event name
            * @param {Function} [callback] the event callback
            * @return {void} undefined
            */
            off : function(type, callback){
                var args = arguments.length;
                _each(_list, function(list, key){
                    for(var i= 0;i<list.length;i++){
                        if(list[i][2] === this){
                            if(args == 0){
                                list.splice(i--, 1);
                            } else if(args == 1){
                                if(list[i][0] === type){
                                    list.splice(i--, 1);
                                }
                            } else if(args == 2){
                                if(list[i][0] === type && list[i][1] === callback){
                                    list.splice(i--, 1);
                                }
                            }
                        }
                    }

                    !list.length && delete _list[key];
                }, this);
            },
            /**
            * trigger event listener
            * @param {String} type the event name
            * @param {Object} [data] data the event data
            * @return {void} undefined
            */
            trigger : function(type, data){
                var list = _list[type];
                if(list){
                    _each(list, function(evt){
                        if(evt[2] === this){
                            evt[1].apply(evt[3], [].concat({type:evt[0], data:data || {}}));
                        }
                    }, this);
                }
            },
            /**
             * return the event list
             * @return {Object} the event list
             */
            print : function(){
                return _list;
            }
        }

    }());


    /** the core implements, base on kclass, view on https://github.com/ded/klass */
    _mi = (function () {
        var f = 'function'
            , fnTest = /xyz/.test(function () {xyz}) ? /\bsupr\b/ : /.*/
            , proto = 'prototype';

        function Core(o) {
            return extend.call(isFn(o) ? o : function () {}, o, 1);
        }

        function isFn(o) {
            return typeof o === f;
        }

        function wrap(k, fn, supr) {
            return function () {
                var tmp = this.supr;
                this.supr = supr[proto][k];
                var ret = fn.apply(this, arguments);
                this.supr = tmp;
                return ret;
            }
        }

        function process(what, o, supr) {
            for (var k in o) {
                if (o.hasOwnProperty(k)) {
                    what[k] = isFn(o[k])
                    && isFn(supr[proto][k])
                    && fnTest.test(o[k])
                    ? wrap(k, o[k], supr) : o[k];
                }
            }
        }

        /**
         * init the class
         * @param {Object} o the class body
         * @param {Boolean} [fromSub]
         * @return {Function} the constructor of class
         */
        function extend(o, fromSub) {
            function noop() {}
            noop[proto] = this[proto];
            var supr = this
                , prototype = new noop()
                , isFunction = isFn(o)
                , _constructor = isFunction ? o : this
                , _methods = isFunction ? {} : o;

                function fn() {
                    if (this.initialize){
                        this.initialize.apply(this, arguments);
                        /** push this to instances array */
                        _instances_array.push(this);
                    } else {
                        fromSub || isFunction && supr.apply(this, arguments);
                        _constructor.apply(this, arguments);
                    }
                }

                fn.isClass = true;

                /**
                 * add methods to class
                 * @param {Object} o
                 * @return {Object}
                 */
                fn.methods = function (o) {
                    process(prototype, o, supr);
                    fn[proto] = prototype;
                    return this;
                };

                fn.methods.call(fn, _methods).prototype.constructor = fn;

                fn.extend = arguments.callee;
                /**
                 * create static of class methods
                 * @param {Object|String} o object or string key
                 * @param {Function} [optFn] the static function body
                 * @return {Class} the instance of class
                 */
                fn[proto].implement = fn.statics = function (o, optFn) {
                    o = typeof o == 'string' ? (function () {
                        var obj = {};
                        obj[o] = optFn;
                        return obj;
                    }()) : o;
                    process(this, o, supr);
                    return this;
                };

                /** mix events */
                _mix(fn[proto], _events);

                return fn;
        }

        return Core;

    }());


    var _namespace = {
        set : _set,
        get : _get,
        log : _log,
        events : _events,
        instances : _instances_array,
        dispatcher : _dispatcher()
    };

    for(var key in _namespace){
        _package(key, _namespace[key]);
    }

    return _mi;

}())));