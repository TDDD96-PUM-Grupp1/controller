import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';

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
    console.log(`Input is currently: "${this.state.username}"`);
    // Need to use these parameters for the callback.
    /* eslint-disable no-unused-vars */
    this.props.onInputSubmit(this.props.instanceName, (err, result) => {});
    /* eslint-enable no-unused-vars */
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
        <Textfield
          className="usernameInputText"
          value={this.state.username}
          onChange={this.handleInputChange}
          pattern="[A-z0-9]*"
          label="Username..."
          floatingLabel
        >
          {' '}
        </Textfield>
        <Button raised ripple colored className="usernameSubmitButton" onClick={this.handleSubmit}>
          Submit
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

UsernameInput.propTypes = {
  onInputSubmit: PropTypes.func,
  instanceName: PropTypes.string.isRequired
};

export default UsernameInput;
