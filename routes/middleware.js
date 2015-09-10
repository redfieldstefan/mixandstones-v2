'use strict';

var Cocktail = require('../models/cocktail-model');

var COCKTAIL_URL = '/cocktails';

module.exports = function (app) {

  app.get(COCKTAIL_URL + '/:id', function (req, res, next) {
    Cocktail.findOne({ _id: req.params.id }, function (err, dbRes) {
      if (err) {
        /*eslint-disable no-console*/
        console.log(err);
        /*eslint-enable no-console*/

        // TODO modularize shared code
        // TODO error handling!
      }
      res.locals.cocktail = {
        name: dbRes.name
      };
      next();
    });
  });

};
