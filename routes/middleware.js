'use strict';

const alt = require('../alt');
const COCKTAIL_PATH = require('../server/config').api.cocktailPath;
const dbOperations = require('../server/db-operations');

module.exports = (app) => {

  app.get(`${COCKTAIL_PATH}/:id`, (req, res, next) => {
    dbOperations.getCocktail(req.params.id)
      .then((dbRes) => {
        res.locals.msData = dbRes;
        next();
      });
  });

  app.get(COCKTAIL_PATH, (req, res, next) => {
    dbOperations.getAllCocktails()
      .then((dbRes) => {
        const bootstrapData = {
          CocktailStore: {
            cocktails: dbRes
          }
        };
        alt.bootstrap(JSON.stringify(bootstrapData));
        next();
      });
  });

};
