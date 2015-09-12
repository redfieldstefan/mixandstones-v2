'use strict';

var apiConfig = require('../server/config').api;
var COCKTAIL_PATH = apiConfig.base + apiConfig.cocktailPath;
var dbOperations = require('../server/db-operations');

module.exports = function (app) {

  app.post(COCKTAIL_PATH, function (req, res) {
    dbOperations.createCocktail(req.body)
      .then(function (dbRes) {
        return res.status(200).json(dbRes);
      });
  });

  app.get(COCKTAIL_PATH, function (req, res) {
    dbOperations.getAllCocktails()
      .then(function (dbRes) {
        return res.status(200).json(dbRes);
      });
  });

  app.get(COCKTAIL_PATH + '/:id', function (req, res) {
    dbOperations.getCocktail(req.params.id)
      .then(function (dbRes) {
        return res.status(200).json(dbRes);
      });
  });

  app.put(COCKTAIL_PATH + '/:id', function (req, res) {
    dbOperations.updateCocktail(req.params.id, req.body)
      .then(function (dbRes) {
        return res.status(200).json(dbRes);
      });
  });

  app.delete(COCKTAIL_PATH + '/:id', function (req, res) {
    dbOperations.deleteCocktail(req.params.id)
      .then(function () {
        return res.status(200).json({ msg: 'Cocktail Deleted' });
      });
  });

};
