import createDeepstream from 'deepstream.io-client-js';

class Communication {
  constructor() {
    this.client = createDeepstream('10.90.128.65:60020').login();
    this.getPlayerId = this.getPlayerId.bind(this);
    this.client.rpc.make('data/abc/addPlayer', {}, this.getPlayerId);
  }

  getPlayerId(err, result) {
    this.id = result;
  }

  sendSensorData(beta, gamma) {
    this.client.event.emit(`data/abc/${this.id}`, { beta: beta, gamma: gamma });
  }
}

export default Communication;
