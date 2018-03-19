import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The button and text field used to get userinput to sort the sessionslist
 */
class FilterSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * The function called when the filter button is pressed.
   */
  handleSubmit() {
    this.props.onInputSubmit();
  }

  /**
   * This function is called everytime an input is given
   * (IE key pressed by the user) in the filter text field
   */
  handleInputChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <input
          className="FilterText"
          value={this.state.username}
          onChange={this.handleInputChange}
          type="text"
        />
        <button className="FilterButton" onClick={this.handleSubmit}>
          Filter
        </button>
      </div>
    );
  }
}

/**
 * Default behavior of the button onClick function,
 * currently used for debugging.
 */
FilterSession.defaultProps = {
  onInputSubmit: () => {
    console.log('Username button clicked!');
  },
};

FilterSession.propTypes = {
  onInputSubmit: PropTypes.func,
};

export default FilterSession;
