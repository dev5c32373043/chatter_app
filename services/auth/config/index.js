module.exports = {
  development: {
    db: 'mongodb://localhost:27017/chatter_app_auth_development',
    secretKey: '$2a$08$.rzPe58drWFUtVTJxjTRce7y7dlPISkH6Om41.uC.q1xPOmSNb9RO'
  },
  test: {
    db: 'mongodb://localhost:27017/chatter_app_auth_test',
    secretKey: '$2a$08$.rzPe58drWFUtVTJxjTRce7y7dlPISkH6Om41.uC.q1xPOmSNb9RO'
  },
  production: {
    db: process.env.DB_URL,
    secretKey: process.env.SECRET_KEY
  }
};
