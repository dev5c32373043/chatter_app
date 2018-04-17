const chai = require('chai'),
  expect = chai.expect;

chai.use(require('chai-http'));

exports.chai = chai;
exports.expect = expect;
exports.app = require('../server');
