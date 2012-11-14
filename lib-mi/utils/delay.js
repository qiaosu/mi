mi.util("delay", function(callback, time){
    var timer = null;
    return function(){
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            callback.apply(context, args);
        }, time || 100);
    }
})