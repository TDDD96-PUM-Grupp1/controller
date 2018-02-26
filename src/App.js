import React from 'react';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import UsernameInput from './components/UsernameInput';
import WelcomeScreen from './components/WelcomeScreen';
import Communication from './components/Communication';

const testSessions = [
  {
    IP: '192.168.0.1',
    code: 'ABCD',
    currentlyPlaying: '5'
  },
  {
    IP: '58.123.5.1',
    code: 'ASDF',
    currentlyPlaying: '17'
  },
  {
    IP: '192.168.1.1',
    code: 'QWER',
    currentlyPlaying: '0'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCV',
    currentlyPlaying: '8'
  }
];


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionActive: false,
    };

    this.createCom = this.createCom.bind(this);
  }

  createCom(state) {
    this.com = new Communication(state.username);
    this.setState({
      connectionActive: true,
    });
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
          <WelcomeScreen />
          <SessionList activeSessions={testSessions} />
        {this.state.connectionActive ? (
          <div>
            <SensorOutput onSensorChange={this.com.updateSensorData} />
          </div>
        ) : (
          <div>
            <UsernameInput onInputSubmit={this.createCom} />
            <SensorOutput />
          </div>
        )}
      </div>
    );
  }
}

export default App;
