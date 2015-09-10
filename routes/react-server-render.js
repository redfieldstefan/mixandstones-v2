'use strict';

var Iso = require('iso');
var React = require('react');
var Router = require('react-router');

var alt = require('../alt');
var clientRoutes = require('../client/routes.jsx');

module.exports = function (app) {

  /**
   * Handler that intercepts all routes defined in `clientRoutes` and server-renders
   * the corresponding component with the db's cocktail response as props
   */

  app.use(function (req, res) {
    var iso = new Iso();
    alt.bootstrap(JSON.stringify(res.locals.cocktail || {}));

    Router.run(clientRoutes, req.url, function (Handler) {
      var content = React.renderToString(
        React.createElement(
          Handler,
          res.locals.cocktail
        )
      );
      iso.add(content, alt.flush());

      res.render('main', {
        html: iso.render()
      });
    });
  });

};
