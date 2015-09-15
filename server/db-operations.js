'use strict';

const _ = require('underscore');

const Cocktail = require('../models/cocktail-model');
const utils = require('../common/utils');

const _prepForDb = (cocktail) => {
  return {
    name:         cocktail.name,
    url:          utils.formatForUrl(cocktail.name),
    description:  cocktail.description ? cocktail.description : '',
    ingredients:  cocktail.ingredients ? cocktail.ingredients.sort() : []
  };
};

module.exports = {

  createCocktail (cocktailBody) {
    const cocktail = new Cocktail(_prepForDb(cocktailBody));
    return cocktail.save()
      .then((dbRes) => _.clone(dbRes));
  },

  getCocktail (cocktailId) {
    return Cocktail.findOne({ _id: cocktailId })
      .then((dbRes) => _.clone(dbRes));
  },

  getAllCocktails () {
    return Cocktail.find({})
      .then((dbRes) => _.clone(dbRes));
  },

  updateCocktail (id, cocktailBody) {
    const updatedCocktail = _prepForDb(cocktailBody);
    return Cocktail.findOneAndUpdate({ _id: id }, updatedCocktail, { new: true })
      .then((dbRes) => _.clone(dbRes));
  },

  deleteCocktail (id) {
    return Cocktail.remove({ _id: id });
  }

};
