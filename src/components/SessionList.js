import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import { withStyles } from 'material-ui/styles';
import Session from './Session';

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
    this.state = { instances: [] };
    this.onInstancesReceived = this.onInstancesReceived.bind(this);
    this.onPlayerAdded = this.onPlayerAdded.bind(this);
    this.onInstanceCreated = this.onInstanceCreated.bind(this);
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
    for (let i = 0; i < this.state.instances.length; i += 1) {
      if (this.state.instances[i].name === instanceName) {
        const { instances } = this.state;
        instances[i].currentlyPlaying += 1;
        this.setState({ instances });
      }
    }
  }
  /*
   * Adds the instance to the list when it is started.
   */
  onInstanceCreated(instanceName) {
    const { instances } = this.state;
    instances.push({ name: instanceName, currentlyPlaying: 0 });
    this.setState({ instances });
  }

  /**
   * Update the list of active instances
   */
  initList() {
    this.props.requestInstances(
      this.onInstancesReceived,
      this.onPlayerAdded,
      this.onInstanceCreated
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <List
        subheader={
          <ListSubheader disableGutters className={classes.root}>
            <ListItem>
              <ListItemText primary="Sessions" />
              <ListItemText primary="Players" />
              <ListItemText primary="Room Name" />
              <ListItemText primary="Buttons" />
            </ListItem>
          </ListSubheader>
        }
      >
        {this.state.instances.map(session => (
          <div key={session.name}>
            <Session
              sessionObj={session}
              enterSessionWindow={this.props.enterSessionWindow}
              stopRequestInstances={this.props.stopRequestInstances}
            />
          </div>
        ))}
      </List>
    );
  }
}
/* eslint-disable react/forbid-prop-types, react/require-default-props */
SessionList.propTypes = {
  enterSessionWindow: PropTypes.func.isRequired,
  requestInstances: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  stopRequestInstances: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types, react/require-default-props */

export default withStyles(styles)(SessionList);
