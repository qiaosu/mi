define(function(require){
    var mi = require("../../system/core/mi");

    var WorkFlow = require("./workflow");

    return WorkFlow.extend({
        scanFiles: function(){
            mi.log("scan js files...");
        },
        readFiles: function(){
            mi.log("read js files...");
        },
        combine: function(){
            mi.log("combine all js files...");
        },
        createFile: function(){
            mi.log("create combine js file...");
        },
        writeFile: function(){
            mi.log("write combine js file...");
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