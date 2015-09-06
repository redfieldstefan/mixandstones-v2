'use strict';

var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
