/**
 * 国美退款业务
 * @data 2012.11.12
 * @author 天孝
 * @system psbp/refund
 */
define(function(require, exports, module) {

    /** include the core mi, must be include first */
    var _ = require("./system/core/mi");

    /** include system core event */
    var SystemCoreEvent = require("./system/events/system_core_event");

    /** include select event */
    var SelectEvent = require("./application/events/select_event");

    /** add event listener before util setup */
    _.dispatcher.on(SystemCoreEvent.UTIL_SET_FINISHED, function(){
        console.log('utils set finished!');
    });

    /** setup application core which namespace user want to support */
    require("./application/core/setup");

    /** setup application utils which user want to support */
    require("./application/utils/setup");

    /** include the ui nav */
    var Nav = require("./application/ui/nav");

    /** include the ui calendar */
    var Calendar = require("./application/ui/calendar");

    /** include the ui form manager */
    var FormManager = require("./application/ui/form_manager");

    /** include ui trade number form */
    var TradeNoForm = require("./application/ui/form_of_trade_number");

    /** include ui date type form */
    var DateTypeForm = require("./application/ui/form_of_date_type");

    /** include ui refund type form */
    var RefundTypeForm = require("./application/ui/form_of_refund_type");


    /** gome business code */
    var Gome = {
        /** the nav instance */
        nav:null,
        /** the calendar instance */
        calendar:null,
        /** the form manager */
        formManger:null,
        /** init method */
        init : function(){
            this.initDomain();
            this.initNav();
            this.initCalendar();
            this.initForm();
        },
        /** init domain */
        initDomain : function(){
            try{
                var aDomain = document.domain.split(".");
                var sDomain = aDomain[aDomain.length - 2] + "." + aDomain[aDomain.length - 1];
                    document.domain = sDomain;
            }catch(ex){

            }
        },
        /** init nav */
        initNav : function(){
            this.nav = new Nav("J_navMenuListUL");
            this.nav.load();
        },
        /** init calendar */
        initCalendar : function(){
            /**
             * create Calendar instance
             * @type {Calendar} the calendar instance
             */
            this.calendar = new Calendar({
                srcId : "J_calendarContainer",
                mindate : '2012.11.01',
                maxdate : '2012.11.30'
            });

            /**
             * load the calendar by arale Loader.use
             */
            this.calendar.load();

            /** hide the calendar when select show */
            _.dispatcher.on(SelectEvent.SHOW, this.hideCalendar, this);

        },
        /** init form */
        initForm : function(){

            /** init the form manager */
            this.formManager = new FormManager();

            /** trade number validator init */
            var tradeNoForm = new TradeNoForm('J_QueryByTradeNoForm', 'J_QueryByTradeNoBtn');

            tradeNoForm.init();

            tradeNoForm.addField({name:"pageSize", value:"20", type:"hidden"});

            tradeNoForm.addField({name:"pageNum", value:"1", type:"hidden"});

            tradeNoForm.addField({name:"QueryType", value:"all", type:"hidden"});

            this.formManager.add(tradeNoForm);

            /** date type validator */
            var dateTypeForm = new DateTypeForm('J_QueryByDateTypeForm', 'J_QueryByDateTypeBtn');

            dateTypeForm.init();

            this.formManager.add(dateTypeForm);

            /** refund type validator init */
            var refundTypeForm = new RefundTypeForm('J_QueryByRefundTypeForm', 'J_QueryByRefundTypeBtn');

            refundTypeForm.init();

            this.formManager.add(refundTypeForm);

            /** enable all forms */
            this.formManager.enable();
        },
        /** hide calendar */
        hideCalendar: function(){
            this.calendar.hide();
        }
    }

    exports.init = function(){ Gome.init(); };

});
