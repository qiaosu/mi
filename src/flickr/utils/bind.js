define(function(require){
    // Function bind
    // from UnderscoreJs

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Binding with arguments is also known as `curry`.
    // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
    // We check for `func.bind` first, to fail fast when `func` is undefined.
    return function(func, context) {
        var nativeBind = Function.prototype.bind,
            nativeSlice = Array.prototype.slice,
            ctor = function(){},
            bound, args;
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, nativeSlice.call(arguments, 1));
        //if (!_.isFunction(func)) throw new TypeError;
        args = nativeSlice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(nativeSlice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            var result = func.apply(self, args.concat(nativeSlice.call(arguments)));
            if (Object(result) === result) return result;
            console.log(self)
            return self;
        };
    };
})