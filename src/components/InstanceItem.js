import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell } from 'react-md';
import './stylesheets/Component.css';

/**
 * A instance of an active game, saves:
 * 1 : Amount of players
 * 2 : Code needed to enter the game
 * 3 : IP, not sure if it should be displayed
 *
 */

class InstanceItem extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    if (this.props.instanceObj.currentlyPlaying === undefined) {
      this.props.instanceObj.currentlyPlaying = 0;
    }
    this.props.instanceObj.buttonAmount = 3;
    this.props.instanceObj.pingTime = '...';
  }

  shouldComponentUpdate() {
    return true;
  }

  /**
   * Clicking a instance takes you to the detailed screen of said instance and also changes the
   * state of the variable keeping track of the amount of buttons each instance has.
   */
  handleClick() {
    const buttonAmount = parseInt(Number(this.props.instanceObj.buttonAmount), 10);
    this.props.enterCharacterSelection(this.props.instanceName, buttonAmount);
    this.props.communication.stopRequestInstances();
  }

  render() {
    return (
      <Grid onClick={this.handleClick} className="md-grid instanceContainer">
        <Cell className="md-cell--2">{this.props.instanceName}</Cell>
        <Cell className="md-cell--1">{this.props.instanceObj.gamemode}</Cell>
        <Cell className="md-cell--1">{`${this.props.instanceObj.currentlyPlaying}/${
          this.props.instanceObj.maxPlayers
        }`}</Cell>
        <Cell className="md-cell--1">{`${this.props.instanceObj.pingTime} ms`}</Cell>
      </Grid>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
InstanceItem.propTypes = {
  instanceObj: PropTypes.object.isRequired,
  instanceName: PropTypes.string.isRequired,
  enterCharacterSelection: PropTypes.func.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired,
  /* eslint-enable */
};
/* eslint-enable react/forbid-prop-types */

export default InstanceItem;
