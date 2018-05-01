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
      partymode: partyMode,
    };
  }

  shouldComponentUpdate() {
    return this.state.partymode;
  }

  render() {
    let renderHelper;
    const buttonAmount = this.props.buttons.length;
    if (buttonAmount === 0) {
      renderHelper = <div />;
    } else if (buttonAmount === 1) {
      renderHelper = (
        <DrawOneButton
          gameButtonPressed={this.props.gameButtonPressed}
          buttons={this.props.buttons}
        />
      );
    } else if (buttonAmount === 2) {
      renderHelper = (
        <DrawTwoButtons
          gameButtonPressed={this.props.gameButtonPressed}
          buttons={this.props.buttons}
        />
      );
    } else if (buttonAmount === 3) {
      renderHelper = (
        <DrawThreeButtons
          gameButtonPressed={this.props.gameButtonPressed}
          buttons={this.props.buttons}
        />
      );
    } else if (buttonAmount === 4) {
      renderHelper = (
        <DrawFourButtons
          gameButtonPressed={this.props.gameButtonPressed}
          buttons={this.props.buttons}
        />
      );
    } else {
      throw Error('Invalid button amount requested');
    }
    return renderHelper;
  }
}
/* eslint-disable react/forbid-prop-types */
GameButtonHandler.propTypes = {
  gameButtonPressed: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */
export default GameButtonHandler;
