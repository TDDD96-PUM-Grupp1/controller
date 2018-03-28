import React from 'react';
import PropTypes from 'prop-types';

/**
 * A session of an active game, saves:
 * 1 : Amount of players
 * 2 : Code needed to enter the game
 * 3 : IP, not sure if it should be displayed
 *
 * TODO dont display IP and display the ping instead
 */
class Session extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    if (this.props.sessionObj.currentlyPlaying === undefined) {
      this.props.sessionObj.currentlyPlaying = 0;
    }
    this.props.sessionObj.buttonAmount = 3;
    console.log(this.props.sessionObj);
  }

  /**
   * Clicking a session takes you to the detailed screen of said session and also changes the
   * state of the variable keeping track of the amount of buttons each session has.
   */
  handleClick() {
    const buttonAmount = parseInt(Number(this.props.sessionObj.buttonAmount), 10);
    this.props.enterSessionWindow(this.props.sessionObj.name, buttonAmount);
    this.props.stopRequestInstances();
  }

  render() {
    return (
      <div className="Session" role="button" tabIndex={0} onClick={this.handleClick}>
        <div>ACTIVE SESSION</div>
        <div>{this.props.sessionObj.currentlyPlaying} active players</div>
        <div>{this.props.sessionObj.name}</div>
        <div>{'Buttons used: '.concat(this.props.sessionObj.buttonAmount)}</div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  enterSessionWindow: PropTypes.func.isRequired,
  stopRequestInstances: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default Session;
