import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator'
import Timer from './Timer'
import Userpass from './Userpass'
import ColorPicker from './Colorpicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <Calculator/> */}
        <Timer/>
        {/* <Userpass/> */}
        {/* <ColorPicker/> */}
      </div>
    );
  }
}

export default App;
