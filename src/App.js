import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SensorOutput from './components/SensorOutput';
import UsernameInput from './components/UsernameInput';
import Communication from './components/Communication';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionActive: false,
    };

    this.createCom = this.createCom.bind(this);
  }

  createCom(name) {
    this.setState = {
      connectionActive: true,
    };
    this.com = new Communication(name);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <UsernameInput onInputSubmit={this.createCom} />
        {this.state.connectionActive ? (
          <SensorOutput onSensorChange={this.com.updateSensorData} />
        ) : (
          <SensorOutput />
        )}
      </div>
    );
  }
}

export default App;
