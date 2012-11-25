define(function(require){
    var mi = require("../core/mi");
    var _each = mi.util("each");
    /**
     * translate data to json tree
     * @name dataToTree
     * @param {Object} data
     * @param {String} id
     * @param {String} parentId
     * @param {String} childKey
     * @return {Object}
     */
    mi.util("dataToTree", function(data, id, parentId, childKey){
        var r = [], hash = {}, id = id || "id", data = data || {};
        var parentId  = parentId || "parent_id", childKey = childKey || "children";

        _each(data, function(item){
            hash[item[id]] = item;
        });

        _each(data, function(item){
            if(hash[item[parentId]]){
                if(!hash[item[parentId]][childKey]){
                    hash[item[parentId]][childKey] = [];
                }
                hash[item[parentId]][childKey].push(item);

            } else {
                r.push(item);
            }
        });

        return r;

    }, true);

})


