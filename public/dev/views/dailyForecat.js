/**
 * Created by Karlen on 22/10/17.
 */
DailyForecast = function () {
    this.data = null;
    this.wrapper = null;
    this.data = null;
    this.skycons = new Skycons({"color": "#248aad"});
};

/**
 *renders the
 * @param data
 */
DailyForecast.prototype.setData = function (data) {
    this.data = data;
};

/**
 * function returns html nodes, ready to append to dom
 * @param options {onclick}
 *
 * onclick is binded on top of the element
 */
DailyForecast.prototype.render = function (options) {
    var currentDate = new Date();
    this.wrapper = document.createElement('div');
    this.wrapper.onclick = options.onclick;
    this.wrapper.className = "forecastDays infoBox";
    this.wrapper.innerHTML = "";
    var summary = document.createElement("div");
    summary.className = "forecastSummary";
    summary.innerHTML = this.data.summary;
    var weatherImage = document.createElement("canvas");
    //weatherImage.setAttribute('src',"http://icons.iconarchive.com/icons/wineass/ios7-redesign/512/Weather-icon.png");
    weatherImage.className = "weatherIcon";

    this.skycons.add(weatherImage, Skycons[this.data.icon]);

    var maxTemperature = document.createElement("div");
    maxTemperature.className = "forecastTemperature";
    maxTemperature.style['margin-top'] = "20px";
    maxTemperature.innerHTML = 'Highest ' + this.data.temperatureMax + " <span class='temperatureColor'>°C</span>";
    var minTemperature = document.createElement("div");
    minTemperature.className = "forecastTemperature";
    minTemperature.innerHTML = 'Lowest ' + this.data.temperatureMin + " <span class='temperatureColor'>°C</span>";

    var dateTime = document.createElement("div");
    dateTime.className = "forecastTime";
    dateTime.innerHTML = CONSTANTS.WEEK_DAYS[this.data.time.getDay()] + ',' + CONSTANTS.MONTHS_SHORT[this.data.time.getMonth()] + ' ' + this.data.time.getDate();
    if (this.data.time.getDate() === currentDate.getDate()) {
        dateTime.innerHTML = "Today";
    }

    this.wrapper.appendChild(weatherImage);
    this.wrapper.appendChild(summary);
    this.wrapper.appendChild(maxTemperature);
    this.wrapper.appendChild(minTemperature);
    this.wrapper.appendChild(dateTime);
    return this.wrapper;
};

/**
 * selects the this.wrapper visually
 */
DailyForecast.prototype.select = function () {
    this.wrapper.className += ' selectedForecast';
};

/**
 * unselects the this.wrapper visually
 */
DailyForecast.prototype.unSelect = function () {
    this.wrapper.className = 'forecastDays infoBox';
};

/***
 * shows loading inside the this.wrapper
 */
DailyForecast.prototype.showLoading = function () {
    this.wrapper.className = 'forecastDays infoBox';
    this.wrapper.innerHTML = "";
    Utility.showLoading(this.wrapper);
};