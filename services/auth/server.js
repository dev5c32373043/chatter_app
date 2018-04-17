const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const config = require('./config');

global.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4003;

global.Promise = bluebird;

mongoose.Promise = bluebird;

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'pickyDude');
  next();
});

app.use(bodyParser.json());

passport.use(require('./src/strategies/jwt')());
app.use(passport.initialize());

if (NODE_ENV !== 'test') app.use(require('./config/logger')());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config[NODE_ENV].db);
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
  app.use('/auth', require('./src/router'));
  app.listen(PORT, () => console.log(`auth-service listen on ${PORT} port!`));
});

module.exports = app;
