import createDeepstream from 'deepstream.io-client-js';

class Communication {
  /*
   * Constructor for Communication.
   * This initialized the network communication to the deepstream server.
   * It will also send an rpc-call to the UI to connect to it.
   *
  */
  constructor(options) {
    this.instance = '';
    this.dataBuffer = {};
    // Creates and logs in a user to the server.
    this.ds = createDeepstream(options.host_ip);
    this.id = this.ds.getUid();
    this.client = this.ds.login({ username: this.id }, this.onLoggedIn.bind(this));
    this.name = '';
    this.updateSensorData = this.updateSensorData.bind(this);
    this.requestInstances = this.requestInstances.bind(this);
    this.joinInstance = this.joinInstance.bind(this);
  }

  /*
   * Callback for the rpc-call when connection to a UI
  */
  onJoined(err, result) {
    this.id = result;
    setInterval(this.flushData.bind(this), 1000 / 128.0);
  }

  /*
   * Called when the user has tried to login to deepstream.
   * Will be used later for exception handling
  */
  /* eslint-disable no-unused-vars, class-methods-use-this */
  onLoggedIn(success, data) {}
  /* eslint-enable no-unused-vars, class-methods-use-this */

  /*
   * Request the instances that are currently running.
   */
  requestInstances(callback) {
    this.client.rpc.make('services/getInstances', {}, callback);
  }

  /*
   * Join a certain instance with the given name.
   */
  joinInstance(instanceName, callback) {
    this.instance = instanceName;
    this.client.rpc.make(
      `data/${this.instance}/addPlayer`,
      { id: this.id, name: this.name, sensor: { beta: 0, gamma: 0 } },
      (err, result) => {
        if (!err) {
          this.onJoined.bind(this);
        }
        callback(err, result);
      }
    );
  }

  /*
   * Updates the sensor data, this data will be sent to the UI when
   * flushData is called.
   */
  updateSensorData(beta, gamma) {
    this.dataBuffer.sensor = { beta, gamma };
  }

  /*
   * Sends all the updated data to the UI. It will not send any data if none has been
   * updated
   *
  */
  flushData() {
    if (this.dataBuffer !== {}) {
      this.dataBuffer.id = this.id;
      this.client.event.emit(`data/${this.instance}/${this.id}`, this.dataBuffer);
      this.dataBuffer = {};
    }
  }
}

export default Communication;
