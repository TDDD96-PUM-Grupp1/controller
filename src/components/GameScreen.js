import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import GameScreenButtons from './GameScreenButton';
import SensorManager from './SensorManager';

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

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360
  }
});

/**
 * This class handles all the element being displayed while a game is in progress
 */
class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.buttonList = [];
    for (let i = 0; i < this.props.buttons.length; i += 1) {
      this.buttonList.push(i);
    }

    this.sensorManager = new SensorManager(props.onSensorChange);
    this.sensorManager.calibrate = this.sensorManager.calibrate.bind(this);
  }

  componentWillMount() {
    lockScreen();
  }

  componentDidMount() {
    this.sensorManager.bindEventListener();
  }

  componentWillUnmount() {
    unlockScreen();

    this.sensorManager.unbindEventListener();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="GameScreen">
        <Button
          className={classes.backButton}
          variant="raised"
          color="primary"
          onClick={this.props.goBack}
        >
          Leave
        </Button>
        <Button
          className={classes.backButton}
          variant="raised"
          color="primary"
          onClick={this.sensorManager.calibrate}
        >
          Recallibrate Sensors
        </Button>
        <div className="GameButtonContainer">
          {this.buttonList.map(button => (
            <div key={button}>
              <GameScreenButtons
                gameButtonPressed={this.props.gameButtonPressed}
                buttonName={this.props.buttons[button]}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
// classes: PropTypes.object.isRequired
/* eslint-disable react/forbid-prop-types */
GameScreen.propTypes = {
  buttons: PropTypes.array.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  onSensorChange: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(GameScreen);
