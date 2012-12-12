#mi
    a smaller and lighter javascript library, you can combine each module if you like to create yourself libraries.

##base constant

```javascript

// the version of mi
mi.version

//base event
mi.events

//all mi instances
mi.instances

//single mi instance, use for global event dispatcher
mi.dispatcher

```

##base methods

```javascript

//create package
mi.set

mi.set("mi.ui", {});

mi.set("mi.net", {});

mi.set("mi.display", {});

// get package
mi.get

var ui = mi.get("mi.ui");

var net = mi.get("mi.net");

var display = mi.get("mi.display");

// create class
mi.create
// example
// create ContextMenu
mi.create("mi.ui.ContextMenu", {});

// create ContextMenuItem
mi.create("mi.ui.ContextMenuItem", {});

// create DisplayObject
mi.create("mi.display.DisplayObject", {});

// create Sprite
mi.create("mi.display.Sprite", {}});

// create MovieClip
mi.create("mi.display.MovieClip", {});

// create URLLoader
mi.create("mi.net.URLLoader", {});

//create URLRequest
mi.create("mi.net.URLRequest", {});


// get class

var ContextMenu = mi.get("mi.ui.ContextMenu");

var contextMenu = new ContextMenu();

mi.log(contextMenu);

var ContextMenuItem = mi.get("mi.ui.ContextMenuItem");

var contextMenuItem = new ContextMenuItem();

contextMenu.addMenuItem(contextMenuItem);



//logger
mi.log

//example

// log, same as log.log
mi.log(1,2,3);

// log
mi.log.log(1,2,3);

// info
mi.log.info(1,2,3);

// error
mi.log.error(1,2,3);

//warn
mi.log.warn(1,2,3);

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

##directory
```javascript
+ appliction    // extension from system
  + core
    - setup.js  // setup which extension method(s) to support
  + events
    - application_core_event.js // application events
  + utils      
    - setup.js  // setup which util(s) to support
  + ui
    - display_object.js
  + helpers
    - setup.js  // setup which helper(s) to support
  + libraries
    - setup.js  // setup which librar(y|ies) to support
  - setup.js    // setup which property to support
  - app.js      // app root
+ system
  + core
    - mi.js          // the core mi implementation
    - ui.js          // ui implementation
    - util.js        // util implementation
    - helper.js      // helper implementation
    - library.js     // library implementation
    - controller.js  // controller implementation
    - model.js       // model implementation
    - collection.js  // collection implementation
    - router.js      // router implementation
    - setup.js       // setup which implementation(s) to support
  + events
    - system_core_event.js  // system events
  + utils
    - after.js         // do something after some method
    - aop.js           // create an execute queue
    - array.js         // convert object to array if success
    - before.js        // do something before some method
    - copy.js          // convert arguments to array
    - data_to_tree.js  // convert horizontal data to tree
    - date.js          // date util
    - delay.js         // delay to execute a function
    - each.js          // iteration an object such as function, object, array or collection
    - filter.js        // filter an array to return user want
    - fx.js            // animation
    - index_of.js      // search form an object or array
    - is.js            // check object type
    - is_class.js      // check instance is mi class
    - list.js          // convert an array to a list
    - map.js           // map an array or an object
    - method.js        // wrapper method
    - mix.js           // mix object with another
    - rmb.js           // every three plus ',', such as 123,456,789.00
    - trim.js          // trim right and left blank chars
    - type.js          // get object type
    - setup.js         // setup which system utils to support
  + libraries    
    - setup.js         // setup which system librar(y|ies) to support
  + helpers
    - setup.js         // setup which system helper(s) to support
  - setup.js           // setup which property to support
```

##example
```javascript
    you can run example/index.html
```

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
    mi.log(mi.toArray(arguments);
}

myMethod(1,2,3);  // [1,2,3]
```


###create helper
```javascript
mi.helper("isString", function(theObject){
    return mi.is("string", theObject);
})

//use
mi.log(isString(123));  // false

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
