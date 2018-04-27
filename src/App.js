import React from 'react';
import PropTypes from 'prop-types';
import InstancePicker from './components/InstancePicker';
import SplashScreen from './components/SplashScreen';
import CharacterSelection from './components/CharacterSelection';
import Communication from './networking/Communication';
import settings from './config';
import Game from './components/Game';

class App extends React.Component {
  constructor(props) {
    super(props);
    // username is not currently used but is expected to be added later in development,
    // it allows for the user to only give their username once
    // and then reuse it through multiple game instances
    this.state = {
      windowState: 'splashScreen',
      numberOfGameButtons: 0,
      username: '',
      instanceName: '',
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
    this.enterCharacterSelection = this.enterCharacterSelection.bind(this);
    this.enterGame = this.enterGame.bind(this);
    this.enterInstancePicker = this.enterInstancePicker.bind(this);
    this.gameButtonPressed = this.gameButtonPressed.bind(this);
    this.renderInstancePicker = this.renderInstancePicker.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
  }

  /**
   * Used to switch to the window where detailed information
   * regarding a instance is displayed and to send data
   * from the instance to the main application
   */
  enterCharacterSelection(instanceName, nrButtons) {
    if (!Number.isNaN(nrButtons) && parseInt(Number(nrButtons), 10) === nrButtons) {
      this.setState({ numberOfGameButtons: nrButtons });
    }
    this.setState({ instanceName, windowState: 'characterSelection' });
  }

  /**
   * Used to switch to the main window where all Instances
   * are being displayed.
   */
  enterInstancePicker() {
    this.setState({ windowState: 'instancePicker' });
  }

  /**
   * Used to switch to the game window where all instances
   * are being displayed. Automatically tries to connect to the game instace.
   */
  enterGame(username, iconID, backgroundColor, iconColor) {
    /* eslint-disable-next-line */
    this.setState({ username, windowState: 'game' });
    // eslint-disable-next-line
    this.com.joinInstance(
      this.state.instanceName,
      username,
      iconID,
      backgroundColor,
      iconColor,
      () => {}
    );
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
    this.setState({ windowState: 'instancePicker' });
  }

  renderSplashScreen() {
    return <SplashScreen buttonPressed={this.enterInstancePicker} />;
  }

  renderInstancePicker() {
    return (
      <InstancePicker
        enterCharacterSelection={this.enterCharacterSelection}
        communication={this.com}
      />
    );
  }

  renderCharacterSelection() {
    return (
      <CharacterSelection
        instanceName={this.state.instanceName}
        enterGame={this.enterGame}
        onInputSubmit={this.com.joinInstance}
        goBack={this.enterInstancePicker}
        username={this.state.username}
      />
    );
  }

  renderGame() {
    return (
      <Game
        numberOfButtons={this.state.numberOfGameButtons}
        gameButtonPressed={this.gameButtonPressed}
        onSensorChange={this.com.updateSensorData}
        username={this.username}
        instanceName={this.state.instanceName}
        goBack={this.leaveGame}
        com={this.com}
      />
    );
  }

  render() {
    let stateRender;

    if (this.state.windowState === 'splashScreen') {
      stateRender = this.renderSplashScreen();
    } else if (this.state.windowState === 'instancePicker') {
      stateRender = this.renderInstancePicker();
    } else if (this.state.windowState === 'characterSelection') {
      stateRender = this.renderCharacterSelection();
    } else if (this.state.windowState === 'game') {
      stateRender = this.renderGame();
    } else {
      return <div>no state is selected to show!</div>;
    }

    return <div>{stateRender}</div>;
  }
}

App.defaultProps = {
  test: false,
};

App.propTypes = {
  test: PropTypes.bool,
};

export default App;
