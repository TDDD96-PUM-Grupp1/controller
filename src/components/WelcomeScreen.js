import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

const styles = () => ({
  button: {
    width: '100%',
    fontSize: 30,
    height: 500
  }
});

/**
 * Handles the header placed at the top of the screen displaying things such as
 * logo, username and the name of the game.
 * This class is reused heavily in multiple screens
 */
/* eslint-disable react/prefer-stateless-function */
class WelcomeScreen extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        onClick={this.props.buttonPressed}
        color="primary"
        variant="raised"
      >
        <h1>This should be a splashscreen!</h1>
      </Button>
    );
  }
}
/* eslint-disable react/forbid-prop-types */
WelcomeScreen.propTypes = {
  buttonPressed: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(WelcomeScreen);
