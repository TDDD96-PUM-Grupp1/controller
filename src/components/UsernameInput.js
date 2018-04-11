import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  backButton: {
    width: '100%',
    maxWidth: 360,
    marginTop: 5
  }
});

/**
 * The class responsible to handle the username input through a text field
 * and a button to send it to the server.
 */
class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Is called when the Join button is pressed, callbacks to enterGameWindow in App.js
   * with the argument of what is written in the text field.
   */
  handleSubmit() {
    this.props.showGameWindow(this.state.username);
  }

  /**
   * Set new state on input change.
   */
  handleInputChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.root}
          value={this.state.username}
          onChange={this.handleInputChange}
          placeholder="Enter a name..."
          label="Enter playername"
          margin="normal"
        />
        <Button
          className={classes.root}
          variant="raised"
          color="primary"
          onClick={this.handleSubmit}
        >
          Join
        </Button>
        <Button
          className={classes.backButton}
          variant="raised"
          color="primary"
          onClick={this.props.goBack}
        >
          Back
        </Button>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
UsernameInput.propTypes = {
  showGameWindow: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(UsernameInput);
