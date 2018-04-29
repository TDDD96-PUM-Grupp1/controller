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
    this.flip = false;
    this.lastBeta = 0;
    this.lastGamma = 0;
    // Make event-based callbacks bind correctly
    this.handleCalibrationClick = this.handleCalibrationClick.bind(this);
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);
    this.calculateOrientation = this.calculateOrientation.bind(this);
  }

  componentDidMount() {
    // Event listener for device orientation
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  componentWillUnmount() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  // This function is explained more indepth in ../SensorManager.js
  calculateOrientation(event) {
    const flipMargin = 45;
    if (this.lastGamma < -flipMargin && event.gamma > flipMargin) {
      this.flip = !this.flip;
    }
    if (this.lastGamma > flipMargin && event.gamma < -flipMargin) {
      this.flip = !this.flip;
    }
    this.lastBeta = event.beta;
    this.lastGamma = event.gamma;
    let { beta } = event.beta;
    let { gamma } = event.gamma;
    if (this.flip) {
      beta = -180 - beta;
      gamma = -180 + gamma;
    }
    beta -= this.state.betaBase;
    gamma -= this.state.gammaBase;
    if (beta > 180) {
      beta -= 360;
    } else if (beta < -180) {
      beta += 360;
    }
    if (gamma > 180) {
      gamma -= 360;
    } else if (gamma < -180) {
      gamma += 360;
    }
    return { beta, gamma };
  }

  // Sets state to device orientation
  handleDeviceOrientation(event) {
    const orientation = this.calculateOrientation(event);
    this.setState({
      beta: orientation.beta - this.state.betaBase || 'N/A',
      gamma: orientation.gamma - this.state.gammaBase || 'N/A',
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
        <div>Flip: {this.flip ? 'true' : 'false'}</div>
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
