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
  }

  /**
   * Clicking a session takes you to the detailed screen of said session and also changes the
   * state of the variable keeping track of the amount of buttons each session has.
   */
  handleClick() {
    // Calls the function to switch window with the argument "amount of buttons this session has"
    this.props.enterSessionWindow(parseInt(Number(this.props.sessionObj.buttonAmount), 10));
  }

  render() {
    return (
      <div className="Session" role="button" tabIndex={0} onClick={this.handleClick}>
        <div>ACTIVE SESSION</div>
        <div>{this.props.sessionObj.currentlyPlaying} active players</div>
        <div>{this.props.sessionObj.code}</div>
        <div>{this.props.sessionObj.IP}</div>
        <div>{'Buttons used: '.concat(this.props.sessionObj.buttonAmount)}</div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  enterSessionWindow: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default Session;
