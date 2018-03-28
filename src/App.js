import React from 'react';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import PropTypes from 'prop-types';
import './components/css/App.css';
import SensorOutput from './components/SensorOutput';
import SessionList from './components/SessionList';
import WelcomeScreen from './components/WelcomeScreen';
import FilterSession from './components/FilterSession';
import UsernameInput from './components/UsernameInput';
import Communication from './components/Communication';
import settings from './config';
import GameScreen from './components/GameScreen';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    error: red
  }
});

/**
 * This is just some random data to have something to display
 */
const testSessions = [
  {
    name: 'ABCD',
    currentlyPlaying: '5',
    buttonAmount: '5'
  },
  {
    name: 'ASDF',
    currentlyPlaying: '17',
    buttonAmount: '2'
  },
  {
    name: 'QWER',
    currentlyPlaying: '0',
    buttonAmount: '8'
  },
  {
    name: 'ZXCY',
    currentlyPlaying: '8',
    buttonAmount: '2'
  },
  {
    name: 'ZKCV',
    currentlyPlaying: '8',
    buttonAmount: '22'
  },
  {
    name: 'ZACV',
    currentlyPlaying: '8',
    buttonAmount: '11'
  },
  {
    name: 'BXCV',
    currentlyPlaying: '8',
    buttonAmount: '0'
  },
  {
    name: 'ZXPV',
    currentlyPlaying: '8',
    buttonAmount: '6'
  },
  {
    name: 'ZTCV',
    currentlyPlaying: '8',
    buttonAmount: '7'
  },
  {
    name: 'ZXRV',
    currentlyPlaying: '8',
    buttonAmount: '13'
  },
  {
    name: 'ZXCG',
    currentlyPlaying: '8',
    buttonAmount: '2'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { windowState: 'default', connectionActive: false, numberOfGameButtons: 0 };

    // Make sure to not create communication when we're running as a test.
    // This is because of a weird TravisCI error.
    if (!props.test) {
      this.com = new Communication(settings.communication);
    }

    // Bind
    this.enterSessionWindow = this.enterSessionWindow.bind(this);
    this.enterGameWindow = this.enterGameWindow.bind(this);
    this.enterMainWindow = this.enterMainWindow.bind(this);
    this.gameButtonPressed = this.gameButtonPressed.bind(this);
  }

  /**
   * Used to switch to the window where detailed information
   * regarding a session is displayed and to send data
   * from the session to the main application
   */
  enterSessionWindow(instanceName, nrButtons) {
    this.instanceName = instanceName;
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

  /**
   * This function is called whenever a button in the gamescreen is pressed
   * @param buttonNumber is an integer identifying which of the buttons was pressed
   */
  gameButtonPressed(buttonNumber) {
    console.log('Game button '.concat(buttonNumber).concat(' pressed'));
    this.enterMainWindow();
  }

  renderDefault() {
    return <WelcomeScreen buttonPressed={this.enterMainWindow} />;
  }

  renderSessionList() {
    return (
      <div>
        <FilterSession />
        <SessionList
          testSessions={testSessions}
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
        <UsernameInput
          instanceName={this.instanceName}
          showGameWindow={this.enterGameWindow}
          onInputSubmit={this.com.joinInstance}
        />
        <SensorOutput onSensorChange={this.com.updateSensorData} />
      </div>
    );
  }

  renderGame() {
    return (
      <div className="App">
        <GameScreen
          numberOfButtons={this.state.numberOfGameButtons}
          gameButtonPressed={this.gameButtonPressed}
        />
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
    } else if (this.state.windowState === 'game') {
      stateRender = this.renderGame();
    } else {
      return <div className="App">no state is selected to show!</div>;
    }

    return (
      <MuiThemeProvider theme={theme}>
        {' '}
        <div className="App">{stateRender}</div>{' '}
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = {
  test: false
};

App.propTypes = {
  test: PropTypes.bool
};

export default App;
