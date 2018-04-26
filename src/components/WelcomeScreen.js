import React from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';

/**
 * Handles the header placed at the top of the screen displaying things such as
 * logo, username and the name of the game.
 * This class is reused heavily in multiple screens
 */
/* eslint-disable react/prefer-stateless-function */
class WelcomeScreen extends React.Component {
  render() {
    return (
      <Button className="mainScreen" onClick={this.props.buttonPressed} primary raised>
        This should be a splashscreen!
      </Button>
    );
  }
}
/* eslint-disable react/forbid-prop-types */
WelcomeScreen.propTypes = {
  buttonPressed: PropTypes.func.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default WelcomeScreen;
