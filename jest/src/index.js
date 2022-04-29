import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import { el, setChildren } from 'redom';
import './styles/style.scss';
import { createInput } from './input';

const app = el('div.app container pt-3');

const createCard = import('./card').then((res) => {
  const element = res.default(createInput);
  return element;
});

Promise.all([createCard]).then(([element]) => {
  setChildren(app, element);
  setChildren(window.document.body, app);
});
