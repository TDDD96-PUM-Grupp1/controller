import React from 'react';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import PropTypes from 'prop-types';
import './components/css/App.css';
import SessionList from './components/SessionList';
import WelcomeScreen from './components/WelcomeScreen';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    // username is not currently used but is expected to be added later in development,
    // it allows for the user to only give their username once
    // and then reuse it through multiple game sessions
    this.state = {
      windowState: 'default',
      numberOfGameButtons: 0,
      username: '',
      instanceName: ''
    };

    // Make sure to not create communication when we're running as a test.
    // This is because of a weird TravisCI error.
    if (!props.test) {
      // Use local Deepstream server instead of remote.
      if (process.env.REACT_APP_LOCAL) {
        /* eslint-disable-next-line */
        console.log('Using local Deepstream server');
        const ip = document.location.href.split('://')[1].split(':')[0];
        const ipPort = `${ip}:60020`;
        settings.communication.host_ip = ipPort;
      }
      this.com = new Communication(settings.communication);
    }

    // Bind
    this.enterSessionWindow = this.enterSessionWindow.bind(this);
    this.enterGameWindow = this.enterGameWindow.bind(this);
    this.enterMainWindow = this.enterMainWindow.bind(this);
    this.gameButtonPressed = this.gameButtonPressed.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
  }

  /**
   * Used to switch to the window where detailed information
   * regarding a session is displayed and to send data
   * from the session to the main application
   */
  enterSessionWindow(instanceName, nrButtons) {
    if (!Number.isNaN(nrButtons) && parseInt(Number(nrButtons), 10) === nrButtons) {
      this.setState({ numberOfGameButtons: nrButtons });
    }
    this.setState({ instanceName, windowState: 'session' });
  }

  /**
   * Used to switch to the main window where all sessions
   * are being displayed.
   * @param username is an optional variable for setting the username
   */
  enterMainWindow(username) {
    if (typeof username === 'string') {
      this.setState({ username: username });
    }
    this.setState({ windowState: 'sessionList' });
  }

  /**
   * Used to switch to the game window where all sessions
   * are being displayed. Automatically tries to connect to the game session.
   */
  enterGameWindow(username, iconID) {
    /* eslint-disable-next-line */
    this.setState({ username, windowState: 'game' });
    // eslint-disable-next-line
    this.com.joinInstance(this.state.instanceName, username, iconID, (err, result) => {});
  }

  /**
   * This function is called whenever a button in the gamescreen is pressed
   * @param buttonNumber is an integer identifying which of the buttons was pressed
   */
  gameButtonPressed(buttonNumber) {
    this.com.sendButtonPress(buttonNumber);
  }

  /**
   * Leaves the gamescreen and disconnects the player
   */
  leaveGame() {
    this.com.stopTick();
    this.setState({ windowState: 'sessionList' });
  }

  renderDefault() {
    return <WelcomeScreen buttonPressed={this.enterMainWindow} />;
  }

  renderSessionList() {
    return (
      <div>
        <SessionList enterSessionWindow={this.enterSessionWindow} communication={this.com} />
      </div>
    );
  }

  renderSession() {
    return (
      <div>
        <UsernameInput
          instanceName={this.state.instanceName}
          showGameWindow={this.enterGameWindow}
          onInputSubmit={this.com.joinInstance}
          goBack={this.enterMainWindow}
          username={this.state.username}
        />
      </div>
    );
  }

  renderGame() {
    return (
      <div className="App">
        <GameScreen
          numberOfButtons={this.state.numberOfGameButtons}
          gameButtonPressed={this.gameButtonPressed}
          onSensorChange={this.com.updateSensorData}
          username={this.username}
          instanceName={this.state.instanceName}
          goBack={this.leaveGame}
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
