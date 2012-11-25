define(function(require){
    
    var mi = require("../../system/core/mi");
    
    var DisplayObject = require("./display_object");

    var fx = mi.util("fx");

    return DisplayObject.extend({
        
        time: 500,
        
        cursor: 0,

        offsets: {x:0, y: 0},
        
        path: [[0, 0], [300, 0], [300, 300], [0, 300]],

        x: function(x){
            if(arguments.length >= 1){
                this.dom.style.left = x + "px";
            } else {
                return parseInt(this.dom.style.left);
            }
            
        },

        y: function(y){
            if(arguments.length >= 1){
                this.dom.style.top = y + "px";
            } else {
                return parseInt(this.dom.style.top);
            }
            
        },

        moveTo : function(thePoint){
            fx(function(f){
                
                this.x(f(this.x(), this.dx + this.offsets.x));

                this.y(f(this.y(), this.dy + this.offsets.y));

            }, {
                time: this.time,
                
                init: function(){
                    this.dx = thePoint[0];
                    this.dy = thePoint[1];
                },
                
                end : function(){

                        var thePoint = this.path[(++this.cursor) % this.path.length];

                        this.moveTo(thePoint);
                }

            }, this);
        },

        add: function(point){
            this.path.push(point);
            return this;
        },

        move : function(delay){
            var _this = this;
            mi.delay(function(){
                _this.moveTo(_this.path[_this.cursor]);
            }, this.delay)();

        },

        init: function(delay){

            this.delay = delay || 100;

            this.offsets = {
                x: this.x(),
                y: this.y()
            };

            return this;
        }
    });
})