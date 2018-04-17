const morgan = require('morgan');
const fs = require('fs');

module.exports = () => {
  if (NODE_ENV === 'production') {
    const LogStream = fs.createWriteStream('./logs/production.log', {
      flags: 'a'
    });
    return morgan('combined', { stream: LogStream });
  } else if (NODE_ENV === 'development') {
    return morgan('dev');
  }
};
