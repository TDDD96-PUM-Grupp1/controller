import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360
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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handles a submit request by printing current username and then calls the
   * onInputSubmit function passed as a component prop.
   */
  handleSubmit() {
    // Need to use these parameters for the callback.
    /* eslint-disable no-unused-vars */
    this.props.onInputSubmit(this.props.instanceName, this.state.username, (err, result) => {});
    /* eslint-enable no-unused-vars */
  }

  // Set new state on input change.
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
          onClick={this.props.showGameWindow}
        >
          Join
        </Button>
      </div>
    );
  }
}

UsernameInput.defaultProps = {
  onInputSubmit: () => {
    console.log('Username button clicked!');
  }
};

/* eslint-disable react/forbid-prop-types */
UsernameInput.propTypes = {
  onInputSubmit: PropTypes.func,
  showGameWindow: PropTypes.func.isRequired,
  instanceName: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(UsernameInput);
