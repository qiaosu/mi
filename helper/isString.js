define(function(require){
    var _ = require("mi");
    return _.helper("isString", function(theObject){
        return _.is("string", theObject);
    });
})