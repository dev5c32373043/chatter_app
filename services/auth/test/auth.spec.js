const { app, chai, expect } = require('./');
const User = require('../src/models/user');

describe('Auth Api', () => {
  beforeEach(done => {
    User.create({ nickname: 'someman', password: 'qwerty' }, () => done());
  });
  afterEach(done => {
    User.remove({}).exec(() => done());
  });

  it('[POST] /auth/sign_in should return token', done => {
    chai
      .request(app)
      .post('/auth/sign_in')
      .send({ nickname: 'someman', password: 'qwerty' })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('[POST] /auth/sign_in should return unauthorized message', done => {
    chai
      .request(app)
      .post('/auth/sign_in')
      .send({ nickname: 'sometest', password: 'qwerty' })
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors.notification).to.be.equal(
          'wrong nickname or password'
        );
        done();
      });
  });

  it('[POST] /auth/sign_in should return error message', done => {
    chai
      .request(app)
      .post('/auth/sign_in')
      .send({ nickname: 'sometest' })
      .end((error, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.notification).to.be.equal(
          'nickname and password required!'
        );
        done();
      });
  });

  it('[POST] /auth/sign_up should return token', done => {
    chai
      .request(app)
      .post('/auth/sign_up')
      .send({ nickname: 'someman2', password: 'qwerty' })
      .then(res => {
        expect(res).to.have.status(201);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('[POST] /auth/sign_up if user already exists should return error message', done => {
    chai
      .request(app)
      .post('/auth/sign_up')
      .send({ nickname: 'someman', password: 'qwerty' })
      .end((error, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors).to.have.own.property('nickname');
        expect(res.body.errors.nickname.message).to.be.equal(
          'User already exists'
        );
        done();
      });
  });

  it('[POST] /auth/sign_up should return error message', done => {
    chai
      .request(app)
      .post('/auth/sign_up')
      .send({ nickname: 'someman' })
      .end((error, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors.notification).to.be.equal(
          'nickname and password required!'
        );
        done();
      });
  });
});
