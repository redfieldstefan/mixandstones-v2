'use strict';

const Iso = require('iso');
const React = require('react');
const Router = require('react-router');

const alt = require('../alt');
const clientRoutes = require('../client/routes.jsx').routes;

const WEBPACK_DEV = process.env.WEBPACK_DEV === 'true';

module.exports = (app) => {

  /**
   * Handler that intercepts all routes defined in `clientRoutes` and server-renders
   * the corresponding component with the db's `msData` as props
   */

  app.use((req, res) => {

    const iso = new Iso();

    Router.run(clientRoutes, req.url, (Handler) => {

      const bundle = WEBPACK_DEV ?
        'http://127.0.0.1:2992/bundle.js' :
        '/dist/bundle.js';
      const content = React.renderToString(React.createElement(Handler));
      iso.add(content, alt.flush());

      res.render('main', {
        bundle,
        content: iso.render()
      });
    });
  });

};
