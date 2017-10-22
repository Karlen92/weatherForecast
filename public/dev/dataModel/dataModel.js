/**
 * Created by Karlen on 21/10/17.
 */

// Data model works like pub/sub patern

var DataModel = (function () {
    //
    var model = {};
    // predefined topics, every consumer should provide topics it's listening
    // it will be notified whenever change occurs on that topic. Provided topic must from the list below
    var topics = {
        WEATHER_DATA_LOADING: "WEATHER_DATA_LOADING",
        WEATHER_DATA_UPDATED: "WEATHER_DATA_UPDATED",
        WEATHER_DATA_DELETED: "WEATHER_DATA_DELETED"
    };
    model.topics = topics;
    model.consumers = {};
    model.weatherData = {};

    /* Weather Data */

    /**
     *
     * @param data
     */
    model.addWeatherData = function (data) {
        this.weatherData = data;
        this.notify(this.topics.WEATHER_DATA_UPDATED, this.getWeatherData());
    };
    /**
     *
     * @returns {{}|*|null}
     */
    model.getWeatherData = function () {
        return this.weatherData;
    };
    /**
     *
     * @param data
     */
    model.deleteRawDeviceData = function (data) {
        this.weatherData = null;
        his.notify(this.topics.WEATHER_DATA_DELETED, this.getWeatherData());
        // delete and notify
    };
    /**
     *
     * @consumer will be called whenever event fires concerning @topic
     * @param consumer {Function}
     * @param topic
     */
    model.consume = function (consumer, topic) {
        if (consumer && topic) {
            if (!this.consumers[topic]) {
                this.consumers[topic] = [];
            }
            this.consumers[topic].push(consumer)
        }
    };
    /**
     * calls all consumer listeing to topic with params
     * data and topic , where data is new changed data fully
     *
     * @param topic
     * @param data
     */
    model.notify = function (topic, data) {
        var toBeNotifed = this.consumers[topic];
        if (toBeNotifed && toBeNotifed.length > 0) {
            for (var i = 0; i < toBeNotifed.length; i++) {
                toBeNotifed[i](data, topic);
            }
        }
    };
    /**
     *
     * @param consumer
     * @param topic
     */
    model.removeConsumer = function (consumer, topic) {
        for (var i = 0; i < this.consumers[topic].length; i++) {
            if (this.consumers[topic][i] === consumer) {
                this.consumers[topic].splice(i, 1);
            }
        }
    };

    return model;
})();