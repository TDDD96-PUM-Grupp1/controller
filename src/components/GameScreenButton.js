import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A generic gamebutton displayed while playing a game, will be reused for different game modes.
 */
class GameScreenButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handles a submit request by printing current username and then calls the
   * onInputSubmit function passed as a component prop.
   */
  handleClick() {
    this.props.gameButtonPressed(this.props.buttonPos);
  }

  render() {
    return (
      <div>
        <button className="GameButton" onClick={this.handleClick}>
          {this.props.buttonName}
        </button>
      </div>
    );
  }
}

GameScreenButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
  buttonPos: PropTypes.number.isRequired,
};

export default GameScreenButton;
