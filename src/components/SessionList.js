import React from 'react';
import Session from './Session';
import UsernameInput from './UsernameInput';
import PropTypes from 'prop-types';

class SessionList extends React.Component {
  constructor(props) {
    super(props);
    console.log('*********TEST**********');
    console.log(props.activeSessions);
    this.displayList = props.activeSessions;
  }

  //TODO Add this function
  updateList() {
    //Get new sessions deepstream socket
    //Change displayList
  }

  //TODO  fix this

  print() {
    console.log(this.props.activeSessions);
  }

  render() {
    return (
      <div>
        {this.displayList.map(session => {
          return (
            <div key={session.code}>
              <Session sessionObj={session} />
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

/*
        <ol>
          <Session sessionObj={this.props.activeSessions[2]} />
          <li>{this.list}</li>
          <li>Tea</li>
          <li>Milk</li>
        </ol>

 */
SessionList.propTypes = {
  activeSessions: PropTypes.array.isRequired
};

/*
SessionList.defaultProps = {
    activeSessions = [{
        currentlyPlaying = 1;

    },{}]
}
*/

export default SessionList;

/*

<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
 */
