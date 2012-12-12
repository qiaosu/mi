define(function(require){
    var mi = require("../../system/core/mi");

    var PagingEvent = require("../events/paging_event");

    return mi.ui("Paging", {
        page: null,
        pageSizeSelect: null,
        cfg: {
            pageId: 'J_paging',
            pageSizeSelectId: 'J_pageSize',
            pageItemTag: 'A',
            pageValueKey: 'data-val'
        },
        /**
         * initialize
         * @param {Object} cfg the Paging initialize config data
         * @return {void}
         */
        initialize : function(cfg){
            var cfg = cfg || {};
            mi.each(cfg, function(value, key){
                this.cfg[key] = value;
            }, this);
            this.page = $(this.cfg.pageId);
            this.pageSizeSelect = $(this.cfg.pageSizeSelectId);
            this.bind();
        },
        /**
         * page click handler
         * @param {Object} evt arale event object
         * @return {void}
         */
        pageChangeHandler: function(evt){
            var pageItem = Node(evt.currentTarget);
            this.trigger(PagingEvent.PAGE_CHANGE, {page:pageItem.attr(this.cfg.pageValueKey)});
            evt.stopEvent();
        },
        /**
         * page size change handler
         * @param {Object} evt the event object contains type and data attributes
         * @return {void}
         */
        pageSizeChangeHandler: function(evt){
            this.trigger(PagingEvent.PAGE_SIZE_CHANGE, {pageSize:evt.currentTarget.value});
        },
        /**
         * register event handler
         * @return {void}
         */
        bind: function(){

            E.on($$(this.cfg.pageItemTag, this.page), 'click', this, this.pageChangeHandler);

            this.pageSizeSelect && E.on(this.pageSizeSelect, 'change', this, this.pageSizeChangeHandler);

        },
        /**
         * get the current pageSize
         * @return {String} this.pageSizeSelect's vlaue
         */
        getPageSize: function(){
            if(this.pageSizeSelect){
                return this.pageSizeSelect.attr("value");
            } else {
                return '';
            }
        }
    });
})