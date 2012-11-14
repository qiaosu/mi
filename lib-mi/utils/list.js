mi.util("list", function(theObject){
    var _is = mi.util("is");
    var _each = mi.util("each");
    var _map = mi.util("map");
    var _filter = mi.util("filter");
    var _index_of = mi.util("indexOf");
    var _mix = mi.util("mix");
    /**
     * create a list by the object
     * @param {Array|Object|Function} theObject the object
     * @return {List}
     */
    var List = function(theObject){

        var theObject = (mi.util("array"))(theObject);

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
})