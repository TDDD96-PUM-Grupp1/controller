import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import GameScreenButtons from './GameScreenButton';
import SensorManager from './SensorManager';

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
    for (let i = 0; i < this.props.numberOfButtons; i += 1) {
      this.buttonList.push(i);
    }

    this.sensorManager = new SensorManager(props.onSensorChange);
  }

  componentDidMount() {
    this.sensorManager.bindEventListener();
  }

  componentWillUnmount() {
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
        <div className="GameButtonContainer">
          {this.buttonList.map(button => (
            <div key={button}>
              <GameScreenButtons
                gameButtonPressed={this.props.gameButtonPressed}
                buttonName={''.concat(button)}
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
  numberOfButtons: PropTypes.number.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  onSensorChange: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

// export default GameScreen;
export default withStyles(styles)(GameScreen);
