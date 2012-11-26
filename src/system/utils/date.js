define(function(require){
    var _ = require("../core/mi");
    /**
     * date util
     * @name date
     * @param {Date|String} dateString
     * @return {Function}
     */
    _.util("date", function(date){
        var dateParser = {
            date: null,
            dateFormat: 'yyyy.MM.dd',
            parse : function(date){
                if(_.is("date", date)){
                    this.date = date;
                } else {
                    var date = date.replace(/[-\.]/g, "/");
                    var dm = Date.parse(date);
                    if(!isNaN(dm)){
                        this.date = new Date(date);
                    } else {
                        throw new Error("date format not correctly!");
                    }
                }
                return this;
            },
            pad: function(theValue){
                var theValue = parseInt(theValue, 10);
                return (theValue > 10 ? '' : '0') + theValue;
            },
            addYear: function(theYear){
                this.date.setFullYear(this.date.getFullYear() + theYear);
                return this;
            },
            addMonth: function(theMonth){
                this.date.setMonth(this.date.getMonth() + theMonth);
                return this;
            },
            addDate: function(theDate){
                this.date.setDate(this.date.getDate() + theDate);
                return this;
            },
            addWeeks: function(theWeek){
                this.addDate(this.date.getDate() + theWeek * 7);
                return this;
            },
            addHours: function(theHours){
                this.date.setHours(this.date.getHours() + theHours);
                return this;
            },
            addMinutes: function(theMinutes){
                this.date.setMinutes(this.date.getMinutes() + theMinutes);
                return this;
            },
            addSeconds: function(theSeconds){
                this.date.setSeconds(this.date.getSeconds() + theSeconds);
                return this;
            },
            format: function(theFormat){
                this.dateFormat = theFormat;
                return this.dateFormat;
            },
            toString: function(){
                var o = {
                    "M+": this.pad(this.date.getMonth() + 1),
                    "d+": this.pad(this.date.getDate()),
                    "h+": this.pad(this.date.getHours()),
                    "H+": this.pad(this.date.getHours()),
                    "m+": this.pad(this.date.getMinutes()),
                    "s+": this.pad(this.date.getSeconds()),
                    "S" : this.pad(this.date.getMilliseconds()),
                    "q+": Math.floor((this.date.getMonth() + 3) / 3)
                };

                var w = "日一二三四五六".split("");

                var dateString = "";

                if(/(y+)/.test(this.dateFormat)){
                    dateString = this.dateFormat.replace(RegExp.$1, (""+this.date.getFullYear()).substr(4 - RegExp.$1.length));
                }
                if(/(E+)/.test(dateString)){
                    var charLength = RegExp.$1.length;
                    dateString = dateString.replace(RegExp.$1, ((charLength > 1) ? (charLength > 2 ? "星期" : "周") : "") + w[this.date.getDay()]);
                }
                for(var k in o){
                    if(new RegExp("("+k+")").test(dateString)){
                        dateString = dateString.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr((""+o[k]).length));
                    }
                }
                return dateString;
            }

        };

        return dateParser.parse(date);
    }, true);

})


