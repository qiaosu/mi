define(function(require){
    
    var mi = require("../../system/core/mi");
    
    var DisplayObject = require("./display_object");

    var fx = mi.util("fx");

    return DisplayObject.extend({
        
        time: 500,
        
        cursor: 0,

        offsets: {x:0, y: 0},
        
        pos: [[0, 0], [200, 0], [200, 200], [0, 200]],

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
                    
                    var thePoint = this.pos[(++this.cursor) % this.pos.length];

                    this.moveTo(thePoint);
                
                }

            }, this);
        },

        move: function(){
            
            this.dom = document.getElementById(this.id);

            this.offsets = {
                x: this.x(),
                y: this.y()
            };

            this.moveTo(this.pos[this.cursor]);
        }
    });
})