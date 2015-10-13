var express = require('express');
var app = express();
var fs = require("fs");
var os = require("os");

app.get('/', function (req, res) {
    res.end("Please specify what do you want.");
})

app.get('/hostname', function (req, res) {
    res.end(os.homedir());
})

app.get('/platform', function (req, res) {
    res.end(os.platform());
})

app.get('/memory', function (req, res) {
    var data = {};
    data.totalmem = os.totalmem();
    data.freemem = os.freemem();
    res.end(JSON.stringify(data));
})

app.get('/all', function (req, res) {
    var data = {};
    data.endianness = os.endianness();
    data.hostname = os.hostname();
    data.arch = os.arch();
    data.hostname = os.hostname();
    data.type = os.type();
    data.platform = os.platform();
    data.uptime = os.uptime();
    data.totalmem = os.totalmem();
    data.freemem = os.freemem();

    res.end(JSON.stringify(data));
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})

