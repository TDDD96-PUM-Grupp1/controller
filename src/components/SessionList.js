import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { withStyles } from 'material-ui/styles';
import Session from './Session';
import FilterSession from './FilterSession';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.common.white
  }
});

/**
 * The list the sessions live within, responsible for updating the list
 * eg finding new sessions and removing old
 */
class SessionList extends React.Component {
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
    this.pingAllSessions = this.pingAllSessions.bind(this);
    // this.state = { instances: this.props.testSessions};
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
      this.pingLoop = setInterval(this.pingAllSessions, 1000);
    } else {
      // TODO: handle error
    }
  }

  /*
   * Increases the counter of the number of players active when a new
   * player connects.
   */
  onPlayerAdded(playerName, instanceName) {
    const { instances } = this.state;
    instances[instanceName].currentlyPlaying += 1;
    this.setState({ instances });
  }

  /*
   * Decreases the counter of the number of players active when a
   * player disconnects.
   */
  onPlayerRemoved(playerName, instanceName) {
    const { instances } = this.state;
    instances[instanceName].currentlyPlaying -= 1;
    this.setState({ instances });
  }

  /*
   * Adds the instance to the list when it is started.
   */
  onInstanceCreated(instanceName, maxPlayers, gamemode) {
    const instance = {
      name: instanceName,
      currentlyPlaying: 0,
      maxPlayers,
      gamemode
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

  pingAllSessions() {
    const { instances } = this.state;
    const keys = Object.keys(instances);
    for (let i = 0; i < keys.length; i += 1) {
      const current = Date.now();
      this.props.communication.pingInstance(keys[i], () => {
        const ping = Date.now() - current;
        instances[keys[i]].pingTime = ping;
        this.setState({ instances });
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
    const { classes } = this.props;
    return (
      <div>
        <FilterSession onInputChange={this.filterList} />
        <List
          subheader={
            <ListSubheader color="primary" className={classes.root}>
              Sessions
            </ListSubheader>
          }
        >
          {Object.keys(this.state.instances).map(sessionKey => (
            <div key={sessionKey}>
              <Session
                sessionObj={this.state.instances[sessionKey]}
                sessionName={sessionKey}
                enterSessionWindow={this.props.enterSessionWindow}
                communication={this.props.communication}
              />
            </div>
          ))}
        </List>
      </div>
    );
  }
}
/* eslint-disable react/forbid-prop-types, react/require-default-props */
SessionList.propTypes = {
  enterSessionWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired,
  /* eslint-enable */
};
/* eslint-enable react/forbid-prop-types, react/require-default-props */

export default withStyles(styles)(SessionList);
