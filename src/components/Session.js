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
 */

const styles = () => {};

class Session extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    if (this.props.sessionObj.currentlyPlaying === undefined) {
      this.props.sessionObj.currentlyPlaying = 0;
    }
    this.props.sessionObj.buttonAmount = 3;
    this.state = { pingTime: '...' };
    const current = Date.now();
    this.props.communication.pingInstance(this.props.sessionObj.name, (data, err) => {
      this.setState({ pingTime: `${Date.now() - current} ms` });
    });
  }

  /**
   * Clicking a session takes you to the detailed screen of said session and also changes the
   * state of the variable keeping track of the amount of buttons each session has.
   */
  handleClick() {
    const buttonAmount = parseInt(Number(this.props.sessionObj.buttonAmount), 10);
    this.props.enterSessionWindow(this.props.sessionName, buttonAmount);
    this.props.communication.stopRequestInstances();
  }

  render() {
    const { classes } = this.props;
    return (
      <ListItem divider className={classes.root} button onClick={this.handleClick}>
        <ListItemText primary={this.props.sessionName} />
        <ListItemText primary={this.props.sessionObj.gamemode} />
        <ListItemText
          primary={`${this.props.sessionObj.currentlyPlaying}/${this.props.sessionObj.maxPlayers}`}
        />
        <ListItemText primary={this.state.pingTime} />
      </ListItem>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Session.propTypes = {
  sessionObj: PropTypes.object.isRequired,
  enterSessionWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  /* eslint-disable */
  communication: PropTypes.object.isRequired,
  /* eslint-enable */
  sessionName: PropTypes.string.isRequired,
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(Session);
