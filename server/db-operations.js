'use strict';

var _ = require('underscore');

var Cocktail = require('../models/cocktail-model');
var utils = require('../common/utils');

var _prepForDb = function (cocktail) {
  return {
    name:         cocktail.name,
    url:          utils.formatForUrl(cocktail.name),
    description:  cocktail.description ? cocktail.description : '',
    ingredients:  cocktail.ingredients ? cocktail.ingredients.sort() : []
  };
};

module.exports = {

  createCocktail: function (cocktailBody) {
    var cocktail = new Cocktail(_prepForDb(cocktailBody));
    return cocktail.save()
      .then(function (dbRes) {
        return _.clone(dbRes);
      });
  },

  getCocktail: function (cocktailId) {
    return Cocktail.findOne({ _id: cocktailId })
      .then(function (dbRes) {
        return _.clone(dbRes);
      });
  },

  getAllCocktails: function () {
    return Cocktail.find({})
      .then(function (dbRes) {
        return _.clone(dbRes);
      });
  },

  updateCocktail: function (id, cocktailBody) {
    var updatedCocktail = _prepForDb(cocktailBody);
    return Cocktail.findOneAndUpdate({ _id: id }, updatedCocktail, { new: true })
      .then(function (dbRes) {
        return _.clone(dbRes);
      });
  },

  deleteCocktail: function (id) {
    return Cocktail.remove({ _id: id });
  }

};
