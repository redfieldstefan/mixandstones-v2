'use strict';

require('node-jsx-babel').install({ extension: '.jsx' });

var bodyparser = require('body-parser');
var express = require('express');
var hbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var path = require('path');

var serverConfig = require('./config');

var app = express();
var server = http.createServer(app);

app.use(bodyparser.json());

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates'));

require('../routes/api')(app);
require('../routes/middleware')(app);
require('../routes/react-server-render')(app);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ms_dev');

var port = process.env.PORT || serverConfig.port;

server.listen(port, function () {
  /*eslint-disable no-console*/
  console.log('Server is listenin hard on port', port);
  /*eslint-enable no-console*/
});
