/**
 * Created by Karlen on 22/10/17.
 */
CONSTANTS = (function () {
    var CITY_LOCATIONS = {
        london: {
            latitude: 51.509865,
            longitude: -0.118092,
            name:'London'
        },
        vienna: {
            latitude: 48.210033,
            longitude: 16.363449,
            name:'Vienna'
        },
        amsterdam: {
            latitude: 52.370216,
            longitude: 	4.895168,
            name:'Amsterdam'
        },
        madrid: {
            latitude: 40.416775,
            longitude: -3.703790,
            name:'Mardid'
        }
    };
    var WEEK_DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {CITY_LOCATIONS: CITY_LOCATIONS,WEEK_DAYS:WEEK_DAYS,MONTHS_SHORT:MONTHS_SHORT}
})();