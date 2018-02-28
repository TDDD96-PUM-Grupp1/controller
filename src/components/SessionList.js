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
    this.displayList = props.activeSessions;
  }

  // TODO This is where we read the deepstream socket to find game sessions
  updateList() {
    // Step 1: Get new sessions deepstream socket
    // Step 2_ Change displayList
  }

  render() {
    return (
      <div className="SessionList">
        {this.displayList.map(session => {
          return (
            <div key={session.code}>
              <Session sessionObj={session} enterSessionWindow={this.props.enterSessionWindow} />
            </div>
          );
        })}
      </div>
    );
  }
}
SessionList.propTypes = {
  activeSessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  enterSessionWindow: PropTypes.func.isRequired
};

export default SessionList;
