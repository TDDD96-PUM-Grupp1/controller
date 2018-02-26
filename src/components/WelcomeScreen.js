import React from 'react';
import logo from '../images/unicorn-ball.jpg';

/**
 * Handles all information above the SessionsList, eg the WelcomeText
 * logotype of the game and such.
 */
class WelcomeScreen extends React.Component {
  render() {
    return (
      <div className="WelcomeScreen">
        <div className="GameName">Ball-E!</div>
        <div className="UserName">Unknown User</div>
        <img className="Logo" src={logo} />
      </div>
    );
  }
}

export default WelcomeScreen;
