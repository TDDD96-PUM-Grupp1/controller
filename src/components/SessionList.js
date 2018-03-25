import React from 'react';
import PropTypes from 'prop-types';
import Session from './Session';

/**
 * eg finding new sessions and removing old
 * The list the sessions live within, responsible for updating the list
 */
class SessionList extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { instances: [] };
    this.state = { instances: this.props.testSessions};
  }

  componentDidMount() {
    this.updateList();
  }

  /**
   * Update the list of active instances
   */
  updateList() {
    this.props.requestInstances((err, result) => {
      if (!err) {
        this.setState({ instances: result });
      } else {
        // TODO: handle error
      }
    });
  }

  render() {
    return (
      <div className="SessionList">
        {this.state.instances.map(session => (
          <div key={session.name}>
            <Session sessionObj={session} enterSessionWindow={this.props.enterSessionWindow} />
          </div>
        ))}
      </div>
    );
  }
}
SessionList.propTypes = {
  testSessions: PropTypes.arrayOf(PropTypes.object),
  requestInstances: PropTypes.func.isRequired,
  enterSessionWindow: PropTypes.func.isRequired
};

export default SessionList;
