import React, { Component } from 'react';
import deepstream from 'deepstream.io-client-js';
import PropTypes from 'prop-types';
import { Grid, Cell, Divider, Paper } from 'react-md';
import MDSpinner from 'react-md-spinner';
import InstanceItem from './InstanceItem';
import FilterInstances from './FilterInstances';
import './stylesheets/Component.css';

const STATE_LOADING = 0;
const STATE_ERROR = 1;
const STATE_OK = 2;
const TIME_TIMEOUT = 5000; // ms
const TIME_MINLOADING = 400; // ms

/**
 * The list the instances live within, responsible for updating the list
 * eg finding new instances and removing old
 */
class InstancePicker extends Component {
  constructor(props) {
    super(props);
    this.error = '';
    this.instances = [];
    this.filter = '';
    this.loadedMinTime = true;
    this.timeoutId = undefined;
    this.postLoadState = STATE_LOADING;
    this.state = { instances: {}, state: STATE_LOADING };
    this.onInstancesReceived = this.onInstancesReceived.bind(this);
    this.onPlayerAdded = this.onPlayerAdded.bind(this);
    this.onPlayerRemoved = this.onPlayerRemoved.bind(this);
    this.onInstanceCreated = this.onInstanceCreated.bind(this);
    this.onInstanceRemoved = this.onInstanceRemoved.bind(this);
    this.filterList = this.filterList.bind(this);
    this.isFiltered = this.isFiltered.bind(this);
    this.pingAllInstances = this.pingAllInstances.bind(this);
    this.initList = this.initList.bind(this);
    this.onRetry = this.onRetry.bind(this);
    this.connectionTimedOut = this.connectionTimedOut.bind(this);
  }

  componentWillMount() {
    this.setState({ state: STATE_LOADING });
    this.initList();
  }

  componentWillUnmount() {
    clearInterval(this.pingLoop);
  }

  onRetry() {
    this.setState({ state: STATE_LOADING });
    this.props.communication.getInstances(this);
    this.loadedMinTime = false;
    this.postLoadState = STATE_LOADING;
    // Timeout for minimum amount of loading time.
    setTimeout(() => {
      this.loadedMinTime = true;
      if (this.postLoadState !== STATE_LOADING) {
        this.setState({ state: this.postLoadState });
      }
    }, TIME_MINLOADING);
    // Timeout for maximum amount of loading time.
    this.timeoutId = setTimeout(this.connectionTimedOut, TIME_TIMEOUT);
  }

  /*
   * Callback for when the RPC call returns the instances.
   */
  onInstancesReceived(err, result) {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }

    if (!err) {
      this.instances = result;
      this.setState({ instances: result });
      this.pingLoop = setInterval(this.pingAllInstances, 1000);
      this.postLoadState = STATE_OK;
      if (this.loadedMinTime) {
        this.setState({ state: STATE_OK });
      }
    } else {
      if (err === deepstream.CONSTANTS.EVENT.NO_RPC_PROVIDER) {
        this.error = 'Service is not responding';
      } else {
        this.error = err;
      }
      this.postLoadState = STATE_ERROR;
      if (this.loadedMinTime) {
        this.setState({ state: STATE_ERROR });
      }
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
  onInstanceCreated(instanceName, maxPlayers, gamemode, buttons) {
    const instance = {
      name: instanceName,
      currentlyPlaying: 0,
      maxPlayers,
      gamemode,
      buttons,
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

  connectionTimedOut() {
    this.error = 'Connection timed out';
    this.setState({ state: STATE_ERROR });
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
    this.loadedMinTime = true;
    this.postLoadState = STATE_OK;
    this.timeoutId = setTimeout(this.connectionTimedOut, TIME_TIMEOUT);
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

  // Seems wrong to put this outside the class
  // eslint-disable-next-line
  renderLoading() {
    // #2196F3 -> md-blue-500
    return (
      <div className="instancesSpinner">
        <MDSpinner singleColor="#2196F3" />
      </div>
    );
  }

  renderError() {
    return (
      <div className="instancesError" onClick={this.onRetry} role="button" tabIndex={0}>
        {this.error}
        <br /> Press here to refresh &#x21bb;
      </div>
    );
  }

  renderInstances() {
    if (Object.keys(this.state.instances).length === 0) {
      return <div className="instancesError">There are no instances running</div>;
    }
    return Object.keys(this.state.instances).map(instanceKey => (
      <div key={instanceKey}>
        <InstanceItem
          instanceObj={this.state.instances[instanceKey]}
          instanceName={instanceKey}
          enterCharacterSelection={this.props.enterCharacterSelection}
          communication={this.props.communication}
        />
        <Divider />
      </div>
    ));
  }

  render() {
    return (
      <div>
        <FilterInstances onInputChange={this.filterList} />
        <Paper>
          <Grid className="md-grid instanceHeader">
            <Cell className="md-cell--6">
              <div className="cellCol--2-6">Instance Name</div>
              <div className="cellCol--2-6">Gamemode</div>
              <div className="cellCol--1-6">Players</div>
              <div className="cellCol--1-6">Latency</div>
            </Cell>
          </Grid>
        </Paper>
        <Paper>
          {(() => {
            switch (this.state.state) {
              case STATE_LOADING:
                return this.renderLoading();
              case STATE_ERROR:
                return this.renderError();
              case STATE_OK:
                return this.renderInstances();
              default:
                return <div>Invalid state: {this.state.state}</div>;
            }
          })()}
        </Paper>
      </div>
    );
  }
}
InstancePicker.propTypes = {
  enterCharacterSelection: PropTypes.func.isRequired,
  // eslint-disable-next-line
  communication: PropTypes.object.isRequired,
};

export default InstancePicker;
