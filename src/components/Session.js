import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'react-md';
import './stylesheets/Component.css';

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
    this.props.sessionObj.pingTime = '...';
  }

  shouldComponentUpdate() {
    return true;
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
      <Grid onClick={this.handleClick} className="md-grid sessionContainer">
        <Cell className="md-cell--2">{this.props.sessionName}</Cell>
        <Cell className="md-cell--1">{this.props.sessionObj.gamemode}</Cell>
        <Cell className="md-cell--1">{`${this.props.sessionObj.currentlyPlaying}/${
          this.props.sessionObj.maxPlayers
        }`}</Cell>
        <Cell className="md-cell--1">{`${this.props.sessionObj.pingTime} ms`}</Cell>
      </Grid>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  sessionName: PropTypes.string.isRequired,
  enterSessionWindow: PropTypes.func.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired,
  /* eslint-enable */
};
/* eslint-enable react/forbid-prop-types */

export default Session;
