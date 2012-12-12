/**
 * app
 * @path app.js
 */
define(function(require, exports, module) {

    /**
     * include the core mi, must be include first
     * @type {Function}
     */
    var mi = require("../system/core/mi");

    /**
     * enable console log if console supported
     * @type {Boolean}
     */
    mi.log.enable = true;


    /**
     * setup application core which method user want to support
     */
    require("./setup");


    /** include tab event */
    var TabEvent = require("./events/tab_event");

    /** include paging event */
    var PagingEvent = require("./events/paging_event");

    /** include the ui form manager */
    var FormManager = require("./ui/form/form_manager");

    /** include ui trade number form */
    var TradeNoForm = require("./ui/form/form_of_trade_number");

    /** include ui date type form */
    var DateTypeForm = require("./ui/form/form_of_date_type");

    /** include ui refund type form */
    var RefundTypeForm = require("./ui/form/form_of_refund_type");

    /** include ui query type tab */
    var QueryTypeTab = require("./ui/tab/tab_query_type");

    /** include ui paging */
    var Paging = require("./ui/paging/paging");


    var app = function(){

        var query = {
            init: function(){
                this.initForm();
                this.initQueryTypeTab();
                this.initDownloadLinks();
                this.initPaging();
            },
            /**
             * web forms init
             * @return {void}
             */
            initForm : function(){
                /** init the form manager */
                this.formManager = new FormManager();

                if($("J_QueryByTradeNoForm") && $('J_QueryByTradeNoBtn')){

                    /** trade number validator init */
                    var tradeNoForm = new TradeNoForm('J_QueryByTradeNoForm', 'J_QueryByTradeNoBtn');

                    tradeNoForm.init();

                    this.formManager.set(tradeNoForm);

                    mi.log.info("TradeNoForm initialize with #J_QueryByTradeNoForm successful!");

                } else {
                    mi.log.warn("TradeNoForm initialize with #J_QueryByTradeNoForm failure, because #J_QueryByTradeNoForm doesn't exists!");
                }

                if($('J_QueryByDateTypeForm') && $('J_QueryByDateTypeBtn')){

                    /** date type validator */
                    var dateTypeForm = new DateTypeForm('J_QueryByDateTypeForm', 'J_QueryByDateTypeBtn');

                    dateTypeForm.init();

                    this.formManager.set(dateTypeForm);

                    mi.log.info("DateTypeForm initialize with #J_QueryByDateTypeForm successful!");

                } else {
                    mi.log.warn("DateTypeForm initialize with #J_QueryByDateTypeForm successful, because #J_QueryByDateTypeForm doesn't exists!");
                }

                if($('J_QueryByRefundTypeForm') && $('J_QueryByRefundTypeBtn')){

                    /** refund type validator init */
                    var refundTypeForm = new RefundTypeForm('J_QueryByRefundTypeForm', 'J_QueryByRefundTypeBtn');

                    refundTypeForm.init();

                    this.formManager.set(refundTypeForm);

                    mi.log.info("RefundTypeForm initialize with #J_QueryByRefundTypeForm successful!");

                } else {
                    mi.log.warn("RefundTypeForm initialize with #J_QueryByRefundTypeForm successful, because #J_QueryByRefundTypeForm doesn't exists!");
                }

                /** enable all forms */
                this.formManager.enable();

                if(this.formManager.currentForm){
                    mi.log.info("current search form is #" + this.formManager.currentForm.formId);

                } else {
                    mi.log.warn("there is no search form!");
                }
            },
            /**
             *  tab change event handler, it will trigger if there is a current search form
             * @param {Object} evt the event object contains type and data attributes
             * @return {void}
             */
            tabChangeHandler: function(evt){

                if(!this.formManager.currentForm){
                    mi.log.warn("you want to change tab, but current form is null!");
                    return;
                }
                this.formManager.currentForm.setActionToSearch();
                /** add query type field */
                this.formManager.addFieldToCurrentForm({
                    name: "tabType",
                    type: "hidden",
                    value: evt.data.tabType
                });
                /** add page size field */
                this.formManager.addFieldToCurrentForm({
                    name: "pageSize",
                    type: "hidden",
                    value: this.page ? this.page.getPageSize() : ''
                });
                mi.log.info("tab change start");
                this.formManager.currentForm.submit();
            },
            /**
             * query type tab init
             * @return {void}
             */
            initQueryTypeTab: function(){

                if(!$('J_triggers')){
                    mi.log.warn("QueryTypeTab initialize failure, because #J_trigger doesn't exists!");
                    return;
                }
                this.tab = new QueryTypeTab();
                /**
                 * set the tab's queryType if need to append to a form
                 */
                this.tab.setQueryForm(this.formManager.getCurrentForm());
                this.tab.on(TabEvent.CHANGE, this.tabChangeHandler, this);
                mi.log.info("QueryTypeTab initialize with #J_triggers successful!");

            },
            /**
             * excel and txt download event handler
             * @param {Object} evt
             * @return {void}
             */
            downloadHandler : function(evt){
                var downloadBtn = Node(evt.currentTarget);
                var downloadType = downloadBtn.attr("data-downloadType");
                var currentForm = this.formManager.getCurrentForm();
                if(!downloadType){throw new Error('file download type is not exists!');}
                if(currentForm){

                    currentForm.setActionToDownloadUrl();

                    /** add query type field */
                    this.formManager.addFieldToCurrentForm({
                        name: "tabType",
                        type: "hidden",
                        value: this.tab.getCurrentTabType()
                    });

                    /** add download file type field */
                    this.formManager.addFieldToCurrentForm({
                        name: "downloadType",
                        type: "hidden",
                        value: downloadType
                    });

                    mi.log.info("start download, current download url is " + currentForm.form.attr("action"));

                    currentForm.submit();

                    evt.stopEvent();

                } else {
                    mi.log.error("current download form is null, please check form has attribute data-current='true'!");
                }
            },
            /**
             * download links init
             * @return {void}
             */
            initDownloadLinks: function(){
                /**
                 * excel download link button
                 * @type {AraleObject}
                 */
                var excelDownloadBtn = $("J_downloadByExcel");

                /**
                 * txt download link button
                 * @type {AraleObject}
                 */
                var txtDownloadBtn = $("J_downloadByTxt");

                /**
                 * excel download
                 */
                if(excelDownloadBtn){
                    E.on(excelDownloadBtn, 'click', this, this.downloadHandler);
                    mi.log.info('#J_downloadByExcel register click event successful!');
                }

                /**
                 * txt download
                 */
                if(txtDownloadBtn){
                    E.on(txtDownloadBtn, 'click', this, this.downloadHandler);
                    mi.log.info('#J_downloadByTxt register click event successful!');
                }
            },
            /**
             * page change event handler
             * @param {Object} evt the event object contains type and data attributes
             * @return {void}
             */
            pageChangeHandler: function(evt){

                if(!this.formManager.currentForm){
                    mi.log.warn("you want to submit form, but current form is null!");
                    return;
                }

                this.formManager.currentForm.setActionToSearch();

                /** add query type field */
                this.formManager.addFieldToCurrentForm({
                    name: "tabType",
                    type: "hidden",
                    value: this.tab.getCurrentTabType()
                });
                /** add page size field */
                this.formManager.addFieldToCurrentForm({
                    name: "pageSize",
                    type: "hidden",
                    value: this.page.getPageSize()
                });
                /** add page size field */
                this.formManager.addFieldToCurrentForm({
                    name: "pageNo",
                    type: "hidden",
                    value: evt.data.page
                });

                mi.log.info("page change start");

                this.formManager.currentForm.submit();
            },
            /**
             * page size change handler
             * @param {Object} evt the event oject contains type and data attributes
             * @return {void}
             */
            pageSizeChangeHandler: function(evt){

                if(!this.formManager.currentForm){
                    mi.log.warn("you want to submit form, but current form is null!");
                    return;
                }

                this.formManager.currentForm.setActionToSearch();

                /** add query type field */
                this.formManager.addFieldToCurrentForm({
                    name: "tabType",
                    type: "hidden",
                    value: this.tab.getCurrentTabType()
                });
                /** add page size field */
                this.formManager.addFieldToCurrentForm({
                    name: "pageSize",
                    type: "hidden",
                    value: evt.data.pageSize
                });

                mi.log.info("pageSize change start");

                this.formManager.currentForm.submit();
            },
            /**
             * paging init
             * @return {void}
             */
            initPaging: function(){

                if(!$('J_paging')){
                    mi.log.warn("Paging initialize failure, because #J_paging doesn't exists!");
                    return;
                }

                this.page = new Paging();

                this.page.on(PagingEvent.PAGE_CHANGE, this.pageChangeHandler, this);

                this.page.on(PagingEvent.PAGE_SIZE_CHANGE, this.pageSizeChangeHandler, this);

                mi.log.info("Paging initialize with #J_paging successful!");
            }
        }

        query.init();

    };

    module.exports = app;

});
