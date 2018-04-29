import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DrawOneButton, DrawTwoButtons, DrawThreeButtons, DrawFourButtons } from './GameButton';

class GameButtonHandler extends Component {
  constructor(props) {
    super(props);

    const name = this.props.username.toLowerCase();
    let partyMode = false;

    if (name.includes('party')) {
      partyMode = true;
    }

    this.state = {
      numberOfButtons: this.props.numberOfButtons,
      partymode: partyMode,
    };
  }

  shouldComponentUpdate() {
    return this.state.partymode;
  }

  render() {
    let renderHelper;

    if (this.state.numberOfButtons === 0) {
      renderHelper = <div />;
    } else if (this.state.numberOfButtons === 1) {
      renderHelper = <DrawOneButton gameButtonPressed={this.props.gameButtonPressed} />;
    } else if (this.state.numberOfButtons === 2) {
      renderHelper = <DrawTwoButtons gameButtonPressed={this.props.gameButtonPressed} />;
    } else if (this.state.numberOfButtons === 3) {
      renderHelper = <DrawThreeButtons gameButtonPressed={this.props.gameButtonPressed} />;
    } else if (this.state.numberOfButtons === 4) {
      renderHelper = <DrawFourButtons gameButtonPressed={this.props.gameButtonPressed} />;
    } else {
      renderHelper = <div>Invaild amount of buttons requested </div>;
    }
    return renderHelper;
  }
}

GameButtonHandler.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
  numberOfButtons: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default GameButtonHandler;
