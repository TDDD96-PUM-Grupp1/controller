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
    this.state = { instances: [] };
    this.onInstancesReceived = this.onInstancesReceived.bind(this);
    this.onPlayerAdded = this.onPlayerAdded.bind(this);
    this.onInstanceCreated = this.onInstanceCreated.bind(this);
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
      this.setState({ instances: result });
    } else {
      // TODO: handle error
    }
  }
  pingInstance(instanceName)
  {
    const current = Date.now();
    this.props.communication.pingInstance(instanceName, (data, err) => {
      let time = Date.now - current;
      const {instances} = this.state;
    });
  }
  /*
   * Increases the counter of the number of players active when a new
   * player connects.
   */
  onPlayerAdded(playerName, instanceName) {
    for (let i = 0; i < this.state.instances.length; i += 1) {
      if (this.state.instances[i].name === instanceName) {
        const { instances } = this.state;
        instances[i].currentlyPlaying += 1;
        this.setState({ instances });
      }
    }
  }

  /*
   * Decreases the counter of the number of players active when a
   * player disconnects.
   */
  onPlayerRemoved(playerName, instanceName) {
    for (let i = 0; i < this.state.instances.length; i += 1) {
      if (this.state.instances[i].name === instanceName) {
        const { instances } = this.state;
        instances[i].currentlyPlaying -= 1;
        this.setState({ instances });
      }
    }
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
      instances.push(instance);
      this.setState({ instances });
    }
    this.instances.push(instance);
  }

  /*
   * Remove the instance from the list when it is started.
   */
  onInstanceRemoved(instanceName) {
    if (!this.isFiltered(instanceName)) {
      for (let i = 0; i < this.state.instances.length; i += 1) {
        if (this.state.instances[i].name === instanceName) {
          const { instances } = this.state;
          instances.splice(i, 1);
          this.setState({ instances });
          break;
        }
      }
    }

    for (let i = 0; i < this.instances.length; i += 1) {
      if (this.instances[i].name === instanceName) {
        this.instances.splice(i, 1);
        break;
      }
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
    const stateInstances = [];
    for (let i = 0; i < this.instances.length; i += 1) {
      if (!this.isFiltered(this.instances[i].name)) {
        stateInstances.push(this.instances[i]);
      }
    }

    this.setState({ instances: stateInstances });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Instance Name</TableCell>
              <TableCell>Gamemode</TableCell>
              <TableCell>Players</TableCell>
              <TableCell>Latency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(this.state.instances).map(sessionKey=> (
              <TableRow key={sessionKey}>
                <TableCell>{sessionKey}</TableCell>
                <TableCell>{this.state.instances[sessionKey].gamemode}</TableCell>
                <TableCell>{this.state.instances[sessionKey].currentlyPlaying}</TableCell>
                <TableCell>{this.state.instances[sessionKey].gamemode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
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
