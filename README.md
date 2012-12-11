#mi
    a smaller and lighter javascript library, you can combine each module if you like to create yourself libraries.

##base constant

```javascript
//base event
mi.events

//all mi instances
mi.instances

//single mi instance
mi.dispatcher	

```

##base methods

```javascript

//create package
mi.set

// get package
mi.get

//logger
mi.log

```

##extension constant

```javascript
//base controller

mi.controller

//base model

mi.model

//base view

mi.view

//base router

mi.router

```

##extension methods
```javascript

//register a util
mi.util

//regisger a display object
mi.ui

//register a helper on window
mi.helper

//register a library
mi.library

```

##example

### create Dialog components
```javascript

	var mi = require("mi");

	//create a dialog

	// mi.ui("Dialog", {});

	//create a dialog component

	var Dialog = mi.ui("Dialog", {

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
    	dialogClickHandler : function(){
        	// code here
    	},
    	bind : function(){
        	E.on(this.dom, 'click', this.dialogClickHandler);
    	},
    	unbind : function(){
        	E.off(this.dom, 'click', this.dialogClickHandler);
    	},
    	destroy : function(){
        	while(this.dom.firstChild){
            	this.removeChild(this.firstChild);
        	}
        	this.unbind();
        	this.dom.parentNode.removeChild(this.dom);
        	this.trigger("destroy");
    	},
    	initialize : function(dom){
        	this.dom = dom;
        	this.bind();
    	}
	});

	// create dialog instance
	var dialog = new Dialog(document.createElement("div"));

	//you can get dialog class like this
	//var dialog = new (mi.ui("Dialog"))(document.createElement("div"));

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

    	//1s later execute dialog.destroy
    	$.delay(function(){
        	dialog.destroy();
    	}, 1000);
```

###create utils

```javascript
/**
* @param {String} toArray
* @param {Function}
* @param {Boolean} true : mix util to core as a static method
*/
mi.util("toArray", function(theObject){
    return mi.array(theObject);
}, true);

// use
function myMethod(){
    console.log(mi.toArray(arguments);
}

myMethod(1,2,3);  // [1,2,3]
```


###create helper
```javascript
mi.helper("isString", function(theObject){
    return mi.is("string", theObject);
})

//use
console.log(isString(123));  // false
```


###create library
```javascript
$.library("Email", {
    msg : 'send email',
    from: function(from){
        this.msg += ' from ' + from;
        return this;
    },
    to: function(to){
        this.msg += ' to ' + to;
        return this;
    },
    send: function(){
        console.log(this.msg);
    }
})

//use
$.library("Email").from('zhangsan').to('lisi').send();
```
