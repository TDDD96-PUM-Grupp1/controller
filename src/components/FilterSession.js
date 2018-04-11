import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  button: {
    width: '100%',
    maxWidth: 360,
    fontSize: 30,
    height: 500
  },
  textField: {
    width: '100%'
  }
});

/**
 * The button and text field used to get userinput to sort the sessionslist
 */
class FilterSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * This function is called everytime an input is given
   * (IE key pressed by the user) in the filter text field
   */
  handleInputChange(event) {
    this.setState({
      filter: event.target.value
    });
    this.props.onInputChange(this.state.filter);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleInputChange}
          type="text"
          placeholder="Enter a name..."
          label="Search for a room"
          margin="normal"
        />
      </div>
    );
  }
}

/**
 * Default behavior of the button onClick function,
 * currently used for debugging.
 */
FilterSession.defaultProps = {
  onInputSubmit: () => {}
};

/* eslint-disable react/forbid-prop-types */
FilterSession.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default withStyles(styles)(FilterSession);
