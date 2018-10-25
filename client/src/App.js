import React, { Component } from 'react';
import MatchList from './MatchList.js';
import './css/reset.css';
import './css/app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MatchList/>
      </div>
    );
  }
}

export default App;
