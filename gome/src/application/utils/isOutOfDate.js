define(function(require){
    var _ = require("../../system/core/mi");
    _.util("isOutOfDate", function(dateStart, dateEnd, days){
        var dateStart = dateStart, dateEnd = dateEnd, days = days || 365;
        dateStart = dateStart.replace(/[-\.]/g, '/');
        dateEnd = dateEnd.replace(/[-\.]/g, '/');
        var dateStartTime = new Date(dateStart);
        var dateEndTime = new Date(dateEnd);

        var timeBetween = dateEndTime.getTime() - dateStartTime.getTime();

        if(timeBetween < 0){
            return -1;
        }
        if((Math.abs(timeBetween)/3600000/24 + 1) > days){
            return 1;
        }

        return 0;

    }, true)
})