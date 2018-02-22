import createDeepstream from 'deepstream.io-client-js';

class Communication {
  /*
   * Constructor for Communication.
   * This initialized the network communication to the deepstream server.
   * It will also send an rpc-call to the UI to connect to it.
   *
  */
  constructor(name) {
    this.instance = 'abc';
    this.dataBuffer = {};
    // Creates and logs in a user to the server.
    this.ds = createDeepstream('10.90.128.65:60020');
    this.id = this.ds.getUid();
    this.client = this.ds.login({ username: this.id }, this.onLoggedIn.bind(this));
    this.name = name || 'something';
    setInterval(this.flushData.bind(this), 1000 / 128.0);
  }

  /*
   * Callback for the rpc-call when connection to a UI
  */
  getPlayerId(err, result) {
    this.id = result;
  }

  onLoggedIn(success, data) {
    if (success) {
      this.client.rpc.make(
        `data/${this.instance}/addPlayer`,
        { id: this.id, name: this.name, sensor: { beta: 0, gamma: 0 } },
        this.getPlayerId.bind(this)
      );
    }
  }

  /*
   * Updates the sensor data, this data will be sent to the UI when
   * flushData is called.
   */
  updateSensorData(beta, gamma) {
    this.dataBuffer.sensor = { beta: beta, gamma: gamma };
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
