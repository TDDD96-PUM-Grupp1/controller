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
    this.getGamemodeInfo = this.getGamemodeInfo.bind(this);
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
      instanceListener.onInstanceCreated(data.name, data.maxPlayers, data.gamemode, data.buttons);
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
    this.client.rpc.make(
      `${this.serviceName}/addPlayer/${instanceName}`,
      {
        id: this.id,
        name,
        iconID,
        backgroundColor,
        iconColor,
        sensor: { beta: 0, gamma: 0 },
      },
      (err, result) => {
        if (!err) {
          // Set values
          this.instance = instanceName;
          this.name = name;
          this.iconID = iconID;
          this.iconColor = iconColor;
          this.backgroundColor = backgroundColor;

          // Start network loop
          this.onJoined(err, result);
        }
        callback(err, result);
      }
    );
  }

  startListeningForInstance(listener) {
    if (this.instance === undefined) {
      // THIS CODE SHOULD NEVER RUN. UNLESS A DEV HAS DONE SOMETHING WRONG
      // THIS FUNCTION CAN ONLY BE CALLED WHEN A USER HAS JOINED AN INSTANCE.
      return;
    }

    const self = this;
    this.client.event.subscribe(`${this.serviceName}/instanceRemoved`, data => {
      if (data.name === self.instance) {
        if (listener !== undefined) {
          listener.onInstancesClosed(data.name);
        }
      }
    });
  }

  requestGameEvents(gameEventListener) {
    this.client.event.subscribe(`${this.serviceName}/resetCooldown/${this.id}`, data => {
      gameEventListener.onCoolDownReset(data.button);
    });
    this.client.event.subscribe(`${this.serviceName}/respawnSignal/${this.id}`, () => {
      gameEventListener.onRespawn();
    });
    this.client.event.subscribe(`${this.serviceName}/deathSignal/${this.id}`, data => {
      gameEventListener.onDeath(data.respawnTime);
    });
  }

  stopRequestGameEvents() {
    this.client.event.unsubscribe(`${this.serviceName}/resetCooldown/${this.id}`);
  }

  /**
   * Stops the transmission of ticks to the UI
   */
  leaveInstance() {
    this.instance = undefined;
    this.client.event.unsubscribe(`${this.serviceName}/instanceRemoved`);
    clearInterval(this.intervalid);
  }

  /*
   * Updates the sensor data, this data will be sent to the UI when
   * flushData is called.
   * @param x the x acceleration value of the sensor.
   * @param y the y acceleration value of the sensor.
   */
  updateSensorData(x, y) {
    const beta = Math.round(y * 90);
    const gamma = Math.round(-x * 90);
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

  getGamemodeInfo(instanceName, onReceived) {
    this.client.rpc.make(`${this.serviceName}/getGamemodeInfo/${instanceName}`, {}, onReceived);
  }
}
export default Communication;
