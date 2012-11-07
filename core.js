(function(mi){
    if (typeof define === "function") {
        define(function(){return mi;}); // for seajs
    } else {
        this.mi = this.mi || mi; // for <script>
    }
}((function(){

    var _mi, _instances_array = [];

    var _info = {
        version : '0.0.1'
    };

    var _instances = {
        instances : _instances_array
    };

    /** the utils object */
    var _utils = {
        ns : _ns,
        type : _type,
        is :     _is,
        copy : _copy,
        trim : _trim,
        mix : _mix,
        aop : _aop,
        array : _array,
        each : _each,
        map  : _map,
        filter : _filter,
        indexOf : _index_of,
        list : _list,
        delay : _delay,
        rmb   : _rmb,
        before : _before,
        after : _after,
        getClass : _get_class
    };

    /** the event object */
    var _events = {};

    /** the component object */
    var _components = {};
    
    /**
    * the namespace parser
    * @param {Array} arr the namespace array
    * @param {Function} callback the parser callback
    * @param {Object} [root] the namespace root object
    * @return {Object} the last object of namespace
    */
    function _parser(arr, callback, root){
        var array = arr || [], len = array.length, i = 0, last = root;
        if (len == 0 && arguments.length == 2) {
            throw new TypeError()
        }
        while (i < len) {
            if (i in array) {
                last = callback.call(null, last, array[i], i, array);
            }
            i++
        }
        return last;
    }

    /**
    * the namespace creator
    * @param {String} path the namespace path with dot, such as a.b.c
    * @param {Object} [root] the namespace root object
    * @param {Object} [value] the last object default value
    * @return {Object} the last object of namespace
    */
    function _ns(path, root, value){
        var hasValue = arguments.length > 2;
        return typeof(path) == "string" ? _parser(path.split("."), function (a,b,i,arr){
            if(!_check(b,a)){throw new Error("\u8BE5\u540D\u79F0 "+b+" \u5DF2\u88AB\u5360\u7528\uFF0C\u8BF7\u9009\u62E9\u5176\u5B83\u540D\u79F0\uFF01");}
            return a[b] = a[b] ? a[b] : (arr.length - 1 === i && hasValue ? value : {});
        }, root || window) : path;
    }

    /**
    * utils function
    * @param {Object} theObject
    * @return {String} the type of theObject by lowercase
    */
    function _type(theObject){
        return Object.prototype.toString.call(theObject, theObject).replace(/([^\s]+\s)|]$/ig, "").toLowerCase();
    }

    /**
    * check the object type
    * @param {String} theTypeOfObject the type of the object
    * @param {Object} theObject
    * @return {Boolean} true | false
    */
    function _is(theTypeOfObject, theObject){
        if(theTypeOfObject === "class"){
            return _is_class(theObject);
        } else if(theTypeOfObject === "undefined"){
            return typeof(theObject) === theTypeOfObject;
        } else if(theTypeOfObject === "NaN"){
            return isNaN(theObject);
        } else {
            return _type(theObject) === theTypeOfObject;
        }
    }

    /**
    * check the object is class
    * @param {Object} theObject the instance of the object
    * @return {Boolean} true | false
    */
    function _is_class(theObject){
        return !!theObject.constructor.isClass;
    }


    /**
    * return arguments to an array
    * @return {Array} the array data
    */
    function _copy(){
        return Array.prototype.slice.call(arguments[0]);
    }

    /**
    * trim the blank of a string
    * @param {String|Number} stringOrNumber
    * @return {String} string
    */
    function _trim(stringOrNumber){
            return stringOrNumber+"".replace(/^\s+|\s+$/g, "");
    }

    /**
    * @param {Object} theObject
    * @param {Object} inheritsObject
    * @param {Boolean} [override]
    * @return {Object} theObject mixed with inheritsObject
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
    * queue function list
    * @return {Function} the callback queue
    */
    function _aop(){
        var queues = (arguments.length == 1 && _is("array", arguments[0])) ? arguments[0] : _copy(arguments);
        return function(){
            var params = _copy(arguments), lastReturnValue = null;
            for(var i=0, l = queues.length;i<l;i++){
                lastReturnValue = queues[i].apply(this, params.concat(lastReturnValue));
                if(lastReturnValue === false){break;}
            }
            return lastReturnValue;
        }
    }

    /**
     * create before or after callbacks for method
     * @param {String} method the wrap method
     * @param {Function|Array} callback the callbacks
     * @param {String} position the position of wrap method
     * @param {Object} context the method context
     * @return {Function}
     */
    function _method(method, callback, position, context){
        var originalMethod = context[method], callbacks;
        if(originalMethod && _is("function", originalMethod)){
            if(_is("undefined", callback) || _is("object", callback)){
                throw new Error("");
            } else {
                if(!_is("array", callback)){
                    callbacks = [callback];
                } else {
                    callbacks = callback;
                }

                callbacks[position == "before" ? "push" : "unshift"](originalMethod);

                context[method] = _aop(callbacks);

                return context[method];
            }
        }
        return originalMethod;
    }

    /**
     * wrap a callbacks before method executed
     * @param {String} method
     * @param {Function|Array} callback callback list
     * @return {Function}
     */
    function _before(method, callback){
        return _method(method, callback, "before", this);
    }

    /**
     * wrap a callbacks after method executed
     * @param {String} method
     * @param {Function|Array} callback callback list
     * @return {Function}
     */
    function _after(method, callback){
        return _method(method, callback, "after", this);
    }

    /**
     * convert an object to array if convert success else return the origin value
     * @param {Object} theObject such as arguments, HTMLElement, Array
     * @return {Array|Object} if success return an array else return origin theObject
     */
    function _array(theObject){
        var theObjectArray = [];
        if(theObject.callee){
            theObjectArray = _copy(theObject);
        } else if(theObject.item){
            for(var i= 0, len = theObject.length;i<len;i++){
                theObjectArray.push(theObject[i]);
            }
        } else if(_is("array", theObject)){
            theObjectArray = theObject;
        } else {
            return theObject;
        }
        return theObjectArray;
    }

    /**
    * @param {Object} theObject
    * @param {Function} callback
    * @param {Object} [context]
    * @return {Boolean}
    */
    function _each(theObject, callback, context){

        var theObject = _array(theObject);

        if(_is("array", theObject)){
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    if(callback.call(context, theObject[i], i, theObject) === false){
                        return false;
                    }
                }
            }
        } else if(_is("object", theObject) || _is("function", theObject)){
            for(var attr in theObject){
                if(callback.call(context, theObject[attr], attr, theObject) === false){
                    return false;
                }
            }
        }

        return true;

    }


    /**
     * process each element of an array
     * @param {Array|Object} theObject array or object
     * @param {Function} callback the callback
     * @param {Object} [context] the callback context
     * @return {void}
     */
    function _map(theObject, callback, context){

        var theObject = _array(theObject);

        if(_is("array", theObject)){
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    theObject[i] = callback.call(context, theObject[i], i, theObject);
                }
            }
        } else if(_is("object", theObject) || _is("function", theObject)){
            for(var attr in theObject){
                theObject[attr] = callback.call(context, theObject[attr], attr, theObject);
            }
        }
    }

    /**
     * filter an array or object with callback
     * @param {Array|Object} theObject
     * @param {Function} callback the callback
     * @param {Object} context the callback context
     * @return {Array|Object}
     */
    function _filter(theObject, callback, context){

        var theObject = _array(theObject), theReturnObject = null;

        if(_is("array", theObject)){
            theReturnObject = [];
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    if(callback.call(context, theObject[i], i, theObject) !== false){
                        theReturnObject.push(theObject[i]);
                    }
                }
            }
        } else if(_is("object", theObject) || _is("function", theObject)){
            theReturnObject = {};
            for(var attr in theObject){
                if(callback.call(context, theObject[attr], attr, theObject) !== false){
                    theReturnObject[attr] = theObject[attr];
                }
            }
        }

        return theReturnObject;
    }

    /**
     * search array index or search object key if exists
     * @param {Array|Object|Function} theObject
     * @param {Object|String} valueOrKey the search value or object|function attribute
     * @return {Number|Boolean}
     */
    function _index_of(theObject, valueOrKey){
        var theObject = _array(theObject);

        if(_is("array", theObject)){
            for(var i= 0, len = theObject.length;i<len;i++){
                if(i in theObject){
                    if(valueOrKey === theObject[i]){
                        return i;
                    }
                }
            }
            return -1;
        } else if(_is("object", theObject) || _is("function", theObject)){
            for(var attr in theObject){
                if(valueOrKey === attr){
                    return true;
                }
            }
            return false;
        }

        return false;
    }

    /**
     *  process an array or object
     * @param {Array|Object} theObject
     * @return {List} the list instance
     */
    function _list(theObject){
        /**
         * create a list by the object
         * @param {Array|Object|Function} theObject the object
         * @return {List}
         */
        var List = function(theObject){

            var theObject = _array(theObject);

            if(_is("array", theObject) || _is("object", theObject) || _is("function", theObject)){
                this.object = theObject;
            } else {
                throw new TypeError("List\u53C2\u6570\u7C7B\u578B\u9519\u8BEF\uFF01");
            }
        }

        _mix(List.prototype, {
            each : function(callback, context){
                _each(this.object, callback, context || this);
                return this;
            },
            map : function(callback, context){
                _map(this.object, callback, context || this);
                return this;
            },
            filter : function(callback, context){
                return _filter(this.object, callback, context || this);
            },
            indexOf : function(valueOrKey){
                return _index_of(this.object, valueOrKey);
            }
        });

        return new List(theObject);
    }

    /**
     * delay to run a function
     * @param {Function} callback the callback function
     * @param {Number} [time] the delay time
     * @return {Function}
     */
    function _delay(callback, time){
        var timer = null;
        return function(){
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                callback.apply(context, args);
            }, time || 100);
        }
    }

    /**
     * convert amount with ,
     * @param {String|Number} stringOrNumber
     * @return {String} the converted value
     */
    function _rmb(stringOrNumber){
        return (stringOrNumber + "").replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,");
    }

    /**
    * theck the namespace name is exists
    * @param {String} theName
    * @param {Object} thePackageObject
    * @return {Boolean}
    */
    function _check(dir, thePackageObject){
        return _each(thePackageObject || _mi, function(value, key){
            if(dir === key){
                return false;
            }
        })
    }

    /**
    * create a single instance of core
    * @return {Class} instance the single instance
    */
    function _get_class(){
        var instance = null;
        return (function(){
            return instance ? instance : (instance = new (_mi()));
        }())
    }

    /**
     * add object into system
     * @param {String} thePackage the package name
     * @param {String} theComName the component name
     * @param {Object} [theComData] the component data
     * @param {Boolean} [mixToCore] if mix the component to core
     * @return {Object} the component
     */
    function _com(thePackage, theComName, theComData, mixToCore){
        if(arguments.length > 2){
            if(_list(_mi[thePackage]).indexOf(theComName)){
               throw new Error(thePackage + '.' + theComName + "\u540D\u79F0\u5DF2\u88AB\u5360\u7528\uFF01");
            }

            if(!_is("function", theComData)){
                throw new TypeError("util\u53C2\u6570\u7C7B\u578B\u9519\u8BEF\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3AFunction\u7C7B\u578B");
            }

            _mi[thePackage][theComName] = theComData;

            if(mixToCore === true){
                _ns(theComName, _mi, _mi[thePackage][theComName]);
            }

        }
        return _mi[thePackage][theComName];
    }

    /**
     * create utils
     * @param {String} theUtilName the util name
     * @param {Function} [theUtilData] the util function
     * @param {Boolean} [mixToCore] weither mix to core as a static method
     * @return {Object} the util which created just now
     */
    function _util(theUtilName, theUtilData, mixToCore){
        var args = arguments.length;
        if(args.length == 0){
            throw new Error("");
        } else if(args == 1){
            return _com("utils", theUtilName);
        } else {
            return _com("utils", theUtilName, theUtilData, mixToCore);
        }
    }

    /**
     * create component
     * @param {String} componentName the component name
     * @param {Object} [theComponentData] the component data
     * @return {Object}
     */
    function _ui(componentName, theComponentData){
        var args = arguments.length;
        if(args == 0){
            throw new Error("\u8BF7\u6307\u5B9A\u4E00\u4E2A\u7EC4\u4EF6\u540D\u79F0\uFF01");
        } else if(args == 1){
            return _com("components", componentName);
        } else {
            return _com("components", componentName, _mi(theComponentData), false);
        }

    }

    function _helper(){

    }

    function _library(){

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

                /** mix before or after */
                _mix(fn[proto], {before:_before, after:_after});

                return fn;
        }

        return Core;

    }());


    var _namespace = {
        ui:_ui,
        util : _util,
        helper : _helper,
        library : _library,
        utils : _utils,
        events : _events,
        components : _components
    };

    /** mix info to core */
    _mix(_mi, _info);

    /** mix utils to core */
    _mix(_mi, _utils);

    /** mix events to core */
    _mix(_mi, _events);

    /** mix instances to core */
    _mix(_mi, _instances);
    
    /** create namespaces */
    _each(_namespace, function(value, dir){
        _ns(dir, _mi, value);
    });

    return _mi;

}())));