import io from 'socket.io-client';

export default messageHandler =>
  new Promise((resolve) => {
    const socket = io('/', {
      transports: ['websocket'],
      query: { token: localStorage.getItem('jwt_token') },
    });

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('messageReceived', (message) => {
      messageHandler(message);
    });

    socket.on('messagesReceived', (messages) => {
      messageHandler(messages);
    });

    resolve(socket);
  });
