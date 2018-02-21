# weatherForecast

developer.forecast.io is chosen for as weather API.

I've build a tiny web-server, to serve requests to the mentioned API, because APIs don't allow CORS requests.
I tried with fetch API no-cors mode, but it was not possible to get json from 'opaque' type response. So the transfer part 
moved to Node server.js.

To run the application use the following commands

**_npm install_**

**_node server.js_**

And application will be running on http://localhost:3300/
