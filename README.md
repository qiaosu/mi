#mi
        a smaller and lighter javascript library, you can combine each module if you like to create yourself core.


##namespace
```javascript
core.utils
core.components
core.library
core.helper
core.events
```

##example

### create components
```javascript
var $ = require("core");

var Dialog = $.ui("Dialog", {
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

var dialog = new Dialog(document.createElement("div"));

var title = document.createElement("h3");
    title.innerHTML = "title";

var body = document.createElement("div");
    body.innerHTML = "body";

dialog.addChild(title);

dialog.addChild(body);

dialog.appendTo(document.body);

dialog.on("destroy", function(){
    console.log('dialog destroyed!');
    // clear all events
    this.off();
});
```
###create utils
```javascript
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
```


###create helper
```javascript
$.helper("isString", function(theObject){
    return $.is("string", theObject);
})

//使用
console.log(isString(123));  // false
```



        