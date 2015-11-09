import alt from '../alt';
import Iso from 'iso';
import Router from './routes';

const rootEl = document.querySelector('.js-content');

Iso.bootstrap((state) => {
  alt.bootstrap(state);
  Router.run(rootEl);
});
