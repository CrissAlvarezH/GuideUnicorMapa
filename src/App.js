import React from 'react';
import './App.css';
import HomePage from './paginas/home/HomePage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import BloquePage from './paginas/bloque/BloquePage';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { datos as datosReducer } from './store/reducers/datos';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
  datosReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path='/bloque' component={BloquePage} />
          <Route  path='/' component={HomePage} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
