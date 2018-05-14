import React from 'react';
import { Button } from 'react-md';
import PropTypes from 'prop-types';
import './stylesheets/Component.css';

/**
 * Handles the header placed at the top of the screen displaying things such as
 * logo, username and the name of the game.
 * This class is reused heavily in multiple screens
 */
function SplashScreen(props) {
  return (
    <Button className="mainScreen" onClick={props.buttonPressed} primary raised>
      <div style={{ textTransform: 'initial', fontSize: 35 }}>
        IoT Party <br /> <br /> <div style={{ fontSize: 25 }}>PRESS TO CONTINUE</div>
      </div>
    </Button>
  );
}

SplashScreen.propTypes = {
  buttonPressed: PropTypes.func.isRequired,
};

export default SplashScreen;
