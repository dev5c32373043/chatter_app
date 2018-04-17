const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config')[NODE_ENV];

const schema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    validate: {
      isAsync: true,
      validator: nicknameValidator
    }
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function nicknameValidator(value, next) {
  const nicknameRegex = /^[A-Za-zА-Яа-яЁё ].{3,}/;
  this.model('User').count({ nickname: value }, (error, count) => {
    switch (true) {
      case error:
        next(error);
        break;
      case !!count:
        next(!count, 'User already exists');
        break;
      case !nicknameRegex.test(value):
        next(
          nicknameRegex.test(value),
          'nickname must be greater than or equal 3 characters'
        );
        break;
      default:
        next();
    }
  });
}

schema.statics.generateHash = password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (error, hash) => {
      if (error) reject(error);
      resolve(hash);
    });
  });

schema.methods.comparePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, res) => {
      if (error) reject(error);
      resolve(res);
    });
  });
};

schema.methods.signJWT = function() {
  const payload = { id: this.id, nickname: this.nickname };
  return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};

schema.post('validate', async function(doc, next) {
  if (doc.isNew) {
    doc.password = await this.model('User').generateHash(doc.password);
  }
  next();
});

module.exports = mongoose.model('User', schema);
