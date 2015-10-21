import React from 'react';
import Router, { Route } from 'react-router';

import App from '../client/components/app.jsx';
import Cocktail from '../client/components/cocktail.jsx';
import CocktailList from '../client/components/cocktail-list.jsx';

const routes = (
  <Route name='home' path='/' handler={App}>
    <Route name='cocktail' path='/cocktails/:id' handler={Cocktail} />
    <Route name='cocktails' path='/cocktails' handler={CocktailList} />
  </Route>
);

export default {

  routes,

  run: (el) => {
    Router.run(routes, Router.HistoryLocation, (Handler) => {
      React.render(React.createElement(Handler), el);
    });
  }

};
