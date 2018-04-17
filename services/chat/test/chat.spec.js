const Message = require('../src/models/message');
const jwt = require('jsonwebtoken');

const { secretKey } = require('../config')['test'];
const { expect, io } = require('./');

const socketURL = 'http://localhost:4002';
const options = {
  transports: ['websocket']
};

describe('Chat Api', () => {
  let token = '';
  before(done => {
    token = jwt.sign({ id: 1, nickname: 'someman' }, secretKey, {
      expiresIn: '7d'
    });
    done();
  });
  beforeEach(done => {
    Message.create(
      {
        owner: 'some',
        body: 'test message'
      },
      () => done()
    );
  });
  afterEach(done => {
    Message.remove({}).exec(() => done());
  });
  it('should return error if jwt token not present', done => {
    const client = io.connect(socketURL, options);
    client.on('error', error => {
      expect(error).to.eql('Not authenticated');
      done();
    });
  });

  it('getMessages action should return all messages', done => {
    const client = io.connect(
      socketURL,
      Object.assign({}, options, { query: { token } })
    );
    client.on('connect', () => {
      client.emit('getMessages');
    });
    client.on('messagesReceived', messages => {
      expect(messages)
        .to.be.a('array')
        .and.lengthOf(1);
      done();
    });
  });

  it('newMessage action should broadcast message', done => {
    const firstClientOptions = Object.assign({}, options, { query: { token } });
    const secondClientOptions = Object.assign({}, options, {
      query: {
        token: jwt.sign({ id: 2, nickname: 'someman2' }, secretKey, {
          expiresIn: '7d'
        })
      }
    });
    let messCount = 0;
    const checkMessageDelivery = message => {
      messCount += 1;
      expect(message).to.be.a('object');
      expect(message.owner).to.eql('someman');
      expect(message.body).to.eql('hello world');
      if (messCount === 2) done();
    };
    const client1 = io.connect(socketURL, firstClientOptions);
    const client2 = io.connect(socketURL, secondClientOptions);
    client1.on('connect', () => {
      const message = 'hello world';
      client1.emit('newMessage', message);
    });
    client1.on('messageReceived', checkMessageDelivery);
    client2.on('messageReceived', checkMessageDelivery);
  });
});
