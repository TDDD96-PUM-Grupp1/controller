import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    fontSize: 100,
    backgroundColor: theme.palette.background.paper
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
      <div className={classes.root}>
        <h1>This should be a splashscreen!</h1>
      </div>
    );
  }
}
/* eslint-disable react/forbid-prop-types */
WelcomeScreen.propTypes = {
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(WelcomeScreen);
