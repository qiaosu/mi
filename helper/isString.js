define(function(require){
    return require("core").helper("isString", function(theObject){
        return _.is("string", theObject);
    });
})