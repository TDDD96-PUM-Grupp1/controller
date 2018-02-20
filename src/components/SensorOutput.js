import React, { Component } from 'react';

class SensorOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beta: 0,
      gamma: 0
    };
  }

  componentDidMount() {
    // this.sensorTimer = setInterval(() => this.tick(), 1000);
    window.addEventListener('deviceorientation', (event) => {
      this.setState({
        beta: event.beta || 'N/A',
        gamma: event.gamma || 'N/A'
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.sensorTimer);
  }

  tick(event) {
    this.setState({
      beta: event.beta,
      gamma: event.gamma
    });
  }

  render() {
    return (
      <div>
        <div>Beta: {this.state.beta}</div>
        <div>Gamma: {this.state.gamma}</div>
      </div>
    );
  }
}

export default SensorOutput;
