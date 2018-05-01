import React, { Component } from 'react';
import NoSleep from 'nosleep.js';
import PropTypes from 'prop-types';
import { Button } from 'react-md';
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

  if (document.fullscreenElement !== null) {
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
    this.state = { ping: '-', fullscreen: false };
    this.sensorManager = new SensorManager(props.onSensorChange);
    this.sensorManager.calibrate = this.sensorManager.calibrate.bind(this);

    this.keyboardManager = new KeyboardManager(props.onSensorChange, props.gameButtonPressed);

    this.wakeLock = new NoSleep();
    this.goFullscreen = this.goFullscreen.bind(this);
    this.onFullScreenChange = this.onFullScreenChange.bind(this);
  }

  componentWillMount() {
    this.props.com.startListeningForInstance(this);
    // Bind fullscreen listener
    if (typeof document.webkitCancelFullScreen !== 'undefined') {
      document.addEventListener('webkitfullscreenchange', this.onFullScreenChange);
    } else if (typeof document.mozCancelFullScreen !== 'undefined') {
      document.addEventListener('mozfullscreenchange', this.onFullScreenChange);
    }
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

    // Unbind fullscreen listener
    if (typeof document.webkitCancelFullScreen !== 'undefined') {
      document.removeEventListener('webkitfullscreenchange', this.onFullScreenChange);
    } else if (typeof document.mozCancelFullScreen !== 'undefined') {
      document.removeEventListener('mozfullscreenchange', this.onFullScreenChange);
    }

    clearInterval(this.intervalId);
  }

  onFullScreenChange() {
    const fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    this.setState({ fullscreen: fullscreenElement !== undefined });
  }

  onInstancesClosed() {
    this.props.goBack();
  }

  goFullscreen() {
    lockScreen();
    this.wakeLock.enable();
  }

  render() {
    return (
      <div id="landscape">
        <GameHeader
          goBack={this.props.goBack}
          ping={this.state.ping.toString()}
          calibrate={this.sensorManager.calibrate}
        />
        <GameButtonHandler
          buttons={this.props.buttons}
          gameButtonPressed={this.props.gameButtonPressed}
          username={this.props.username}
        />
        <div className="gameIcon">
          <IconPreview
            iconID={this.props.iconID}
            iconColor={this.props.iconColor}
            backgroundColor={this.props.backgroundColor}
          />
        </div>
        <CharacterNamePreview username={this.props.username} />
        {(() => {
          if (!this.state.fullscreen) {
            return (
              <Button className="fullscreenButton" raised primary onClick={this.goFullscreen}>
                Go Fullscreen!
              </Button>
            );
          }
          return <div />;
        })()}
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
