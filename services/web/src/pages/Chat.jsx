import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Messages from '../components/Messages';
import MessageFrom from '../components/forms/Message';
import Loader from '../components/Loader';

import AuthService from '../services/Auth';
import establishSocketConnect from '../utils/socket';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: {},
      dataReceived: false,
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }
  componentWillMount() {
    establishSocketConnect(this.messageHandler).then((socket) => {
      this.setState({ socket }, () => socket.emit('getMessages'));
    });
  }
  onLogout() {
    const authService = new AuthService();
    authService.setToken(null);
    this.props.history.push('/sign_in');
  }
  messageHandler(data) {
    if (Array.isArray(data)) {
      this.setState({ messages: data, dataReceived: true });
    } else {
      const messages = [...this.state.messages, data];
      this.setState({ messages });
    }
    const messages = document.querySelector('.messages');
    messages.scrollTop = messages.scrollHeight;
  }
  render() {
    const { messages, socket, dataReceived } = this.state;
    if (dataReceived) {
      return (
        <div className="chat">
          <button className="btn btn-embossed btn-primary btn-logout" onClick={this.onLogout}>
            Logout
          </button>
          <Messages messages={messages} />
          <MessageFrom socket={socket} />
        </div>
      );
    }
    return <Loader />;
  }
}

Chat.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Chat;
