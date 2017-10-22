/**
 * Created by Karlen on 21/10/17.
 */
/**Main controller of the weather fetching and rendering*/
var ForecastBroker = (function () {
    //
    var broker = {};
    var FORECAST_VIEW_COUNT = 8;
    var FORECAST_VIEWS = [];
    var FORECAST_INFO_VIEW = null;
    var selectedForecast = 0;
    var FORECAST_CONTAINER = document.getElementById('forecasts');
    var FORECAST_DETAILED_CONTAINER = document.getElementById('weather-info');
    var CITY_SELECT = document.getElementById('citySelect');
    /**
     *
     */
    broker.initApp = function () {
        Utility.getUserGeolocation(function (location) {
            initViews(location);
            consumeData();
            broker.fetchWeeklyForecastData();
        });
    };

    function initViews(location) {
        // init daily forecasts
        initDetaiyForecasts();
        // init detailed view
        initDetailedInfo();
        // init drop down
        initDropdown(location);
    }

    var initDetaiyForecasts = function () {
        if (!DailyForecast) {
            return;
        }
        for (var i = 0; i < FORECAST_VIEW_COUNT; i++) {
            FORECAST_VIEWS[i] = new DailyForecast();
        }
    };
    broker.fetchWeeklyForecastData = function () {
        WeatherAPI.getForecast(getSelectedCityGeolocation(), function (data) {
            DataModel.addWeatherData(data);
        });
    };

    /**
     * consuming data, on topic WEATHER_DATA_UPDATED
     */
    var consumeData = function () {
        DataModel.consume(function (data) {
            forecastDataRenderer(data);
        }, DataModel.topics.WEATHER_DATA_UPDATED);
    };

    /**
     * rendering data when data model notifies data has arrived
     * @param data
     */
    var forecastDataRenderer = function (data) {
        if (!data)return;
        var dailyData = data.daily;
        FORECAST_CONTAINER.innerHTML = '';
        for (var i = 0; i < dailyData.length; i++) {
            FORECAST_VIEWS[i].setData(dailyData[i]);
            // using f to ensure all closures will contain different i value
            var f = function (index) {
                return function () {
                    FORECAST_VIEWS[selectedForecast].unSelect();
                    FORECAST_VIEWS[index].select();
                    selectedForecast = index;
                    FORECAST_INFO_VIEW.setData(dailyData[index]);
                    FORECAST_DETAILED_CONTAINER.innerHTML = '';
                    FORECAST_DETAILED_CONTAINER.appendChild(FORECAST_INFO_VIEW.render());
                }
            };
            var htmlNode = FORECAST_VIEWS[i].render({
                onclick: f(i)
            });
            FORECAST_CONTAINER.appendChild(htmlNode);
        }
        FORECAST_INFO_VIEW.setData(dailyData[selectedForecast]);
        FORECAST_DETAILED_CONTAINER.innerHTML = '';
        FORECAST_DETAILED_CONTAINER.appendChild(FORECAST_INFO_VIEW.render());
        FORECAST_VIEWS[selectedForecast].select();
    };


    var initDetailedInfo = function () {
        if (!DailyForecastInfo) {
            return;
        }
        FORECAST_INFO_VIEW = new DailyForecastInfo();
    };

    var initDropdown = function (location) {
        var selectedCity = 'london';
        if (location) {
            selectedCity = 'yourcity';
            CONSTANTS.CITY_LOCATIONS['yourcity'] = location;
            CONSTANTS.CITY_LOCATIONS['yourcity'].name = "Your City";
        }
        CITY_SELECT.innerHTML = "";
        for (var i in CONSTANTS.CITY_LOCATIONS) {
            var option = document.createElement('option');
            option.innerHTML = CONSTANTS.CITY_LOCATIONS[i].name;
            option.value = i;
            if (i === selectedCity) {
                option.selected = 'selected';
            }
            CITY_SELECT.appendChild(option);
        }
        CITY_SELECT.onchange = function () {
            setLoadingActiveViews();
            broker.fetchWeeklyForecastData();
        };
    };

    var getSelectedCityGeolocation = function () {
        var selectedVaule = CITY_SELECT.options[CITY_SELECT.selectedIndex].value;
        return CONSTANTS.CITY_LOCATIONS[selectedVaule];
    };

    var setLoadingActiveViews = function () {
        for (var i = 0; i < FORECAST_VIEWS.length; i++) {
            FORECAST_VIEWS[i].showLoading();
        }
        FORECAST_INFO_VIEW.showLoading()
    };

    return broker;
})();
ForecastBroker.initApp();
