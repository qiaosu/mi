mi.helper("isOutOfDate", function(dateStart, dateEnd, days){
    var dateStart = dateStart, dateEnd = dateEnd, days = days || 365;
    dateStart = dateStart.replace(/[-\.]/g, '/');
    dateEnd = dateEnd.replace(/[-\.]/g, '/');
    var dateStartTime = new Date(dateStart);
    var dateEndTime = new Date(dateEnd);

    var timeBetween = dateEndTime.getTime() - dateStartTime.getTime();

    /** ÆðÊ¼ÈÕÆÚ´óÓÚ½áÊøÈÕÆÚ */
    if(timeBetween < 0){
        return -1;
    }
    /** ³¬¹ýÁË¹æ¶¨µÄÈÕÆÚÇø¼ä */
    if((Math.abs(timeBetween)/3600000/24 + 1) > days){
        return 1;
    }

    return 0;

})