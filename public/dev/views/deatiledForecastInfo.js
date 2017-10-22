/**
 * Created by Karlen on 22/10/17.
 */
DailyForecastInfo = function () {
    this.data = null;
    this.wrapper = null;
    this.data = null;
    this.skycons = new Skycons({"color": "#0e7ead"});
};

/**
 *
 * @param data
 */
DailyForecastInfo.prototype.setData = function (data) {
    this.data = data;
};

/**
 * function returns html nodes, ready to append to dom
 * @param options {onclick}
 *
 * onclick is binded on top of the element
 */
DailyForecastInfo.prototype.render = function (options) {
    var currentDate = new Date();
    this.wrapper = document.createElement('div');
    this.wrapper.className = "detailedInfoWrapper infoBox";
    this.wrapper.innerHTML = "";

    var weatherImage = document.createElement("canvas");
    //weatherImage.setAttribute('src',"http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Weather-icon.png");
    weatherImage.className = "forecastInfoWeatherIcon";

    this.skycons.add(weatherImage, Skycons[this.data.icon]);

    var maxTemperature = document.createElement("div");
    maxTemperature.className = "forecastInfoTemperature";
    maxTemperature.innerHTML = 'Highest: ' + this.data.temperatureMax + " <span class='temperatureColor'>°C</span>";

    var minTemperature = document.createElement("div");
    minTemperature.className = "forecastInfoTemperature";
    minTemperature.innerHTML = 'Lowest: ' + this.data.temperatureMin + " <span class='temperatureColor'>°C</span>";

    var cloudCover = document.createElement("div");
    cloudCover.className = "forecastInfoTemperature";
    cloudCover.innerHTML = 'Cloud Cover: ' + this.data.cloudCover * 100 + " %";

    var humidity = document.createElement("div");
    humidity.className = "forecastInfoTemperature";
    humidity.innerHTML = 'Humidity: ' + this.data.humidity * 100 + " %";

    var windSpeed = document.createElement("div");
    windSpeed.className = "forecastInfoTemperature";
    windSpeed.innerHTML = "Wind speed: " + this.data.windSpeed + " m/s";

    var ozone = document.createElement("div");
    ozone.className = "forecastInfoTemperature";
    ozone.innerHTML = "Ozone: " + this.data.ozone;

    var avgTemperature = document.createElement("div");
    avgTemperature.className = "forecastInfoSummary";
    var avgTempInt = parseInt((this.data.temperatureMin + this.data.temperatureMax) / 2);
    avgTemperature.innerHTML = avgTempInt + " <span class='temperatureColor'>°C</span>";


    var summary = document.createElement("div");
    summary.className = "forecastInfoSummary";
    summary.innerHTML = this.data.summary;

    var dateTime = document.createElement("div");
    dateTime.className = "forecastInfoTime";
    dateTime.innerHTML = CONSTANTS.WEEK_DAYS[this.data.time.getDay()] + ',' + CONSTANTS.MONTHS_SHORT[this.data.time.getMonth()] + ' ' + this.data.time.getDate();
    if (this.data.time.getDate() === currentDate.getDate()) {
        dateTime.innerHTML = "Today";
    }

    this.wrapper.appendChild(dateTime);
    this.wrapper.appendChild(weatherImage);

    this.wrapper.appendChild(avgTemperature);
    this.wrapper.appendChild(summary);

    this.wrapper.appendChild(maxTemperature);
    this.wrapper.appendChild(minTemperature);
    this.wrapper.appendChild(humidity);
    this.wrapper.appendChild(cloudCover);
    this.wrapper.appendChild(windSpeed);
    this.wrapper.appendChild(ozone);
    return this.wrapper;
};


/***
 * shows loading inside the this.wrapper
 */
DailyForecastInfo.prototype.showLoading = function () {
    this.wrapper.className = 'detailedInfoWrapper infoBox';
    this.wrapper.innerHTML = "";
    Utility.showLoading(this.wrapper);
};