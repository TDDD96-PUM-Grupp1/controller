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

  //TODO this click should ask you for your username and put you in the correct session
  handleClick() {
    console.log('Clicked!');
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
  IP: PropTypes.string.isRequired
};

Session.propTypes = {
  code: PropTypes.string.isRequired
};

Session.propTypes = {
  currentlyPlaying: PropTypes.string.isRequired
};

export default Session;
