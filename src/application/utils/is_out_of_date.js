define(function(require){
    /**
     * the core mi function
     * @type {Function}
     */
    var mi = require("../../system/core/mi");
    /**
     * @name isOutOfDate
     * @memberOf _
     * @param {String} dateStart
     * @param {String} dateEnd
     * @param {Number} [days]
     * @return {Number} -1, 0, 1
     */
    mi.util("isOutOfDate", function(dateStart, dateEnd, days){
        var dateStart = dateStart, dateEnd = dateEnd, days = days || 365;
        dateStart = dateStart.replace(/[-\.]/g, '/');
        dateEnd = dateEnd.replace(/[-\.]/g, '/');
        var dateStartTime = new Date(dateStart);
        var dateEndTime = new Date(dateEnd);

        var timeBetween = dateEndTime.getTime() - dateStartTime.getTime();

        if(timeBetween < 0){
            return -1;
        }
        if((Math.abs(timeBetween)/3600000/24) > days){
            return 1;
        }

        return 0;

    }, true);
})