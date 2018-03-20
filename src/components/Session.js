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
    this.props.sessionObj.currentlyPlaying = 1;
  }

  /**
   * Clicking on a session will transfer you to a new window
   */
  handleClick() {
    this.props.enterSessionWindow(this.props.sessionObj.name);
  }

  render() {
    return (
      <div className="Session" role="button" tabIndex={0} onClick={this.handleClick}>
        <div>ACTIVE SESSION</div>
        <div>{this.props.sessionObj.currentlyPlaying} active players</div>
        <div>{this.props.sessionObj.name}</div>
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
