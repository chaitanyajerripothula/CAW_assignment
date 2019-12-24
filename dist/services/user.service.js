'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const jwt = require('jsonwebtoken');
const secrets = require('./../lib/secrets');

const getToken = async data => {
  const token = jwt.sign({
    username: data.username
  }, secrets.decode_key, { expiresIn: '1h' });
  return { token };
};
const notFound = async () => {
  return "";
};

exports.getToken = getToken;
exports.notFound = notFound;