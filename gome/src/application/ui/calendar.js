define(function(require){
    var _ = require("../../system/core/mi");
    var CalendarEvent = require("../events/calendar_event");

    return _.ui("Calendar", {
        calendar : null,
        cfg : {
            srcId : null,
            week_start : '7',
            selected : [],
            mindate : '',
            maxdate : '',
            date_delimiter : ".",
            dropfilter : true
        },
        minDate : '',
        maxDate : '',
        initialize : function(cfg){
            var cfg = cfg || {};
            if(!_.is("object", cfg)){
                throw new Error("");
            }
            _.list(this.cfg).map(function(value, key){
                if(key.toLowerCase() == "mindate"){
                    this.minDate = cfg[key];
                }
                if(key.toLowerCase() == "maxdate"){
                    this.maxDate = cfg[key];
                }
                if(cfg[key]){
                    return cfg[key];
                } else {
                    return this.cfg[key];
                }
            }, this);
        },
        selectedDate : function(minDate,maxDate){
            this.cfg.selected = [minDate, maxDate];
        },
        load : function(){
            var _this = this;
            Loader.use('aralex.calendar', function() {
                _this.calendar = new aralex.calendar.Calendar(_this.cfg);
                _this.calendar.dateField = null;
                _this.calendar.render();
                _this.calendar.after("doSelectEvent",function(date){
                    if(this.dateField){
                        this.dateField.attr("value", date);
                    }
                    this.hide();
                    this.dateField = null;
                });
            });

            A($$(".mi-input")).each(function(input, index){
                if(input.attr("data-type") == "date"){

                    /** 阻止body的click事件 */
                    E.on(input, "click", function(e){e.stopEvent();});

                    E.on(input, "focus", function(e){
                        var pos = D.getOffsets(e.currentTarget);
                       /** 修改ie系列下面的垂直距离 */
                        if(arale.browser.name == "ie"){
                            pos.top += 2;
                        }
                        _this.calendar.dateField = input;
                        if(input.attr("value") != ''){
                            /** 以下三个属性均需要设置, 方便用户及时的显示当前日期。 */
                            _this.calendar.attr("mindate", _this.minDate);
                            _this.calendar.attr("maxdate", _this.maxDate);
                            _this.calendar.attr("pagedate", input.attr("value"));
                            _this.calendar.select(input.attr("value"));
                        }
                        _this.calendar.setPosition(pos.left, pos.top + 30);
                        _this.calendar.show();
                    });
                }
            });

            this.bind();

            this.trigger(CalendarEvent.LOAD);
        },
        bind : function(){
            var _this = this;
            E.on(document.body, "click", function(e){
                if (!$(e.target).hasClass('filterchange')) {
                    _this.calendar && _this.calendar.hide();
                }
            })
        },
        hide : function(){
            this.calendar.hide();
        },
        show : function(){
            this.calendar.show();
        }
    });
})