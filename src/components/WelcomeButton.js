import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WelcomeButton extends Component {
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
          Start!
        </button>
      </div>
    );
  }
}

WelcomeButton.propTypes = {
  enterMainWindow: PropTypes.func.isRequired
};

export default WelcomeButton;
