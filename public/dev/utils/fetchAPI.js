/**
 * Created by Karlen on 21/10/17.
 */
FetchAPI = (function () {
    var api = {};
    api.REQUEST_METHODS = {
        GET: 'GET',
        POST: 'POST'
    };
    XHRFactory = (function () {
        var nullFunction = function () {
        };

        function createXHR() {
            var obj;
            try {
                obj = new XMLHttpRequest()
            } catch (e) {
                obj = new ActiveXObject("Microsoft.XMLHTTP")
            }
            return obj
        }

        return ({
            getInstance: function () {
                return createXHR();
            }
        })
    })();

    // weather API does not allow cors , so fetch api used in node js just to transfer data.
    var send = function (url, method, data, handler, handlerParams, urlencoded, headers) {
        var req = XHRFactory.getInstance();
        if (method.toLowerCase() === "get" && data !== "" && data != null) {
            url = url + "?" + data
        }
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status < 400) {
                    if (handler) {
                        try {
                            req.json = JSON.parse(req.responseText);
                        } catch (err) {
                            throw new Error(err);
                        }
                        handler(req, handlerParams)
                    }
                    req = null
                }
            }
        };
        if (method === api.REQUEST_METHODS.GET) {
            req.open(api.REQUEST_METHODS.GET, url, true);
            req.setRequestHeader("Content-Type", "application/json");
            req.send(null)
        } else if (method === api.REQUEST_METHODS.POST) {
            req.open(api.REQUEST_METHODS.POST, url, true);
            if (urlencoded) {
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            }
            req.send("" + data)
        }
        return req
    };

    /**
     *
     * @param url
     * @param callback
     * @param args for callbacks, it will be he second parameter, firat one will be the response
     */
    api.sendGET = function (url, callback, args) {
        send(url, api.REQUEST_METHODS.GET, null, callback, args, true);
        //return featApiSend(url, config, callback, args);
    };

    /**
     *
     * @param url
     * @param data
     * @param callback
     * @param args
     */
    api.sendPOST = function (url, data, callback, args) {
        if (!data) {
            data = ""
        }
        send(url, api.REQUEST_METHODS.POST, data, callback, args, true);
    };
    return api;
})();
