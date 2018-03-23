import React from 'react';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import WelcomeScreen from './components/WelcomeScreen';
import FilterSession from './components/FilterSession';
import UsernameInput from './components/UsernameInput';
import Communication from './components/Communication';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowState: 'default', connectionActive: false };
    this.enterSessionWindow = this.enterSessionWindow.bind(this);
    this.enterMainWindow = this.enterMainWindow.bind(this);
    this.com = new Communication({ host_ip: '10.90.128.85:60020' });
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
  enterMainWindow() {
    this.setState({ windowState: 'sessionList' });
    console.log('Toggling Window to main');
  }

  renderDefault() {
    return (
      <div>
        <WelcomeScreen />
        <div>
          <button className="WelcomeButton" onClick={this.enterMainWindow}>
            Start!
          </button>
        </div>
      </div>
    );
  }

  renderSessionList() {
    return (
      <div>
        <FilterSession />
        <SessionList
          requestInstances={this.com.requestInstances}
          enterSessionWindow={this.enterSessionWindow}
          stopRequestInstances={this.com.stopRequestInstances}
        />
        <SensorOutput />
      </div>
    );
  }

  renderSession() {
    return (
      <div>
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

  render() {
    let stateRender;

    if (this.state.windowState === 'default') {
      stateRender = this.renderDefault();
    } else if (this.state.windowState === 'sessionList') {
      stateRender = this.renderSessionList();
    } else if (this.state.windowState === 'session') {
      stateRender = this.renderSession();
    } else {
      return <div className="App">no state is selected to show!</div>;
    }

    return <div className="App">{stateRender}</div>;
  }
}

export default App;
