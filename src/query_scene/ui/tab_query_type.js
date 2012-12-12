define(function(require){
    var mi = require("../../system/core/mi");

    var TabEvent = require("../events/tab_event");

    return mi.ui("QueryTypeTab", {
        tab: null,
        tabTrigger: null,
        tabTriggerCurrent: null,
        tabTriggerCurrentClass: "mi-tab-trigger-item-current",
        tabContent: null,
        tabContentCurrent: null,
        queryForm: null,
        cfg: {
            tabTriggerId: 'J_triggers',
            tabContentId: 'J_views',
            tabTriggerItemTag: 'A',
            tabTypeValueKey: 'data-tabType'
        },
        /**
         * query type tab initialize method
         * @param {Object} cfg the query type tab config data
         * @return {void}
         */
        initialize : function(cfg){
            var cfg = cfg || {};
            mi.each(cfg, function(value, key){
                this.cfg[key] = value;
            }, this);
            this.tabTrigger = $(this.cfg.tabTriggerId);
            this.tabContent = $(this.cfg.tabContentId);
            this.bind();
        },
        /**
         * register events
         * @return {void}
         */
        bind: function(){
            A($$(this.cfg.tabTriggerItemTag, this.tabTrigger)).each(function(triggerItem){
                if(triggerItem.parent().hasClass(this.tabTriggerCurrentClass)){
                    this.tabTriggerCurrent = triggerItem.node;
                }
                E.on(triggerItem, 'click', this, this.tabTriggerItemClickHandler);
            }, this);
        },
        /**
         * get current query type
         * @return {String} the current query type value
         */
        getCurrentTabType: function(){
            if(this.tabTriggerCurrent){
                return Node(this.tabTriggerCurrent).attr(this.cfg.tabTypeValueKey);
            } else {
                return '';
            }
        },
        /**
         * set the current query form
         * @param {Class} theQueryForm
         * @return {void}
         */
        setQueryForm: function(theQueryForm){
            this.queryForm = theQueryForm;
        },
        /**
         * tab trigger item click hander
         * @param {Object} evt arale event object
         * @return {void}
         */
        tabTriggerItemClickHandler: function(evt){
            if(this.queryForm){
                var tabTrigger = evt.currentTarget;
                var tabTriggerItem = Node(tabTrigger);

                if(!this.tabTriggerCurrent || this.tabTriggerCurrent !== tabTrigger){
                    mi.log.info('tab trigger item clicked:' + TabEvent.CHANGE);
                    this.trigger(TabEvent.CHANGE, {tabType:tabTriggerItem.attr(this.cfg.tabTypeValueKey)});
                    this.tabTriggerCurrent = tabTrigger;
                }

                /** prevent default event */
                evt.stopEvent();
            }
        }
    });
})