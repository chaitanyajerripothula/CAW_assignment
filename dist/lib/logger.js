'use strict';

const server = require('./lib/server');
const mongo = require('./lib/mongo');
const secrets = require('./lib/secrets');
const app = {
  init: async function () {
    try {
      const secretData = await secrets.load();
      await server.init(secretData);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
};

app.init();