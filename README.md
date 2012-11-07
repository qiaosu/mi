#MICore
        a smaller and lighter javascript library, you can combine each module if you like to create yourself core.


##namespace
        core.utils<br />
        core.components<br />
        core.library<br />
        core.helper<br />


##example

        ### create components
        var $ = require("core");

        var Window = $.ui("window", {
                dom : null,
                type : "window",
                addChild : function(child){
                    this.dom.addChild(child);
                },
                removeChild : function(child){
                    this.dom.removeChild(child);
                },
                appendTo : function(theTarget){
                    theTarget.appendChild(this.dom);
                },
                destroy : function(){
                    while(this.dom.firstChild){
                        this.removeChild(this.firstChild);
                    }
                },
                initialize : function(dom){
                    this.dom = dom;
                }
        });

        var window = new Window(document.createElement("div"));

        var title = document.createElement("h3");
            title.innerHTML = "title";

        var body = document.createElement("div");
            body.innerHTML = "body";

        window.addChild(title);

        window.addChild(body);

        window.appendTo(document.body);

        window.on("destroy", function(){
            console.log('window destroyed!');
            // clear all events
            this.off();
        });

        ###create utils
        /**
        * @param {String} toArray
        * @param {Function}
        * @param {Boolean} true : mix util to core as a static method
        */
        $.util("toArray", function(theObject){
            return $.array(theObject);
        }, true);

        //使用
        function myMethod(){
            console.log($.toArray(arguments);
        }

        myMethod(1,2,3);  // [1,2,3]



        ###create helper
        $.helper("isString", function(theObject){
            return $.is("string", theObject);
        })

        //使用
        console.log(isString(123));  // false




        