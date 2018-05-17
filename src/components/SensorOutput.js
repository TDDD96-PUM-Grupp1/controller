import React, { Component } from 'react';
import SensorManager from '../SensorManager';

class SensorOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      z: 0,
    };

    // Make event-based callbacks bind correctly
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this);

    this.sensorManager = new SensorManager(this.handleDeviceMotion);
  }

  componentDidMount() {
    this.sensorManager.bindEventListener();
  }

  componentWillUnmount() {
    this.sensorManager.unbindEventListener();
  }

  // Sets state to device orientation
  handleDeviceMotion(x, y, z) {
    this.setState({
      x,
      y,
      z,
    });
  }

  render() {
    const { x, y } = this.state;
    const beta = Math.round(y * 90);
    const gamma = Math.round(-x * 90);
    return (
      <div>
        <div>accelerationX: {Math.round(this.state.x * 100) / 100}</div>
        <div>accelerationY: {Math.round(this.state.y * 100) / 100}</div>
        <div>accelerationZ: {Math.round(this.state.z * 100) / 100}</div>
        <div>beta: {beta}</div>
        <div>gamma: {gamma}</div>
        <div>
          accelerationCalX: {Math.round(this.sensorManager.getCalibratedValues().x * 100) / 100}
        </div>
        <div>
          accelerationCalY: {Math.round(this.sensorManager.getCalibratedValues().y * 100) / 100}
        </div>
        <div>
          accelerationCalZ: {Math.round(this.sensorManager.getCalibratedValues().z * 100) / 100}
        </div>
        <button onClick={this.sensorManager.calibrate}>Calibrate</button>
      </div>
    );
  }
}

export default SensorOutput;
