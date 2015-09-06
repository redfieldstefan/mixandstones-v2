'use strict';

var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var server = http.createServer(app);

app.use(bodyparser.json());

require('../routes/api')(app);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ms_dev');
app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

var port = process.env.PORT || 3000;

server.listen(port, function () {
  /*eslint-disable no-console*/
  console.log('Server is listenin hard on port:', port);
  /*eslint-enable no-console*/
});


