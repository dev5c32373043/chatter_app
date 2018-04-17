const chai = require('chai'),
  expect = chai.expect,
  io = require('socket.io-client');

process.env.NODE_ENV = 'test';

require('../server');

exports.chai = chai;
exports.expect = expect;
exports.io = io;
