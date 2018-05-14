import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import PropTypes from 'prop-types';

import SensorManager from '../SensorManager';
import KeyboardManager from '../KeyboardManager';
import GameHeader from './GameHeader';
import GameButtonHandler from './GameButtonHandler';
import IconPreview from './IconPreview';
import CharacterNamePreview from './CharacterNamePreview';

/*
Try to make screen fullscreen and lock orientation.
The extent to which these actions can be performed is browser dependent.
*/
function lockScreen() {
  if (
    !(
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.fullscreenEnabled
    )
  ) {
    return;
  }

  if (typeof document.documentElement.webkitRequestFullscreen !== 'undefined') {
    // Chrome
    document.documentElement.webkitRequestFullscreen();
  } else if (typeof document.documentElement.mozRequestFullScreen !== 'undefined') {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  }

  if (Document.fullscreenElement !== null) {
    // Is in fullscreen mode
    // Screen orientation lock currently only works properly in chrome
    // https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation
    window.screen.orientation.lock('landscape-primary').catch(() => {});
  }
}

/*
Unlock screen rotation and exit fullscreen if applicable
*/
function unlockScreen() {
  if (typeof document.webkitCancelFullScreen !== 'undefined') {
    // Chrome
    document.webkitCancelFullScreen();
  } else if (typeof document.mozCancelFullScreen !== 'undefined') {
    // Firefox
    document.mozCancelFullScreen();
  }
}

/**
 * This class handles all the element being displayed while a game is in progress
 */
class Game extends Component {
  constructor(props) {
    super(props);

    const activeButtons = [];
    this.props.buttons.forEach(() => {
      activeButtons.push(true);
    });

    this.state = {
      ping: '-',
      activeButtons,
    };

    this.sensorManager = new SensorManager(props.onSensorChange);
    this.sensorManager.calibrate = this.sensorManager.calibrate.bind(this);
    this.tryButtonPress = this.tryButtonPress.bind(this);
    this.onCoolDownReset = this.onCoolDownReset.bind(this);

    this.keyboardManager = new KeyboardManager(props.onSensorChange, this.tryButtonPress);

    this.props.com.requestGameEvents(this);

    this.wakeLock = new NoSleep();
  }

  componentWillMount() {
    lockScreen();
    this.wakeLock.enable();
  }

  componentDidMount() {
    this.sensorManager.bindEventListener();
    this.keyboardManager.bindEventListener();

    this.intervalId = setInterval(() => {
      this.setState({ ping: this.props.com.currentPing });
    }, 1000);
  }

  componentWillUnmount() {
    unlockScreen();
    this.wakeLock.disable();
    this.sensorManager.unbindEventListener();
    this.keyboardManager.unbindEventListener();

    this.props.com.stopRequestGameEvents();

    clearInterval(this.intervalId);
  }

  onCoolDownReset(btnIndex) {
    const newActive = this.state.activeButtons;
    newActive[btnIndex] = true;
    this.setState({
      activeButtons: newActive,
    });
  }

  onDeath() {
    this.setAllButtons(false);
  }

  onRespawn() {
    this.setAllButtons(true);
  }

  setAllButtons(state) {
    const newActive = [];
    this.props.buttons.forEach(() => {
      newActive.push(state);
    });

    this.setState({ activeButtons: newActive });
  }

  tryButtonPress(index) {
    if (!this.state.activeButtons[index]) {
      return;
    }

    const newState = this.state.activeButtons;
    newState[index] = false;
    this.setState({
      activeButtons: newState,
    });

    this.props.gameButtonPressed(index);
  }

  render() {
    return (
      <div>
        <GameHeader
          goBack={this.props.goBack}
          ping={this.state.ping.toString()}
          calibrate={this.sensorManager.calibrate}
        />
        <GameButtonHandler
          buttons={this.props.buttons}
          activeButtons={this.state.activeButtons}
          gameButtonPressed={this.tryButtonPress}
        />
        <div className="gameIcon">
          <IconPreview
            iconID={this.props.iconID}
            iconColor={this.props.iconColor}
            backgroundColor={this.props.backgroundColor}
          />
        </div>
        <CharacterNamePreview username={this.props.username} />
      </div>
    );
  }
}
// classes: PropTypes.object.isRequired
/* eslint-disable react/forbid-prop-types */
Game.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  onSensorChange: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  // eslint-disable-next-line
  com: PropTypes.object.isRequired,
  iconID: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default Game;
