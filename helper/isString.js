define(function(require){
    return require("mi").helper("isString", function(theObject){
        return _.is("string", theObject);
    });
})