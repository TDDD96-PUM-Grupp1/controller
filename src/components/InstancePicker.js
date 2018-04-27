import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Divider, Paper } from 'react-md';
import InstanceItem from './InstanceItem';
import FilterInstances from './FilterInstances';
import './stylesheets/Component.css';

/**
 * The list the instances live within, responsible for updating the list
 * eg finding new instances and removing old
 */
class InstancePicker extends Component {
  constructor(props) {
    super(props);
    this.instances = [];
    this.filter = '';
    this.state = { instances: {} };
    this.onInstancesReceived = this.onInstancesReceived.bind(this);
    this.onPlayerAdded = this.onPlayerAdded.bind(this);
    this.onPlayerRemoved = this.onPlayerRemoved.bind(this);
    this.onInstanceCreated = this.onInstanceCreated.bind(this);
    this.onInstanceRemoved = this.onInstanceRemoved.bind(this);
    this.filterList = this.filterList.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
    this.pingAllInstances = this.pingAllInstances.bind(this);
  }
  /*
   * Initialize the list when this component gets mounted
   */
  componentDidMount() {
    this.initList();
  }

  componentWillUnmount() {
    clearInterval(this.pingLoop);
  }

  /*
   * Callback for when the RPC call returns the instances.
   */
  onInstancesReceived(err, result) {
    if (!err) {
      this.instances = result;
      this.setState({ instances: result });
      this.pingLoop = setInterval(this.pingAllInstances, 1000);
    } else {
      // TODO: handle error
    }
  }

  /*
   * Increases the counter of the number of players active when a new
   * player connects.
   */
  onPlayerAdded(playerName, instanceName) {
    if (this.instances[instanceName] === undefined) {
      return;
    }
    this.instances[instanceName].currentlyPlaying += 1;
  }

  /*
   * Decreases the counter of the number of players active when a
   * player disconnects.
   */
  onPlayerRemoved(playerName, instanceName) {
    if (this.instances[instanceName] === undefined) {
      return;
    }
    this.instances[instanceName].currentlyPlaying -= 1;
  }

  /*
   * Adds the instance to the list when it is started.
   */
  onInstanceCreated(instanceName, maxPlayers, gamemode) {
    const instance = {
      name: instanceName,
      currentlyPlaying: 0,
      maxPlayers,
      gamemode,
    };

    if (!this.isFiltered(instanceName)) {
      const { instances } = this.state;
      instances[instanceName] = instance;
      this.setState({ instances });
    }

    this.instances[instanceName] = instance;
  }

  /*
   * Remove the instance from the list when it is started.
   */
  onInstanceRemoved(instanceName) {
    if (!this.isFiltered(instanceName)) {
      const { instances } = this.state;
      delete instances[instanceName];
      this.setState({ instances });
    }
    delete this.instances[instanceName];
  }

  pingAllInstances() {
    const { instances } = this.state;
    const keys = Object.keys(instances);
    for (let i = 0; i < keys.length; i += 1) {
      const current = Date.now();
      this.props.communication.pingInstance(keys[i], () => {
        const ping = Date.now() - current;
        instances[keys[i]].pingTime = ping;
        this.setState({ instances });
        this.forceUpdate();
      });
    }
  }

  /**
   * Update the list of active instances
   */
  initList() {
    this.props.communication.requestInstances(this);
  }

  isFiltered(instanceName) {
    return !instanceName.toLowerCase().includes(this.filter);
  }

  /*
   * This will filter the list with the given string.
   */
  filterList(filter) {
    this.filter = filter.toLowerCase();
    const stateInstances = {};
    const keys = Object.keys(this.instances);
    for (let i = 0; i < keys.length; i += 1) {
      if (!this.isFiltered(keys[i])) {
        stateInstances[keys[i]] = this.instances[keys[i]];
      }
    }

    this.setState({ instances: stateInstances });
  }

  render() {
    return (
      <div>
        <FilterInstances onInputChange={this.filterList} />
        <Paper>
          <Grid className="md-grid instanceHeader">
            <Cell className="md-cell--2">Instance Name</Cell>
            <Cell className="md-cell--1">Gamemode</Cell>
            <Cell className="md-cell--1">Players</Cell>
            <Cell className="md-cell--1">Latency</Cell>
          </Grid>
        </Paper>
        <Paper>
          {Object.keys(this.state.instances).map(instanceKey => (
            <div key={instanceKey}>
              <InstanceItem
                instanceObj={this.state.instances[instanceKey]}
                instanceName={instanceKey}
                enterCharacterSelection={this.props.enterCharacterSelection}
                communication={this.props.communication}
              />
              <Divider />
            </div>
          ))}
        </Paper>
      </div>
    );
  }
}
/* eslint-disable react/forbid-prop-types, react/require-default-props */
InstancePicker.propTypes = {
  enterCharacterSelection: PropTypes.func.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired,
  /* eslint-enable */
};
/* eslint-enable react/forbid-prop-types, react/require-default-props */

export default InstancePicker;
