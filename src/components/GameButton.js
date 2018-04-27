import React, { Component } from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';

/**
 * A generic gamebutton displayed while playing a game, will be reused for different game modes.
 */
class GameButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handles a submit request by printing current username and then calls the
   * onInputSubmit function passed as a component prop.
   */
  handleClick() {
    this.props.gameButtonPressed(this.props.buttonName);
  }

  render() {
    return (
      <div>
        <Button raised className="GameButton" onClick={this.handleClick}>
          {'Button '.concat(this.props.buttonName)}
        </Button>
      </div>
    );
  }
}

GameButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  gameButtonPressed: PropTypes.func.isRequired,
};

export default GameButton;
