'use-strict';

import ReactDOM from 'react-dom';
import React from 'react';

import TimerList from './app/timer-list/timer-list.component';
import Home from './app/home/home.component';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          <Link to="/">Home</Link>
          <Route exact path="" component={Home}></Route>
          <Route exact path="/TimerList" component={TimerList}></Route>
        </div>
      </Router>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
