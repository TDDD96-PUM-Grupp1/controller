const ANGLE_CHANGE = 10;

class KeyboardManager {
  constructor(onSensorChange) {
    this.onSensorChange = onSensorChange;

    this.getSensorValues = this.getSensorValues.bind(this);
    this.changeSensorValues = this.changeSensorValues.bind(this);
    this.onSensorChange = this.onSensorChange.bind(this);

    this.bindEventListener = this.bindEventListener.bind(this);
    this.unbindEventListener = this.unbindEventListener.bind(this);
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  bindEventListener() {
    // Event listener for device orientation
    window.addEventListener('keypress', this.handleKeyboardInput);
  }

  unbindEventListener() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('keypress', this.handleKeyboardInput);
  }

  handleKeyboardInput(event) {
    const { key } = event;

    console.log("KEY");

    if (key === 'w') {
      this.changeSensorValues(0, ANGLE_CHANGE);
    }
    if (key === 's') {
      this.changeSensorValues(0, -ANGLE_CHANGE);
    }
    if (key === 'a') {
      this.changeSensorValues(-ANGLE_CHANGE, 0);
    }
    if (key === 'd') {
      this.changeSensorValues(ANGLE_CHANGE, 0);
    }

    //this.onSensorChange(this.beta, this.gamma);
  }

  changeSensorValues(beta, gamma) {
    this.beta += beta;
    this.gamma += gamma;
  }

  getSensorValues() {
    return {
      beta: this.beta,
      gamma: this.gamma,
    };
  }
}

export default KeyboardManager;
