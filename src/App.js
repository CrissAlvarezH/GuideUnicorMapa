import React from 'react';
import './App.css';
import HomePage from './paginas/home/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BloquePage from './paginas/bloque/BloquePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/bloques' component={BloquePage} />
        <Route exact path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
