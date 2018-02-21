import React from 'react';
import PropTypes from 'prop-types';

class Session extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    /*
        En session behöver
        IP
        Antal spelare
        Host name?
        Ping?
         */
  }

  handleClick() {
    //TODO this click should put you in the correct session
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
