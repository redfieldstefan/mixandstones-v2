'use strict';

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

// Returns a copy of the object with an `id` field instead of `_id`
const _formatId = (obj) => utils.transformKeys(obj, { _id: 'id' });

module.exports = {

  createCocktail (cocktailBody) {
    const cocktail = new Cocktail(_prepForDb(cocktailBody));
    return cocktail
      .save()
      .then((dbRes) => _formatId(dbRes.toObject()));
  },

  getCocktail (cocktailId) {
    return Cocktail
      .findOne({ _id: cocktailId })
      .then((dbRes) => _formatId(dbRes.toObject()));
  },

  getAllCocktails () {
    return Cocktail
      .find({})
      .lean()
      .then((dbRes) => dbRes.map(_formatId));
  },

  updateCocktail (id, cocktailBody) {
    const updatedCocktail = _prepForDb(cocktailBody);
    return Cocktail
      .findOneAndUpdate({ _id: id }, updatedCocktail, { new: true })
      .then((dbRes) => _formatId(dbRes.toObject()));
  },

  deleteCocktail (id) {
    return Cocktail.remove({ _id: id });
  }

};
