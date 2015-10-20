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

// Returns a copy of the object with an `id` field instead of `_id`
const _formatId = (obj) => utils.transformKeys(obj, { _id: 'id' });

module.exports = {

  createCocktail (cocktailBody) {
    const cocktail = new Cocktail(_prepForDb(cocktailBody));
    return cocktail
      .save()
      .lean()
      // ^ Requests normal JS object, not magic Mongoose object:
      // see: http://mongoosejs.com/docs/api.html#query_Query-lean
      .then((dbRes) => _formatId(dbRes));
  },

  getCocktail (cocktailId) {
    return Cocktail
      .findOne({ _id: cocktailId })
      .lean()
      .then((dbRes) => _formatId(dbRes));
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
      .lean()
      .then((dbRes) => _formatId(dbRes));
  },

  deleteCocktail (id) {
    return Cocktail.remove({ _id: id });
  }

};
