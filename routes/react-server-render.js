'use strict';

const Iso = require('iso');
const React = require('react');
const Router = require('react-router');

const alt = require('../alt');
const clientRoutes = require('../client/routes.jsx');

module.exports = (app) => {

  /**
   * Handler that intercepts all routes defined in `clientRoutes` and server-renders
   * the corresponding component with the db's `msData` as props
   */

  app.use((req, res) => {
    const iso = new Iso();
    const data = res.locals.msData || {};
    alt.bootstrap(JSON.stringify(data));

    Router.run(clientRoutes, req.url, (Handler) => {
      const content = React.renderToString(
        React.createElement(Handler, data)
      );
      iso.add(content, alt.flush());

      res.render('main', {
        html: iso.render()
      });
    });
  });

};
