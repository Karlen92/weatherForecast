/**
 * Created by Karlen on 21/10/17.
 */
var USER_ = {};
Utility = (function () {
    var utils = {};
    utils.getUserGeolocation = function (callback) {
        var geolocation;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                geolocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                USER_.location = position;
                if (callback && typeof callback === 'function') {
                    callback(geolocation);
                }
            }, function () {
                console.log("Not allowed to use");
                if (callback && typeof callback === 'function') {
                    callback(null);
                }
            });
        } else {
            if (callback && typeof callback === 'function') {
                callback(null);
            }
            console.log("Browser doesn't support Geolocation");
        }
    };
    /**
     * shows the loading inside the wrapper
     * wrapper must have position:relative style
     * @param wrapper
     */
    utils.showLoading = function (wrapper) {
        var loadingContent = document.createElement('div');
        loadingContent.className = "loadingContent";
        var loadingContentImg = document.createElement('div');
        loadingContent.className = "loadingContentInnerContainer";
        var cont = '<div class="sk-fading-circle">';
        cont += '<div class="sk-circle1 sk-circle"></div>';
        cont += '<div class="sk-circle2 sk-circle"></div>';
        cont += '<div class="sk-circle3 sk-circle"></div>';
        cont += '<div class="sk-circle4 sk-circle"></div>';
        cont += '<div class="sk-circle5 sk-circle"></div>';
        cont += '<div class="sk-circle6 sk-circle"></div>';
        cont += '<div class="sk-circle7 sk-circle"></div>';
        cont += '<div class="sk-circle8 sk-circle"></div>';
        cont += '<div class="sk-circle9 sk-circle"></div>';
        cont += '<div class="sk-circle10 sk-circle"></div>';
        cont += '<div class="sk-circle11 sk-circle"></div>';
        cont += '<div class="sk-circle12 sk-circle"></div>';
        cont += '</div>';
        loadingContentImg.innerHTML = cont;
        loadingContent.appendChild(loadingContentImg);
        wrapper.appendChild(loadingContent);
    };
    return utils;
})();

/*if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('dev/utils/fetchAPI.js', { scope: 'dev/utils/' }).then(function(reg) {
 console.log('Registration succeeded. Scope is ' + reg.scope);
 }).catch(function(error) {
 console.log('Registration failed with ' + error);
 });
 // using service workers for getting result from opaque resp type
 };*/