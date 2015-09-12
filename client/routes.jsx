import React from 'react';
import { Route } from 'react-router';

import App from '../client/components/app.jsx';
import Cocktail from '../client/components/cocktail.jsx';

const routes = (
  <Route name='home' path='/' handler={App}>
    <Route name='cocktail' path='/cocktails/:id' handler={Cocktail} />
  </Route>
);

export default routes;
