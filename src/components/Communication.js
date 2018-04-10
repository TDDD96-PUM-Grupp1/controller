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
    this.tickrate = options.tickrate;
    this.serviceName = options.service_name;
    // Creates and logs in a user to the server.
    this.ds = createDeepstream(options.host_ip);
    this.id = this.ds.getUid();
    const { auth } = options;
    auth.username = this.id;
    this.client = this.ds.login(auth, this.onLoggedIn.bind(this));
    this.name = '';

    // Bind functions.
    this.updateSensorData = this.updateSensorData.bind(this);
    this.requestInstances = this.requestInstances.bind(this);
    this.stopRequestInstances = this.stopRequestInstances.bind(this);
    this.joinInstance = this.joinInstance.bind(this);
    this.tick = this.tick.bind(this);
  }

  /*
   * Callback for the rpc-call when connection to a UI.
   * Will also start an interval that is run every tickrate.
   * @param err This will be undefined if there is no error.
   * @param result contains the id of the client.
  */
  onJoined(err, result) {
    this.id = result;
    setInterval(this.tick.bind(this), 1000 / 128.0);
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
   * Also start listening for the different instance changes.
   * @param instanceListener listener for the different instance changes.
   */
  requestInstances(instanceListener) {
    this.client.rpc.make(
      `${this.serviceName}/getInstances`,
      {},
      instanceListener.onInstancesReceived
    );
    this.client.event.subscribe(`${this.serviceName}/playerAdded`, data => {
      instanceListener.onPlayerAdded(data.playerName, data.instanceName);
    });
    this.client.event.subscribe(`${this.serviceName}/playerRemoved`, data => {
      instanceListener.onPlayerRemoved(data.playerName, data.instanceName);
    });
    this.client.event.subscribe(`${this.serviceName}/instanceCreated`, data => {
      instanceListener.onInstanceCreated(data.name);
    });
    this.client.event.subscribe(`${this.serviceName}/instanceRemoved`, data => {
      instanceListener.onInstanceRemoved(data.name);
    });
  }

  /*
   * Stop listening for instance changes.
   */
  stopRequestInstances() {
    this.client.event.unsubscribe(`${this.serviceName}/playerAdded`);
    this.client.event.unsubscribe(`${this.serviceName}/playerRemoved`);
    this.client.event.unsubscribe(`${this.serviceName}/instanceCreated`);
    this.client.event.unsubscribe(`${this.serviceName}/instanceRemoved`);
  }

  /*
   * Join a certain instance with the given name.
   * @param instanceName name of the instance that the user connects to.
   * @param name The name of the player.
   * @param callback will get called when the user has connected to the instance.
   */
  joinInstance(instanceName, name, callback) {
    this.instance = instanceName;
    this.name = name;
    this.client.rpc.make(
      `${this.serviceName}/addPlayer/${this.instance}`,
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
   * @param beta the beta value of the sensor.
   * @param gamma the gamma value of the sensor.
   */
  updateSensorData(beta, gamma) {
    console.log('UPDATESENSOR DATA');
    this.dataBuffer.sensor = { beta, gamma };
  }

  /*
   * Sends all the updated data to the UI. It will not send any data if none has been
   * updated
  */
  tick() {
    this.dataBuffer.id = this.id;
    this.client.event.emit(`${this.serviceName}/data/${this.instance}`, this.dataBuffer);
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
