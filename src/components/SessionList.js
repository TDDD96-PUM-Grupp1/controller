import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Session from './Session';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FilterSession from './FilterSession';
import ButtonBase from 'material-ui/ButtonBase';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  instanceCol: {
    paddingLeft: 10,
    paddingRight: 0,
    minWidth: 150 
  },
  gamemodeCol: {
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 100 
  
  },
  playersCol: {
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 50 
  
  },
  latencyCol: {
    paddingLeft: 0,
    paddingRight: 10,
    minWidth: 50 
  
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
    // this.state = { instances: this.props.testSessions};
  }
  /*
   * Initialize the list when this component gets mounted
   */
  componentDidMount() {
    this.initList();
  }

  /*
   * Callback for when the RPC call returns the instances.
   */
  onInstancesReceived(err, result) {
    if (!err) {
      this.instances = result;
      console.log(result);
      this.setState({ instances: result });
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
      <Paper className={classes.root}>
        <FilterSession onInputChange={this.filterList} />        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.instanceCol}>Instance Name</TableCell>
              <TableCell className={classes.gamemodeCol}>Gamemode</TableCell>
              <TableCell className={classes.playersCol}>Players</TableCell>
              <TableCell className={classes.latencyCol}>Latency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(this.state.instances).map(sessionKey => (
              <Session
                sessionObj={this.state.instances[sessionKey]}
                sessionName={sessionKey}
                enterSessionWindow={this.props.enterSessionWindow}
                communication={this.props.communication}
                classes={classes}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
/* eslint-disable react/forbid-prop-types, react/require-default-props */
SessionList.propTypes = {
  enterSessionWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired
  /* eslint-enable */
};
/* eslint-enable react/forbid-prop-types, react/require-default-props */

export default withStyles(styles)(SessionList);
