import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'core-js/es/map'; // Para problema con android Kitkat y Lollipop
import 'core-js/es/set'; // Para problema con android Kitkat y Lollipop

import "core-js/stable"; // Para problema con android Kitkat y Lollipop
import "regenerator-runtime/runtime"; // Para problema con android Kitkat y Lollipop

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
