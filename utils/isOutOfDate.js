define(function(require){
    /**
     * util name isOutOfDate
     * @param {String} dateStart start date
     * @param {String} dateEnd end date
     * @param {Number} days the days between start date and end date
     * @return {Number} -1, 0, 1
     */
    return require("mi").util("isOutOfDate", function(dateStart, dateEnd, days){
        var dateStart = dateStart, dateEnd = dateEnd, days = days || 365;
        dateStart = dateStart.replace(/[-\.]/g, '/');
        dateEnd = dateEnd.replace(/[-\.]/g, '/');
        dateStartTime = new Date(dateStart);
        dateEndTime = new Date(dateEnd);

        var timeBetween = dateEndTime.getTime() - dateStartTime.getTime();

        /** 起始日期大于结束日期 */
        if(timeBetween < 0){
            return -1;
        }
        /** 超过了规定的日期区间 */
        if((Math.abs(timeBetween)/3600000/24 + 1) > days){
            return 1;
        }

        return 0;

    }, true);

})