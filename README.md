#mi
        a smaller and lighter javascript library, you can combine each module if you like to create yourself libraries.


##namespace
```javascript
mi.utils
mi.components
mi.library
mi.helper
mi.events
```

##static method
```javascript
mi.util
mi.ui
mi.helper
mi.library
```


##example

### create components
```javascript
var $ = require("mi");


//可以赋值给Dialog变量，也可以不用赋值，只声明
// $.ui("Dialog", {});

//通常做法
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

//通常用法
var dialog = new Dialog(document.createElement("div"));

//也可以
//var dialog = new ($.ui("Dialog"))(document.createElement("div"));

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



        