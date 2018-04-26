import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'react-md';

/**
 * A session of an active game, saves:
 * 1 : Amount of players
 * 2 : Code needed to enter the game
 * 3 : IP, not sure if it should be displayed
 *
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
    this.state = { pingTime: '...' };
    const current = Date.now();
    this.props.communication.pingInstance(this.props.sessionObj.name, (data, err) => {
      this.setState({ pingTime: `${Date.now() - current} ms` });
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  /**
   * Clicking a session takes you to the detailed screen of said session and also changes the
   * state of the variable keeping track of the amount of buttons each session has.
   */
  handleClick() {
    const buttonAmount = parseInt(Number(this.props.sessionObj.buttonAmount), 10);
    this.props.enterSessionWindow(this.props.sessionName, buttonAmount);
    this.props.communication.stopRequestInstances();
  }

  render() {
    return (
      <Grid onClick={this.handleClick} className="md-grid">
        <Cell size={1}>{this.props.sessionName}</Cell>
        <Cell size={1}>{this.props.sessionObj.gamemode}</Cell>
        <Cell size={1}>{`${this.props.sessionObj.currentlyPlaying}/${
          this.props.sessionObj.maxPlayers
        }`}</Cell>
        <Cell size={1}>{this.state.pingTime}</Cell>
      </Grid>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  enterSessionWindow: PropTypes.func.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired,
  /* eslint-enable */
  sessionName: PropTypes.string.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default Session;
