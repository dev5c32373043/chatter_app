const mongoose = require('mongoose');
const bluebird = require('bluebird');

const jwt = require('jsonwebtoken');

const io = require('socket.io')();
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4002;

mongoose.Promise = bluebird;

io.use((socket, next) => {
  const { token } = socket.handshake.query;
  if (token) {
    return jwt.verify(token, config[NODE_ENV].secretKey, (error, decoded) => {
      if (error) next(new Error(error));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) next(new Error('Not authenticated'));
      socket.user = decoded;
      next();
    });
  }
  next(new Error('Not authenticated'));
});

io.on('connection', socket => require('./src/router')(io, socket));

mongoose.connect(config[NODE_ENV].db);
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  io.attach(PORT, {
    pingInterval: 10000,
    pingTimeout: 5000
  });
  console.log(`chat-service listen on ${PORT} port!`);
});
