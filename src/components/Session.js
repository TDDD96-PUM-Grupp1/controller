import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

/**
 * A session of an active game, saves:
 * 1 : Amount of players
 * 2 : Code needed to enter the game
 * 3 : IP, not sure if it should be displayed
 *
 * TODO dont display IP and display the ping instead
 */

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  }
});

class Session extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.props.sessionObj.currentlyPlaying = 1;
    this.props.sessionObj.buttonAmount = 3;
  }

  /**
   * Clicking a session takes you to the detailed screen of said session and also changes the
   * state of the variable keeping track of the amount of buttons each session has.
   */
  handleClick() {
    const buttonAmount = parseInt(Number(this.props.sessionObj.buttonAmount), 10);
    this.props.enterSessionWindow(this.props.sessionObj.name, buttonAmount);
    this.props.stopRequestInstances();
  }

  render() {
    const { classes } = this.props;
    return (
      <ListItem divider className={classes.root} button onClick={this.handleClick}>
        <ListItemText primary="Active Session" />
        <ListItemText primary={this.props.sessionObj.currentlyPlaying} />
        <ListItemText primary={this.props.sessionObj.name} />
        <ListItemText primary={'Buttons used: '.concat(this.props.sessionObj.buttonAmount)} />
      </ListItem>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  enterSessionWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  stopRequestInstances: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(Session);
