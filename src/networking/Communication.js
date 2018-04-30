import createDeepstream from 'deepstream.io-client-js';

class Communication {
  /*
     * Constructor for Communication.
     * This initialized the network communication to the deepstream server.
     * */
  constructor(options) {
    this.instance = '';
    this.dataBuffer = { sensor: { beta: 0, gamma: 0 } };
    this.dataBuffer.bnum = [];
    this.tickrate = options.tickrate;
    this.pingrate = options.pingrate;
    this.serviceName = options.service_name;
    this.currentPing = '-';
    // Creates and logs in a user to the server.
    this.ds = createDeepstream(options.host_ip);
    this.id = this.ds.getUid();
    const { auth } = options;
    auth.username = this.id;
    this.client = this.ds.login(auth, this.onLoggedIn.bind(this));
    this.name = '';
    this.intervalid = 0;
    this.tickTimer = undefined;

    this.shouldFlushData = true;
    this.setPingTime();

    // Bind functions.
    this.updateSensorData = this.updateSensorData.bind(this);
    this.getInstances = this.getInstances.bind(this);
    this.requestInstances = this.requestInstances.bind(this);
    this.stopRequestInstances = this.stopRequestInstances.bind(this);
    this.joinInstance = this.joinInstance.bind(this);
    this.tick = this.tick.bind(this);
    this.pingInstance = this.pingInstance.bind(this);
  }

  /*
   * Callback for the rpc-call when connection to a UI.
   * Will also start an interval that is run every tickrate.
   * @param err This will be undefined if there is no error.
   * @param result contains the id of the client.
  */
  onJoined(err, result) {
    this.id = result;
    this.intervalid = setInterval(this.tick, 1000 / this.tickrate);
  }

  /*
     * Called when the user has tried to login to deepstream.
     * Will be used later for exception handling
    */

  /**
   * Used for error handling in the future.
   */
  // eslint-disable-next-line
  onLoggedIn(success, data) {}

  getInstances(instanceListener) {
    this.client.rpc.make(
      `${this.serviceName}/getInstances`,
      {},
      instanceListener.onInstancesReceived
    );
  }

  /*
   * Request the instances that are currently running.
   * Also start listening for the different instance changes.
   * @param instanceListener listener for the different instance changes.
   */
  requestInstances(instanceListener) {
    this.getInstances(instanceListener);
    this.client.event.subscribe(`${this.serviceName}/playerAdded`, data => {
      instanceListener.onPlayerAdded(data.playerName, data.instanceName);
    });
    this.client.event.subscribe(`${this.serviceName}/playerRemoved`, data => {
      instanceListener.onPlayerRemoved(data.playerName, data.instanceName);
    });
    this.client.event.subscribe(`${this.serviceName}/instanceCreated`, data => {
      instanceListener.onInstanceCreated(data.name, data.maxPlayers, data.gamemode);
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
  joinInstance(instanceName, name, iconID, backgroundColor, iconColor, callback) {
    this.instance = instanceName;
    this.name = name;
    this.iconID = iconID;
    this.iconColor = iconColor;
    this.backgroundColor = backgroundColor;

    this.client.rpc.make(
      `${this.serviceName}/addPlayer/${this.instance}`,
      {
        id: this.id,
        name: this.name,
        iconID: this.iconID,
        backgroundColor: this.backgroundColor,
        iconColor: this.iconColor,
        sensor: { beta: 0, gamma: 0 },
      },
      (err, result) => {
        if (!err) {
          this.onJoined(err, result);
        }
        callback(err, result);
      }
    );
  }

  /**
   * Stops the transmission of ticks to the UI
   */
  stopTick() {
    clearInterval(this.intervalid);
  }

  /*
   * Updates the sensor data, this data will be sent to the UI when
   * flushData is called.
   * @param beta the beta value of the sensor.
   * @param gamma the gamma value of the sensor.
   */
  updateSensorData(beta, gamma) {
    const oldBeta = this.dataBuffer.sensor.beta;
    const oldGamma = this.dataBuffer.sensor.gamma;

    if (beta !== oldBeta || gamma !== oldGamma) {
      this.dataBuffer.sensor = { beta, gamma };
      this.shouldFlushData = true;
    }
  }

  /*
   * Sends all the updated data to the UI. It will send a ping even if no data has been
   * updated. Think of it as a heartbeat.
  */
  tick() {
    const currentTime = Date.now();
    const sendPing = currentTime >= this.pingTime;
    if (sendPing) {
      const self = this;
      this.pingInstance(this.instance, () => {
        self.currentPing = Date.now() - currentTime;
        self.shouldFlushData = true;
      });
      this.setPingTime();
    }
    if (this.shouldFlushData || sendPing) {
      this.dataBuffer.id = this.id;
      this.dataBuffer.ping = this.currentPing;
      this.shouldFlushData = false;
      this.client.event.emit(`${this.serviceName}/data/${this.instance}`, this.dataBuffer);
      this.dataBuffer.bnum = [];
    }
  }

  /*
   * Sends a ping message to the given instance.
   */
  pingInstance(instanceName, pingCallback) {
    this.client.rpc.make(`${this.serviceName}/pingTime/${instanceName}`, {}, pingCallback);
  }

  /**
   * Notifies the UI that a button has been pressed by the player.
   * @param buttonNumber identifier for which button is being pressed, enumeration starts at 0
   */
  sendButtonPress(buttonNumber) {
    this.dataBuffer.bnum.push(buttonNumber);
    this.shouldFlushData = true;
  }

  /**
   * Sets the ping time correctly
   */
  setPingTime() {
    this.pingTime = Date.now() + 1000 * (1 / this.pingrate);
  }
}
export default Communication;
