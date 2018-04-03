const dotenv = require('dotenv');
const fs = require('fs');
const { v4 } = require('node-uuid');

let env = {};

try {
  env = dotenv.parse(fs.readFileSync('.env'));
} catch (err) {
  console.error(`Error read .env file: "${err.message}"`);
}


module.exports = Object.freeze({
  instanceId: v4(),

  redis: {
    host: process.env.REDIS_HOST || env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || env.REDIS_PORT || 6379
  },

  errorsStoreKey: 'onetwotrip_errors',
  topic: 'onetwotrip_message',

  mode: process.argv.includes('getErrors') ? 'errors' : 'normal'
});