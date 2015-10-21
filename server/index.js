'use strict';

require('babel/register');

const bodyparser = require('body-parser');
const express = require('express');
const hbs = require('express-handlebars');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');

const serverConfig = require('./config');

const app = express();
const server = http.createServer(app);

app.use(bodyparser.json());

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../templates'));

require('../routes/api')(app);
require('../routes/static')(app);
require('../routes/middleware')(app);
require('../routes/react-server-render')(app);

mongoose.connect(process.env.MONGOLAB_URI || serverConfig.db.path);

const port = process.env.PORT || serverConfig.port;

server.listen(port, () => {
  /*eslint-disable no-console*/
  console.log('Server is listenin hard on port', port);
  /*eslint-enable no-console*/
});
