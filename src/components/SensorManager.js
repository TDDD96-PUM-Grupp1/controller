class SensorManager {
  constructor(onSensorChange) {
    this.onSensorChange = onSensorChange;

    this.beta = 0;
    this.gamma = 0;

    // Baseline for beta and gamma. Used for calibrating the sensor manually.
    this.betaBase = 0;
    this.gammaBase = 0;

    // Functions will be used as callbacks from React components so we bind them
    // to use 'this'.
    this.setSensorValues = this.setSensorValues.bind(this);
    this.getSensorValues = this.getSensorValues.bind(this);
    this.calibrate = this.calibrate.bind(this);
    this.onSensorChange = this.onSensorChange.bind(this);
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);

    this.bindEventListener = this.bindEventListener.bind(this);
    this.unbindEventListener = this.unbindEventListener.bind(this);
  }

  bindEventListener() {
    // Event listener for device orientation
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  unbindEventListener() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  handleDeviceOrientation(event) {
    const { beta, gamma } = event;
    this.setSensorValues(beta, gamma);
    this.onSensorChange(this.beta, this.gamma);
  }

  // Sets the correct sensor values base on the calibrated base and current
  // sensor values.
  setSensorValues(beta, gamma) {
    this.beta = Math.floor(beta - this.betaBase);
    this.gamma = Math.floor(gamma - this.gammaBase);
  }

  getSensorValues() {
    return {
      beta: this.beta,
      gamma: this.gamma
    };
  }

  calibrate() {
    this.betaBase = this.beta + this.betaBase;
    this.gammaBase = this.gamma + this.gammaBase;
  }
}

export default SensorManager;
