define(function(require){
    return require("mi").ui("Dialog", {
        dom : null,
        type : "Dialog",
        addChild : function(child){
            this.dom.addChild(child);
        },
        removeChild : function(child){
            this.dom.removeChild(child);
        },
        appendTo : function(theTarget){
            theTarget.appendChild(this.dom);
            this.trigger("appended");
        },
        destroy : function(){
            while(this.dom.firstChild){
                this.removeChild(this.firstChild);
            }
            this.trigger("destroy");
        },
        initialize : function(dom){
            this.dom = dom;
        }
    });
})