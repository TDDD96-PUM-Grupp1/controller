import React from 'react';
import PropTypes from 'prop-types';
import Session from './Session';

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
    //this.state = { instances: this.props.testSessions};
  }

  componentDidMount() {
    this.updateList();
  }

  onInstancesReceived(err, result) {
    if (!err) {
      this.setState({ instances: result });
    } else {
      // TODO: handle error
    }
  }

  onPlayerAdded(playerName, instanceName) {
    for (let i = 0; i < this.state.instances.length; i += 1) {
      if (this.state.instances[i].name === instanceName) {
        const instances = this.state.instances;
        instances[i].currentlyPlaying += 1;
        this.setState({ instances });
      }
    }
  }

  onInstanceCreated(instanceName) {
    const instances = this.state.instances;

    instances.push({ name: instanceName, currentlyPlaying: 0 });
    this.setState({ instances });
  }

  /**
   * Update the list of active instances */
  updateList() {
    this.props.requestInstances(
      this.onInstancesReceived,
      this.onPlayerAdded,
      this.onInstanceCreated
    );
  }

  render() {
    return (
      <div className="SessionList">
        {this.state.instances.map(session => (
          <div key={session.name}>
            <Session
              sessionObj={session}
              enterSessionWindow={this.props.enterSessionWindow}
              stopRequestInstances={this.props.stopRequestInstances}
            />
          </div>
        ))}
      </div>
    );
  }
}
SessionList.propTypes = {
  enterSessionWindow: PropTypes.func.isRequired,
  testSessions: PropTypes.arrayOf(PropTypes.object),
  requestInstances: PropTypes.func.isRequired,
  stopRequestInstances: PropTypes.func.isRequired
};

export default SessionList;
