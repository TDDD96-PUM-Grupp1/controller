const MAX_ANGLE = 90;

class KeyboardManager {
  constructor(onSensorChange) {
    this.onSensorChange = onSensorChange.bind(this);

    this.directions = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    this.bindEventListener = this.bindEventListener.bind(this);
    this.unbindEventListener = this.unbindEventListener.bind(this);
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
    this.calcSensorChange = this.calcSensorChange.bind(this);
  }

  bindEventListener() {
    // Event listener for device orientation
    window.addEventListener('keydown', this.handleKeyboardInput);
    window.addEventListener('keyup', this.handleKeyboardInput);
  }

  unbindEventListener() {
    // Make sure to unbind the event listener when component unmounts
    window.removeEventListener('keydown', this.handleKeyboardInput);
    window.removeEventListener('keyup', this.handleKeyboardInput);
  }

  handleKeyboardInput(event) {
    const { key } = event;

    // true if event is keyDown
    const downFlag = event.type === 'keydown';

    if (key === 'w' || key === 'ArrowUp') {
      this.directions.up = downFlag;
    }
    if (key === 's' || key === 'ArrowDown') {
      this.directions.down = downFlag;
    }
    if (key === 'd' || key === 'ArrowRight') {
      this.directions.right = downFlag;
    }
    if (key === 'a' || key === 'ArrowLeft') {
      this.directions.left = downFlag;
    }

    this.calcSensorChange();
  }

  calcSensorChange() {
    let beta = 0;
    let gamma = 0;

    if (this.directions.up) {
      gamma += MAX_ANGLE;
    }
    if (this.directions.down) {
      gamma += -MAX_ANGLE;
    }
    if (this.directions.right) {
      beta += MAX_ANGLE;
    }
    if (this.directions.left) {
      beta += -MAX_ANGLE;
    }

    this.onSensorChange(beta, gamma);
  }
}
export default KeyboardManager;
