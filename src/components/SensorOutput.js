import React, { Component } from 'react';
import SensorManager from '../SensorManager';

class SensorOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beta: 0,
      gamma: 0,
    };

    // Make event-based callbacks bind correctly
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);

    this.sensorManager = new SensorManager(this.handleDeviceOrientation);
  }

  componentDidMount() {
    this.sensorManager.bindEventListener();
  }

  componentWillUnmount() {
    this.sensorManager.unbindEventListener();
  }

  // Sets state to device orientation
  handleDeviceOrientation(beta, gamma) {
    this.setState({
      beta,
      gamma,
    });
  }

  render() {
    const { betaBase, gammaBase } = this.sensorManager.getCalibratedValues();
    return (
      <div>
        <div>Beta: {Math.round(this.state.beta)}</div>
        <div>Gamma: {Math.round(this.state.gamma)}</div>
        <div>BetaBase: {Math.round(betaBase)}</div>
        <div>GammaBase: {Math.round(gammaBase)}</div>
        <button onClick={this.sensorManager.calibrate}>Calibrate</button>
      </div>
    );
  }
}

export default SensorOutput;
