const { RedisClient, Multi } = require('redis');
const { promisifyAll } = require('bluebird');
const { EventEmitter } = require('events');
const { v4 } = require('node-uuid');

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

class Worker extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.store = null;
  }

  async init() {
    return new Promise(resolve => {
      this.store = new RedisClient(this.config.redis);
      this.store.once('ready', resolve);
    });
  }

  start() {}

  stop() {}
}

class ErrorsHandler extends Worker {
  async error(message) {
    await this.store.multi().lpushAsync(this.config.errorsStoreKey, );
  }
}

class Listener extends Worker {
  constructor(config) {
    super(config);

    this.received = Math.random() * 100;
  }

  receive(channel, message) {
    if (this.received > 100) this.received = 0;

    console.log(`Received message "${channel}:${message}"`);
    if (this.received++ % 20) {
      return;
    }

    this.emit('error-message', message);
  }

  start() {
    this.store.subscribe(this.config.topic);
    this.store.on('message', this.receive);
  }

  stop() {
    this.store.removeListener('message', this.receive);
    this.store.unsubscribe(this.config.topic);
  }

  async init() {
    return super.init();
    // Init code
  }
}

class Publisher {

}

class Arrlication {
  constructor(config) {
    this.config = config;
    this.store = null;
  }

  get mode() {
    return this.config.mode;
  }

  get id() {
    return this.config.instanceId;
  }
  
  init() {
    
  }

  setMode() {

  }
  
  async initInterface() {
    const client = redis.createClient(this.config.redis);
    return new Promise(resolve => {

    });
  }

  publish() {

  }
  
  listen() {
    
  }
}