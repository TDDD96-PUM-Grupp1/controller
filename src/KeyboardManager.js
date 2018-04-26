class KeyboardManager {
  constructor(onSensorChange) {
    this.onSensorChange = onSensorChange;

    this.getSensorValues = this.getSensorValues.bind(this);
    this.setSensorValues = this.setSensorValues.bind(this);
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

    if (key === 'w') {
      this.setSensorValues(0, 90);
    }
    if (key === 's') {
      this.setSensorValues(0, -90);
    }
    if (key === 'a') {
      this.setSensorValues(-90, 0);
    }
    if (key === 'd') {
      this.setSensorValues(90, 0);
    }

    this.onSensorChange(this.beta, this.gamma);
  }

  setSensorValues(beta, gamma) {
    this.beta = beta;
    this.gamma = gamma;
  }

  getSensorValues() {
    return {
      beta: this.beta,
      gamma: this.gamma,
    };
  }
}

export default KeyboardManager;
