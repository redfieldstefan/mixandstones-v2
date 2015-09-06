'use strict';

var mongoose = require('mongoose');

var cocktailSchema = mongoose.Schema({
  name: String,
  url: String,
  description: String,
  ingredients: Array
});

module.exports = mongoose.model('Cocktail', cocktailSchema);
