/**
 * Created by Karlen on 21/10/17.
 */
var WeatherAPI = (function () {
    var api = {};
    var CONTROLLERS = {forecast: 'forecast'}; // 7 days forecast api + today
    var UNITS = {si: 'si'}; // 'si' gives the ata with celsius, default is farenhayt
    var KEY = '1e993f2b33a9b4f1c7566590b27bb00e';
    var URL = 'https://api.darksky.net/';
    var INTERNAL_API_URL = './';


    /**
     * intended for providing consistent api for views and local model, so app will not depend on used api.
     *
     * interface description for internal use
     * Daily data
     "time":
     "summary": "Clear",
     "icon": "clear-night",
     "precipIntensity": 0,
     "precipProbability": 0,
     "temperature": 8.82,
     "apparentTemperature": 8.82,
     "dewPoint": 0.18,
     "humidity": 0.55,
     "pressure": 1016.18,
     "windSpeed": 1.11,
     "windGust": 3.08,
     "windBearing": 35,
     "cloudCover": 0,
     "uvIndex": 0,
     "visibility": 10.01,
     "ozone": 280.06
     *
     * @param resp
     * @returns {null}
     *
     */
    var dataMaper = function (resp) {
        try {
            var json = resp.json;
            var forecast = {};
            forecast.currently = json.currently;
            json.daily = json.daily.data.map(function (item) {
                item.time = new Date(item.time * 1000);
                return item;
            });
            return json;
        } catch (err) {
            console.log("Error occurred while processing weather data");
            throw  new Error(err);
        }
    };

    /**
     *
     * @param geoLocation
     * @returns {string}
     */
    getForecastUrl = function (geoLocation) {
        var url = URL + CONTROLLERS.forecast + '/' + KEY + '/';
        url += geoLocation.longitude + ',' + geoLocation.latitude + '/?';
        url += 'units=' + UNITS.si;
        return url;
    };

    /**
     *
     * @param geoLocation has properties longitude and latitude
     * @param apiController
     * @returns {null}
     */
    var getApiUrl = function (geoLocation, apiController) {
        switch (apiController) {
            case CONTROLLERS.forecast:
                return getForecastUrl(geoLocation);
            default :
                return null;//not yet implemented
        }
    };

    /**
     * @param geoLocation = {longitude,latitude}
     * @param callback
     */
    api.getForecast = function (geoLocation, callback) {
        var queryUrl = getApiUrl(geoLocation, CONTROLLERS.forecast);
        // if API alows cross origin then queryUrl can be passed and node js won't be needed
        var url = INTERNAL_API_URL + CONTROLLERS.forecast + '?url=' + queryUrl;
        FetchAPI.sendGET(url, function (resp) {
                callback(dataMaper(resp));
            }
        )
        ;
    };
    return api;
    //https://api.darksky.net/forecast/1e993f2b33a9b4f1c7566590b27bb00e/40.177200,-44.503490/?units=si
})();