mi.util("rmb", function(stringOrNumber){
    return (stringOrNumber + "").replace(/(\d)(?=(\d{3})+($|\.))/g, "$1,");
})