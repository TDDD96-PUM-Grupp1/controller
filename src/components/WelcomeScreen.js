import React from 'react';
import logo from '../logo.svg';

/**
 * Handles the header placed at the top of the screen displaying things such as
 * logo, username and the name of the game.
 * This class is reused heavily in multiple screens
 */
class WelcomeScreen extends React.Component {
  render() {
    return (
      <div className="WelcomeScreen">
        <div className="GameName">Ball-E!</div>
        <div className="UserName">Unknown User</div>
        <img className="Logo" src={logo} alt="logo" />
      </div>
    );
  }
}

export default WelcomeScreen;
