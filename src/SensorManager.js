import { AngleToVector, AngleBetweenVectors } from './math/Vector';

function getFlippedBeta(beta)
{
  return -180 - beta;
}

function getFlippedGamma(gamma)
{
  return -180 + gamma;
}

class SensorManager {
  constructor(onSensorChange) {
    this.onSensorChange = onSensorChange;

    this.beta = 0;
    this.gamma = 0;

    // Baseline for beta and gamma. Used for calibrating the sensor manually.
    this.betaBase = 0;
    this.gammaBase = 0;

    this.flipped = false;
    this.lastVector = AngleToVector(0, 0);

    // Functions will be used as callbacks from React components so we bind them
    // to use 'this'.
    this.setSensorValues = this.setSensorValues.bind(this);
    this.getSensorValues = this.getSensorValues.bind(this);
    this.getCalibratedValues = this.getCalibratedValues.bind(this);
    this.calibrate = this.calibrate.bind(this);
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
    let { beta, gamma } = event;
    let flippedBeta = getFlippedBeta(beta);
    let flippedGamma = getFlippedGamma(gamma);

    const angleMargin = 45;
    // Angle between the vectors has to be more than angleMargin
    // This is a fail safe since both vectors are very alike at low gammas
    if (Math.abs(event.gamma) > angleMargin) {

      const vector1 = AngleToVector(event.beta, event.gamma);
      const vector2 = AngleToVector(flippedBeta, flippedGamma);
      const angle1 = AngleBetweenVectors(vector1, this.lastVector);
      const angle2 = AngleBetweenVectors(vector2, this.lastVector);

      // If angle2 better represents the last vector use that.
      if (Math.abs(angle1) > Math.abs(angle2)) {
        this.flipped = true;
      } else {
        this.flipped = false;
      }
    }

    if(this.flipped)
    {
      beta = flippedBeta;
      gamma = flippedGamma;
    }
    this.lastVector = AngleToVector(beta, gamma)
    beta -= this.betaBase;
    gamma -= this.gammaBase;
    if (beta < -180) {
      beta += 360;
    } else if (beta > 180) {
      beta -= 360;
    }
    if (gamma < -180) {
      gamma += 360;
    } else if (gamma > 180) {
      gamma -= 360;
    }
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

  getCalibratedValues() {
    return {
      betaBase: this.betaBase,
      gammaBase: this.gammaBase,
    };
  }

  calibrate() {
    this.betaBase = this.beta + this.betaBase;
    this.gammaBase = this.gamma + this.gammaBase;
  }
}

export default SensorManager;
