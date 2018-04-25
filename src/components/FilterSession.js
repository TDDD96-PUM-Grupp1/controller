import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-md';

/**
 * The button and text field used to get userinput to sort the sessionslist
 */
class FilterSession extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * This function is called everytime an input is given
   * (IE key pressed by the user) in the filter text field
   */
  handleInputChange(value) {
    this.props.onInputChange(value);
  }

  render() {
    return (
      <div>
        <TextField
          onChange={this.handleInputChange}
          placeholder="Enter a name..."
          label="Search for a room"
          id="1" // required by react-md
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
FilterSession.propTypes = {
  onInputChange: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

export default FilterSession;
