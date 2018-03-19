/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameScreenButtons from './GameScreenButtons';
import Session from './Session';

class GameScreen extends Component {
  render() {
    return (
      <div className="GameScreen">
        <GameScreenButtons
          className="GameScreenButtons"
          enterMainWindow={this.props.enterMainWindow}
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  numberOfButtons: PropTypes.object.isRequired,
  enterMainWindow: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default GameScreen;
