/**
 * Created by Karlen on 22/10/17.
 */
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3300;

app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(port, function () {
    console.log('application is running on port  ' + port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/forecast', function (req, res) {
    fetch(req.query.url)
        .then(function (response) {
            if (response.status < 400) {
                return response.json();
            }
        })
        .then(function (respJson) {
            if (respJson) {
                defaultResponseHnadler(res, respJson);
            }
        })
        .catch(function (err) {
            defaultResponseHnadler(res, null, err);
        });
});

function defaultResponseHnadler(res, json, err) {
    if (err) {
        res.send({'error': 'An error has occurred while fetching'});
    } else {
        if (json) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify((json)));
        }
    }
};