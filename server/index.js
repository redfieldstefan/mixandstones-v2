'use strict';

var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var server = http.createServer(app);

app.use(bodyparser.json());

require('../routes/api')(app);
require('../routes/ui')(app);

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Server is listenin hard on port:', port);
});


