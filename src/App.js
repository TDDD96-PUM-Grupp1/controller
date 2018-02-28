import React from 'react';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import WelcomeScreen from './components/WelcomeScreen';
import FilterSession from './components/FilterSession';
import UsernameInput from './components/UsernameInput';
import WelcomeButton from './components/WelcomeButton';

/**
 * This is just some random data to have something to display
 */
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowState: 'default' };
    this.enterSessionWindow = this.enterSessionWindow.bind(this);
    this.enterMainWindow = this.enterMainWindow.bind(this);
  }

  /**
   * Used to switch to the window where detailed information
   * regarding a session is displayed
   */
  enterSessionWindow() {
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

  render() {
    // The greeting screen
    if (this.state.windowState === 'default') {
      return (
        <div className="App">
          <WelcomeScreen />
          <WelcomeButton className="WelcomeButton" enterMainWindow={this.enterMainWindow} />
        </div>
      );
      // The screen showing all possible sessions to join
    } else if (this.state.windowState === 'sessionList') {
      return (
        <div className="App">
          <WelcomeScreen />
          <FilterSession />
          <SessionList activeSessions={testSessions} enterSessionWindow={this.enterSessionWindow} />
          <SensorOutput />
        </div>
      );
      // The screen showing detailed information of a single session
    } else if (this.state.windowState === 'session') {
      return (
        <div className="App">
          <WelcomeScreen />
          <UsernameInput />
          <button className="Random">Random</button>
          <button className="Join">Join</button>
        </div>
      );
    } else {
      return <div className="App">no state is selected to show!</div>;
    }
  }
}

export default App;
