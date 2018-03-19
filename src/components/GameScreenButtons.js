import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from "./Session";

class GameScreenButtons extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handles a submit request by printing current username and then calls the
   * onInputSubmit function passed as a component prop.
   */
  handleClick() {
    this.props.enterMainWindow();
  }

  render() {
    return (
      <div>
        <button className="WelcomeButton" onClick={this.handleClick}>
          GameScreenButton
        </button>
      </div>
    );
  }
}

Session.propTypes = {
    enterMainWindow: PropTypes.func.isRequired
};

export default GameScreenButtons;
