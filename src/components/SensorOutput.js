import React, { Component } from 'react';
import PropType from 'prop-types';

class SensorOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beta: 0,
      gamma: 0,
      betaBase: 0,
      gammaBase: 0,
    };

    // Make event-based callbacks bind correctly
    this.handleCalibrationClick = this.handleCalibrationClick.bind(this);
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);
  }

  componentDidMount() {
    // Event listener for device orientation
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  componentWillUnmount() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  // Sets state to device orientation
  handleDeviceOrientation(event) {
    this.setState({
      beta: event.beta - this.state.betaBase || 'N/A',
      gamma: event.gamma - this.state.gammaBase || 'N/A',
    });
    this.props.onSensorChange(this.state.beta, this.state.gamma);
  }

  // Sets a new baseline for sensors
  handleCalibrationClick() {
    this.setState({
      betaBase: this.state.beta + this.state.betaBase,
      gammaBase: this.state.gamma + this.state.gammaBase,
    });
  }

  render() {
    return (
      <div>
        <div>Beta: {Math.round(this.state.beta)}</div>
        <div>Gamma: {Math.round(this.state.gamma)}</div>
        <div>BetaBase: {Math.round(this.state.betaBase)}</div>
        <div>GammaBase: {Math.round(this.state.gammaBase)}</div>
        <button onClick={this.handleCalibrationClick}>Calibrate</button>
      </div>
    );
  }
}

SensorOutput.defaultProps = {
  onSensorChange: () => {},
};

SensorOutput.propTypes = {
  onSensorChange: PropType.func,
};

export default SensorOutput;
