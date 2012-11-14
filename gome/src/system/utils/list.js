define(function(require){
    var _ = require("../core/mi");
    _.util("list", function(theObject){
        var _array = _.util("array");
        var _is = _.util("is");
        var _each = _.util("each");
        var _map = _.util("map");
        var _filter = _.util("filter");
        var _index_of = _.util("indexOf");
        var _mix = _.util("mix");
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
    }, true)
})