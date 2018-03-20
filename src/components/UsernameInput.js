import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UsernameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      instanceName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInstanceChange = this.handleInstanceChange.bind(this);
  }

  /**
   * Handles a submit request by printing current username and then calls the
   * onInputSubmit function passed as a component prop.
   */
  handleSubmit() {
    console.log(`Input is currently: "${this.state.username}"`);
    this.props.onInputSubmit(this.state);
  }

  // Set new state on input change.
  handleInputChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleInstanceChange(event) {
    this.setState({
      instanceName: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Username</h1>
        <input value={this.state.username} onChange={this.handleInputChange} type="text" />
        <h1>Instance Name</h1>
        <input value={this.state.instanceName} onChange={this.handleInstanceChange} type="text" />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

UsernameInput.defaultProps = {
  onInputSubmit: () => {
    console.log('Username button clicked!');
  },
};

UsernameInput.propTypes = {
  onInputSubmit: PropTypes.func,
};

export default UsernameInput;
