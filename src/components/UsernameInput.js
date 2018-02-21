import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    console.log(`Input is currently: "${this.state.username}"`);
    this.props.onInputSubmit();
  }

  // Set new state on input change.
  handleInputChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.username} onChange={this.handleInputChange} type="text" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

UsernameInput.defaultProps = {
  onInputSubmit: () => {
    console.log('Username button clicked!');
  }
};

UsernameInput.propTypes = {
  onInputSubmit: PropTypes.func
};

export default UsernameInput;
