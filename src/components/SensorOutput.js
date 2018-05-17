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
    const {x,y,z} = this.state;
    let beta = 180*y;
    const gamma = -180*z;
    return (
      <div>
        <div>accelerationX: {Math.round(this.state.x * 100) / 100}</div>
        <div>accelerationY: {Math.round(this.state.y * 100) / 100}</div>
        <div>accelerationZ: {Math.round(this.state.z * 100) / 100}</div>
        <div>beta: {Math.round(beta)}</div>
        <div>gamma: {Math.round(gamma)}</div>
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
