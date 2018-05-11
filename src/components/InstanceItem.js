import React from 'react';
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

class InstanceItem extends React.Component {
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
    this.props.enterCharacterSelection(this.props.instanceName, this.props.instanceObj.buttons);
    this.props.communication.stopRequestInstances();
  }

  render() {
    return (
      <Grid onClick={this.handleClick} className="md-grid instanceContainer">
        <Cell className="md-cell--2">{this.props.instanceName}</Cell>
        <Cell className="md-cell--2">{this.props.instanceObj.gamemode}</Cell>
        <Cell className="md-cell--1">{`${this.props.instanceObj.currentlyPlaying}/${
          this.props.instanceObj.maxPlayers
        }`}</Cell>
        <Cell className="md-cell--1">{`${this.props.instanceObj.pingTime} ms`}</Cell>
      </Grid>
    );
  }
}

InstanceItem.propTypes = {
  // eslint-disable-next-line
  instanceObj: PropTypes.object.isRequired,
  instanceName: PropTypes.string.isRequired,
  enterCharacterSelection: PropTypes.func.isRequired,
  // eslint-disable-next-line
  communication: PropTypes.object.isRequired,
};

export default InstanceItem;
