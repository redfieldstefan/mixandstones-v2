import alt from '../alt';
import Router from './routes';

const rootEl = document.querySelector('.js-content');
const bootstrapEl = document.querySelector('.js-bootstrap');

const bootstrapData = JSON.parse(bootstrapEl.getAttribute('data-bootstrap'));
alt.bootstrap(JSON.stringify(bootstrapData));
Router.run(rootEl);
