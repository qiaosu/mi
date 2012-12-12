define(function(require){
    var mi = require("../../system/core/mi");

    return mi.create("WorkFlow", {
        scanFiles: function(){},
        readFiles: function(){},
        combine: function(){},
        createFile: function(){},
        writeFile: function(){},
        deploy: function(){},
        login: function(){},
        upload: function(){},
        execute: function(){
            this.scanFiles();
            this.readFiles();
            this.combine();
            this.createFile();
            this.writeFile();
            this.deploy();
            this.login();
            this.upload();
        }
    });
})