import React, { Component } from 'react';
import MatchList from './MatchList.js';
import './App.css';

class App extends Component {
  componentDidMount = async () => {
    
  }
  render() {
    return (
      <div className="App">
        <MatchList/>
      </div>
    );
  }
}

export default App;
