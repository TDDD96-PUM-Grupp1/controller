import createDeepstream from 'deepstream.io-client-js';

class Communication {

  /*
   * Constructor for Communication.
   * This initialized the network communication to the deepstream server.
   * It will also send an rpc-call to the UI to connect to it. 
   * 
  */
  constructor() {
    this.instance = 'abc';
    this.dataBuffer = {};
    this.id = this.client.getUid();
    // Creates and logs in a user to the server.
    this.client = createDeepstream('10.90.128.65:60020').login({username: this.id});
    this.getPlayerId = this.getPlayerId.bind(this);
    this.name = 'something';

    this.client.rpc.make(
      `dataBuffer/${this.instance}/addPlayer`,
      { id: this.id, name: this.name, sensor: { beta: 0, gamma: 0 } },
      this.getPlayerId
    );
  }

  /*
   * Callback for the rpc-call when connection to a UI
  */
  getPlayerId(err, result) {
    this.id = result;
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
    this.client.event.emit(`data/${this.instance}/${this.id}`, this.dataBuffer);
    this.dataBuffer = { id: this.id };
  }


}

export default Communication;
