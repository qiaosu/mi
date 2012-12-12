define(function(require){
    var mi = require("../core/mi");

    var _each = mi.util("each");

    /**
     * parse uri
     * @name uri
     * @param {String} theUriString
     * @return {Object}
     */
    mi.util("uri", function(theUriString) {
        var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
            m = parser.exec(theUriString || ''),
            parts = {};


        _each(parserKeys, function(value, key){
            parts[value] = m[key] || '';
        });

        return parts;
    }, true);
})