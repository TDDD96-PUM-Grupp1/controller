class SensorManager {
  constructor(onSensorChange) {
    this.onSensorChange = onSensorChange;

    this.beta = 0;
    this.gamma = 0;

    // Baseline for beta and gamma. Used for calibrating the sensor manually.
    this.betaBase = 0;
    this.gammaBase = 0;

    this.flip = false;
    this.lastBeta = 0;
    this.lastGamma = 0;

    // Functions will be used as callbacks from React components so we bind them
    // to use 'this'.
    this.setSensorValues = this.setSensorValues.bind(this);
    this.getSensorValues = this.getSensorValues.bind(this);
    this.calibrate = this.calibrate.bind(this);
    this.onSensorChange = this.onSensorChange.bind(this);
    this.handleDeviceOrientation = this.handleDeviceOrientation.bind(this);

    this.bindEventListener = this.bindEventListener.bind(this);
    this.unbindEventListener = this.unbindEventListener.bind(this);
    this.calculateOrientation = this.calculateOrientation.bind(this);
  }

  bindEventListener() {
    // Event listener for device orientation
    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  unbindEventListener() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
  }
  /*
   * Calculate the orientation given that the device is flipped or not.
   * @param {beta,gamma} event the current beta, gamma values
   * @return {beta,gamma} calculated beta, gamma values with calibration taken into account.
   */
  calculateOrientation(event) {
    // Margin for when to detect the device flipped
    const flipMargin = 45;
    // See if the gamma value jumped suddenly (device flipped)
    if (this.lastGamma < -flipMargin && event.gamma > flipMargin) {
      this.flip = !this.flip;
    }
    if (this.lastGamma > flipMargin && event.gamma < -flipMargin) {
      this.flip = !this.flip;
    }

    // Update old values
    this.lastBeta = event.beta;
    this.lastGamma = event.gamma;
    let { beta } = event.beta;
    let { gamma } = event.gamma;

    // If it is flipped recalculate beta, gamma
    if (this.flip) {
      beta = -180 - beta;
      gamma = -180 + gamma;
    }
    // Set the values taking the calibration into account.
    beta -= this.betaBase;
    gamma -= this.gammaBase;

    // Check if the degrees are over 180 to get symmetric values.
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

    // Return the values
    return { beta, gamma };
  }

  handleDeviceOrientation(event) {
    const { beta, gamma } = this.calculateOrientation(event);
    this.setSensorValues(beta, gamma);
    this.onSensorChange(this.beta, this.gamma);
  }

  // Sets the correct sensor values base on the calibrated base and current
  // sensor values.
  setSensorValues(beta, gamma) {
    this.beta = Math.floor(beta);
    this.gamma = Math.floor(gamma);
  }

  getSensorValues() {
    return {
      beta: this.beta,
      gamma: this.gamma,
    };
  }

  calibrate() {
    this.betaBase = this.beta + this.betaBase;
    this.gammaBase = this.gamma + this.gammaBase;
  }
}

export default SensorManager;
