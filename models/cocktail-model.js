'use strict';

const mongoose = require('mongoose');

const cocktailSchema = mongoose.Schema({
  name: String,
  url: String,
  description: String,
  ingredients: Array
});

module.exports = mongoose.model('Cocktail', cocktailSchema);
