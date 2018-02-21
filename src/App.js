import React from 'react';
import logo from './logo.svg';
import './App.css';
import SensorOutput from './components/SensorOutput';
import Square from './components/Field';
import SessionList from './components/SessionList'

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <SensorOutput />
    <Square/>
    <SessionList/>
  </div>
);
export default App;