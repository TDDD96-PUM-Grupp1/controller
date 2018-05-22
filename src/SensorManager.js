import { normalize, rotateVector } from './math/Vector';

class SensorManager {
  constructor(onAccelerationChange) {
    this.onAccelerationChange = onAccelerationChange;

    this.acceleration = { x: 0, y: 0, z: 0 };
    this.accelerationRaw = { x: 0, y: 0, z: 0 };
    this.accelerationCal = { x: 0, y: 0, z: 1 };

    // Functions will be used as callbacks from React components so we bind them
    // to use 'this'.
    this.getCalibratedValues = this.getCalibratedValues.bind(this);
    this.calibrate = this.calibrate.bind(this);
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this);

    this.bindEventListener = this.bindEventListener.bind(this);
    this.unbindEventListener = this.unbindEventListener.bind(this);
  }

  bindEventListener() {
    // Event listener for device orientation
    window.addEventListener('devicemotion', this.handleDeviceMotion);
  }

  unbindEventListener() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('devicemotion', this.handleDeviceMotion);
  }

  /*
   * Determains if the device is flipped or not if the device supports
   * acceleration.
   * @param DeviceMotionEvent event - The event of the device motion
   */
  handleDeviceMotion(event) {
    // Determain if the device is upside down or not.
    this.accelerationRaw = normalize(event.accelerationIncludingGravity);
    this.acceleration = rotateVector(this.accelerationRaw, this.accelerationCal);
    this.onAccelerationChange(this.acceleration.x, this.acceleration.y, this.acceleration.z);
  }

  getAccelerationValues() {
    return {
      x: this.acceleration.x,
      y: this.acceleration.y,
      z: this.acceleration.z,
    };
  }

  getCalibratedValues() {
    return {
      x: this.accelerationCal.x,
      y: this.accelerationCal.y,
      z: this.accelerationCal.z,
    };
  }

  calibrate() {
    this.accelerationCal = this.accelerationRaw;
  }
}

export default SensorManager;
