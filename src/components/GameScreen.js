/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameScreenButtons from './GameScreenButton';
import SensorManager from './SensorManager';

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
    return (
      <div className="GameScreen">
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

/* eslint-disable react/forbid-prop-types */
GameScreen.propTypes = {
  numberOfButtons: PropTypes.number.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  onSensorChange: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default GameScreen;
