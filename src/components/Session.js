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
   * Clicking on a session will transfer you to a new window
   */
  handleClick() {
    this.props.enterSessionWindow();
  }

  render() {
    return (
      <div className="Session" onClick={this.handleClick}>
        <div>ACTIVE SESSION</div>
        <div>{this.props.sessionObj.currentlyPlaying} active players</div>
        <div>{this.props.sessionObj.code}</div>
        <div>{this.props.sessionObj.IP}</div>
      </div>
    );
  }
}

Session.propTypes = {
  sessionObj: PropTypes.string.isRequired
};

Session.propTypes = {
  code: PropTypes.string.isRequired
};

Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  enterSessionWindow: PropTypes.func.isRequired
};

export default Session;
