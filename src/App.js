import React from 'react';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import WelcomeScreen from './components/WelcomeScreen';
import FilterSession from './components/FilterSession';
import UsernameInput from './components/UsernameInput';
import WelcomeButton from './components/WelcomeButton';
import Communication from './components/Communication';
import GameScreen from './components/GameScreen';

/**
 * This is just some random data to have something to display
 */
const testSessions = [
  {
    IP: '192.168.0.1',
    code: 'ABCD',
    currentlyPlaying: '5',
    buttonAmount: '5'
  },
  {
    IP: '58.123.5.1',
    code: 'ASDF',
    currentlyPlaying: '17',
    buttonAmount: '2'
  },
  {
    IP: '192.168.1.1',
    code: 'QWER',
    currentlyPlaying: '0',
    buttonAmount: '8'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCY',
    currentlyPlaying: '8',
    buttonAmount: '2'
  },
  {
    IP: '192.168.44.2',
    code: 'ZKCV',
    currentlyPlaying: '8',
    buttonAmount: '22'
  },
  {
    IP: '192.168.44.2',
    code: 'ZACV',
    currentlyPlaying: '8',
    buttonAmount: '11'
  },
  {
    IP: '192.168.44.2',
    code: 'BXCV',
    currentlyPlaying: '8',
    buttonAmount: '0'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXPV',
    currentlyPlaying: '8',
    buttonAmount: '6'
  },
  {
    IP: '192.168.44.2',
    code: 'ZTCV',
    currentlyPlaying: '8',
    buttonAmount: '7'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXRV',
    currentlyPlaying: '8',
    buttonAmount: '13'
  },
  {
    IP: '192.168.44.2',
    code: 'ZXCG',
    currentlyPlaying: '8',
    buttonAmount: '2'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowState: 'default', connectionActive: false, numberOfGameButtons: 0 };
    this.enterSessionWindow = this.enterSessionWindow.bind(this);
    this.enterGameWindow = this.enterGameWindow.bind(this);
    this.enterMainWindow = this.enterMainWindow.bind(this);
    this.gameButtonPressed = this.gameButtonPressed.bind(this);
    this.createCom = this.createCom.bind(this);
  }

  /**
   * Used to switch to the window where detailed information
   * regarding a session is displayed AND to update the state of
   * numberOfGameButtons
   */
  enterSessionWindow(nrButtons) {
    if (!isNaN(nrButtons) && parseInt(Number(nrButtons), 10) === nrButtons) {
      this.setState({ numberOfGameButtons: nrButtons });
    }
    this.setState({ windowState: 'session' });
  }

  /**
   * Used to switch to the main window where all sessions
   * are being displayed
   */
  enterMainWindow() {
    this.setState({ windowState: 'sessionList' });
  }

  /**
   * Used to switch to the game window where all sessions
   * are being displayed
   */
  enterGameWindow() {
    this.setState({ windowState: 'game' });
  }

  gameButtonPressed(buttonNumber) {
    console.log('Game button '.concat(buttonNumber).concat(' pressed'));
    this.enterMainWindow();
  }

  createCom(state) {
    this.com = new Communication(state.username);
    this.setState({
      connectionActive: true
    });
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
          <UsernameInput onInputSubmit={this.createCom} />
          <button className="Random">Random</button>
          <button className="Join" onClick={this.enterGameWindow}>
            {' '}
            Join
          </button>
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
      // The game screen
    } else if (this.state.windowState === 'game') {
      return (
        <div className="App">
          <GameScreen
            numberOfButtons={this.state.numberOfGameButtons}
            gameButtonPressed={this.gameButtonPressed}
          />
        </div>
      );
    }
    return <div className="App">no state is selected to show!</div>;
  }
}

export default App;
