'use strict';

const apiConfig = require('../server/config').api;
const COCKTAIL_PATH = `${apiConfig.base}${apiConfig.cocktailPath}`;
const dbOperations = require('../server/db-operations');

module.exports = (app) => {

  app.post(COCKTAIL_PATH, (req, res) => {
    dbOperations.createCocktail(req.body)
      .then((dbRes) => res.status(200).json(dbRes));
  });

  app.get(COCKTAIL_PATH, (req, res) => {
    dbOperations.getAllCocktails()
      .then((dbRes) => res.status(200).json(dbRes));
  });

  app.get(`${COCKTAIL_PATH}/:id`, (req, res) => {
    dbOperations.getCocktail(req.params.id)
      .then((dbRes) => res.status(200).json(dbRes));
  });

  app.put(`${COCKTAIL_PATH}/:id`, (req, res) => {
    dbOperations.updateCocktail(req.params.id, req.body)
      .then((dbRes) => res.status(200).json(dbRes));
  });

  app.delete(`${COCKTAIL_PATH}/:id`, (req, res) => {
    dbOperations.deleteCocktail(req.params.id)
      .then(() => res.status(200).json({ msg: 'Cocktail Deleted' }));
  });

};
