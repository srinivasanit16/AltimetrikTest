import React from 'react';
import './App.css';
import MainPage from './main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Filters } from './filter';

export default function App() {
  return (
    // <div className="App">
    //   <MainPage></MainPage>
    // </div>
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/filter" component={Filters} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

