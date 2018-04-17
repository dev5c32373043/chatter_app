const Message = require('./models/message');

module.exports = (io, socket) => {
  socket.on('getMessages', () => {
    Message.find({}, 'owner body createdAt', (error, messages) => {
      if (error) return socket.emit('error', error);
      socket.emit('messagesReceived', messages);
    });
  });

  socket.on('newMessage', message => {
    Message.create(
      {
        owner: socket.user.nickname,
        body: message
      },
      (error, mess) => {
        if (error) return socket.emit('error', error);
        io.emit('messageReceived', mess);
      }
    );
  });
};
