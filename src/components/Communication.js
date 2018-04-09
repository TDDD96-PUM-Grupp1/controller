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
    this.dataBuffer.bnum = [];
    // Creates and logs in a user to the server.
    this.ds = createDeepstream(options.host_ip);
    this.id = this.ds.getUid();
    const { auth } = options;
    auth.username = this.id;
    this.client = this.ds.login(auth, this.onLoggedIn.bind(this));
    this.name = '';
    this.updateSensorData = this.updateSensorData.bind(this);
    this.requestInstances = this.requestInstances.bind(this);
    this.stopRequestInstances = this.stopRequestInstances.bind(this);
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

  /* eslint-disable */
  onLoggedIn(success, data) {}

  /* eslint-enable */

  /*
     * Request the instances that are currently running.
     */
  requestInstances(onInstancesReceived, onPlayerAdded, onInstanceCreated) {
    this.client.rpc.make('services/getInstances', {}, onInstancesReceived);
    this.client.event.subscribe('services/playerAdded', data => {
      onPlayerAdded(data.playerName, data.instanceName);
    });
    this.client.event.subscribe('services/instanceCreated', data => {
      onInstanceCreated(data.name);
    });
  }

  stopRequestInstances() {
    this.client.event.unsubscribe('services/playerAdded');
    this.client.event.unsubscribe('services/instanceCreated');
  }

  /*
     * Join a certain instance with the given name.
     */
  joinInstance(instanceName, name, callback) {
    this.instance = instanceName;
    this.name = name;
    this.client.rpc.make(
      `data/${this.instance}/addPlayer`,
      { id: this.id, name: this.name, sensor: { beta: 0, gamma: 0 } },
      (err, result) => {
        if (!err) {
          this.onJoined(err, result);
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
    this.dataBuffer.id = this.id;
    this.client.event.emit(`data/${this.instance}/${this.id}`, this.dataBuffer);
    this.dataBuffer = {};
    this.dataBuffer.bnum = [];
  }

  /**
   * Notifies the UI that a button has been pressed by the player.
   * @param buttonNumber identifier for which button is being pressed, enumeration starts at 0
   */
  sendButtonPress(buttonNumber) {
    this.dataBuffer.bnum.push(buttonNumber);
  }
}
export default Communication;
