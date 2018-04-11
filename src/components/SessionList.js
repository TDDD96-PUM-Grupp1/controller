import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
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
  onInstanceCreated(instanceName) {
    let instance = { name: instanceName, currentlyPlaying: 0 };
    
    if(!isFiltered(instanceName))
    {
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
    if(!isFiltered(instanceName))
    {
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
    this.props.requestInstances(this);
  }

  isFiltered(instanceName)
  {
    return !instanceName.includes(this.filter);
  }

  /*
   * This will filter the list with the given string.
   */
  filterList(filter) {
    this.filter = filter;
    let stateInstances = []; 
    for (let i = 0; i < this.instances.length; i += 1)
    {
      if(!isFiltered())
      {
        stateInstances.push(this.instances[i]);
      }
    }

    this.setState({instances: stateInstances});
  }

  render() {
    const { classes } = this.props;
    return (
      <FilterSession onInputChange={this.filterList}/>
      <List
        subheader={
          <ListSubheader color="primary" className={classes.root}>
            Sessions
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
