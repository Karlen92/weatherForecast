I've chosen developer.forecast.io from the list.

I've build a tiny web-server, to serve my request to the mentioned API, because APIs doesn't allow CORS requests.
I tried with fetch no-cors mode, but it was not possible to get json from 'opaque' type response. So the transfer part 
moved to Node server.js, it just transfers data, no logic at all.

To run the application use the following commands

npm install

and then

node server.js

and application will be runing on http://localhost:3300/
