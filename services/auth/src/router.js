const authRouter = require('express').Router();
const passport = require('passport');
const User = require('./models/user');

const required = res =>
  res
    .status(403)
    .json({ errors: { notification: 'nickname and password required!' } });

const unauthorized = res =>
  res
    .status(401)
    .json({ errors: { notification: 'wrong nickname or password' } });

authRouter.get(
  '/authenticate',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

authRouter.post('/sign_in', (req, res) => {
  const { nickname, password } = req.body;
  if (!nickname || !password) return required(res);
  User.findOne({ nickname: nickname }, (error, user) => {
    if (error) return res.status(500).send(error);
    if (!user) return unauthorized(res);
    user.comparePassword(password).then(valid => {
      if (!valid) return unauthorized(res);
      res.json({ user, token: user.signJWT() });
    });
  });
});

authRouter.post('/sign_up', (req, res) => {
  const { nickname, password } = req.body;
  if (!nickname || !password) return required(res);
  new User({
    nickname,
    password
  }).save((error, user) => {
    if (error) return res.status(403).send(error);
    res.status(201).json({ user, token: user.signJWT() });
  });
});

module.exports = authRouter;
