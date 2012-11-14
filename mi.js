(function(mi){
    if (typeof define === "function") {
        define(function(){return mi;}); // for seajs
    } else {
        this.mi = this.mi || mi; // for <script>
    }
}((function(){

    var _mi;

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

    function _type(theObject){
        return Object.prototype.toString.call(theObject, theObject).replace(/([^\s]+\s)|]$/ig, "").toLowerCase();
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

        return _type(path) == "string" ? _parser(path.split("."), function (theObject,key,i,arr){
            if(isGet){
                if(!theObject[key]){
                    throw new Error(key + ' undefined!');
                }
                return theObject[key];
            }
            if(isDefine){
                if(!theObject[key]){
                    return theObject[key] = (arr.length - 1 == i  ? value : {});
                } else if(_type(theObject[key] === "object")){
                    return theObject[key];
                } else {
                    throw new Error(key + " not an object!");
                }
            }
        }, root || _mi) : path;
    }


    function _set(name, value){
       if(_mi[name]){
           throw new Error("");
       }
       _mi[name] = value;
    }

    function _get(name){
        return _mi[name];
    }

    /** the core implements, base on kclass, view on https://github.com/ded/klass */
    _mi = (function () {
        function Core(){}
        return Core;
    }());

    var _methods = {
        set: _set,
        get: _get,
        package: _package
    };

    for(var key in _methods){
        _package(key, _methods[key], _mi);
    }

    return _mi;

}())));