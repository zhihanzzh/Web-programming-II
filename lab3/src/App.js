import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome please Login First!</h1>
        <button className="btn btn-primary">
          Login in with Spotify
        </button>
      </div>
    );
  }
}

export default App;
