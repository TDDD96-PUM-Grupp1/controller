import React from 'react';
import Session from './Session';

class SessionList extends React.Component {
  constructor(props) {
    super(props);
    this.list = [];

    var ses1 = Session.constructor();

    ses1.foo();
  }

  updateList() {
    //Check how many active session exists
    //For every session which is not in the list add in the list
    //For every session in the list not found in update, remove from list
  }

  //TODO  fix this
  addSession(session) {}

  render() {
    return (
      <div>
        <ol>
          <li>{this.list}</li>
          <li>Tea</li>
          <li>Milk</li>
        </ol>
      </div>
    );
  }
}

SessionList.defaultProps = {
    activeSessions = [{
        currentlyPlaying = 1;

    },{}]
}

export default SessionList;

/*

<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
 */
