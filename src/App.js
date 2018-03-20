import React from 'react';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import WelcomeScreen from './components/WelcomeScreen';
import FilterSession from './components/FilterSession';
import UsernameInput from './components/UsernameInput';
import WelcomeButton from './components/WelcomeButton';
import Communication from './components/Communication';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowState: 'default', connectionActive: false };
    this.enterSessionWindow = this.enterSessionWindow.bind(this);
    this.enterMainWindow = this.enterMainWindow.bind(this);
    this.instances = {};
    this.com = new Communication({ host_ip: '0.0.0.0:60020' });
  }

  /**
   * Used to switch to the window where detailed information
   * regarding a session is displayed
   */
  enterSessionWindow(instanceName) {
    this.instanceName = instanceName;
    this.setState({ windowState: 'session' });
    console.log('Toggling Window');
  }

  /**
   * Used to switch to the main window where all sessions
   * are being displayed
   */
  enterMainWindow(instances) {
    this.instances = instances;
    this.setState({ windowState: 'sessionList' });
    console.log(instances);
    console.log('Toggling Window to main');
  }

  render() {
    // The greeting screen
    if (this.state.windowState === 'default') {
      return (
        <div className="App">
          <WelcomeScreen />
          <WelcomeButton
            className="WelcomeButton"
            requestInstances={this.com.requestInstances}
            enterMainWindow={this.enterMainWindow}
          />
        </div>
      );
      // The screen showing all possible sessions to join
    } else if (this.state.windowState === 'sessionList') {
      return (
        <div className="App">
          <WelcomeScreen />
          <FilterSession />
          <SessionList
            activeSessions={this.instances}
            enterSessionWindow={this.enterSessionWindow}
          />
          <SensorOutput />
        </div>
      );
      // The screen showing detailed information of a single session
    } else if (this.state.windowState === 'session') {
      return (
        <div className="App">
          <WelcomeScreen />
          <UsernameInput instanceName={this.instanceName} onInputSubmit={this.com.joinInstance} />
          <button className="Random">Random</button>
          <button className="Join">Join</button>
          {this.state.connectionActive ? (
            <div>
              <SensorOutput onSensorChange={this.com.updateSensorData} />
            </div>
          ) : (
            <div>
              <SensorOutput />
            </div>
          )}
        </div>
      );
    }
    return <div className="App">no state is selected to show!</div>;
  }
}

export default App;
