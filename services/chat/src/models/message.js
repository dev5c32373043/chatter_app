const mongoose = require('mongoose');

const schema = mongoose.Schema({
  owner: {
    type: String,
    required: [true, 'owner required!']
  },
  body: {
    type: String,
    required: [true, 'body required!']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', schema);
