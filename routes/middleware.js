'use strict';

var COCKTAIL_PATH = require('../server/config').api.cocktailPath;
var dbOperations = require('../server/db-operations');

module.exports = function (app) {

  app.get(COCKTAIL_PATH + '/:id', function (req, res, next) {
    dbOperations.getCocktail(req.params.id)
      .then(function (dbRes) {
        res.locals.msData = dbRes;
        next();
      });
  });

};
