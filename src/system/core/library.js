define(function(require){

    var mi = require("./mi");

    var SystemCoreEvent = require("../events/system_core_event");

    mi.set("library", (function(){

        var _libraries = {};

        return function(theLibraryName, theLibraryValue, mixed){
            var args = arguments.length;
            if(args == 1){
                return _libraries[theLibraryName];
            } else {
                _libraries[theLibraryName] = theLibraryValue;
                if(mixed){
                    mi.set(theLibraryName, theLibraryValue);
                }
                return _libraries[theLibraryName];
            }
            throw new Error('no library name or value to set!');
        }
    }()));

    mi.dispatcher.trigger(SystemCoreEvent.LIBRARY_SET_FINISHED);

    mi.log.info("system.core.library set successful!");
})