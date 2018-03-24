/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameScreenButtons from './GameScreenButtons';
import Session from './Session';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.buttonList = [];
    for (var i = 0; i < this.props.numberOfButtons; i++) {
      this.buttonList.push(i);
    }
  }

  render() {
    return (
      <div className="GameScreen">
        <div>{this.props.numberOfButtons}</div>
        <GameScreenButtons
          className="GameScreenButtons"
          enterMainWindow={this.props.enterMainWindow}
        />

        <div className="GameButtonContainer">
          {this.buttonList.map(button => (
            <div key={button}>
              <div>{button}</div>
              <GameScreenButtons enterMainWindow={this.props.enterMainWindow} />
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
  enterMainWindow: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default GameScreen;
