'use strict';

var Iso = require('iso');
var React = require('react');

var alt = require('../alt');
var CocktailComponent = require('../client/components/cocktail.jsx');
var COCKTAIL_PATH = require('../server/config').api.cocktailPath;
var dbOperations = require('../server/db-operations');

module.exports = function (app) {

  app.get(COCKTAIL_PATH + '/:id', function (req, res) {
    var iso = new Iso();

    dbOperations.getCocktail(req.params.id)
      .then(function (dbRes) {
        alt.bootstrap(JSON.stringify(dbRes || {}));

        var content = React.renderToString(
          React.createElement(
            CocktailComponent,
            dbRes
          )
        );
        iso.add(content, alt.flush());
        res.render('main', {
          html: iso.render()
        });
      });

  });

};
