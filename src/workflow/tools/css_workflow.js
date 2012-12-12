define(function(require){
    var mi = require("../../system/core/mi");

    var WorkFlow = require("./workflow");

    return WorkFlow.extend({
        scanFiles: function(){
            mi.log("scan css files...");
        },
        readFiles: function(){
            mi.log("read css files...");
        },
        combine: function(){
            mi.log("combine all css files...");
        },
        createFile: function(){
            mi.log("create combine css file...");
        },
        writeFile: function(){
            mi.log("write combine css file...");
        },
        deploy: function(){
            mi.log("deploy css file to server...");
        },
        login: function(){
            mi.log("login to server...");
        },
        upload: function(){
            mi.log("upload file to server...");
        }
    });

})