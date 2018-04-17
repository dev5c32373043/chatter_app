import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { messageFormValidator } from '../../validators/forms';
import Toast from '../Toast';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const { message } = this.state;
    messageFormValidator(message).then((error) => {
      if (error) return this.setState({ error }, this.hideNotification);
      this.props.socket.emit('newMessage', message);
      this.setState({ message: '' });
    });
  }
  onChange(e) {
    const { value } = e.target;
    this.setState({ message: value });
  }
  hideNotification() {
    setTimeout(() => {
      this.setState({ error: '' });
    }, 2000);
  }
  render() {
    const { error, message } = this.state;
    return (
      <form className="message-form" onSubmit={this.onSubmit}>
        {error && <Toast content={error} />}
        <input
          type="text"
          name="message"
          value={message}
          onChange={this.onChange}
          placeholder="enter your message"
          className="form-control flat"
        />
        <button type="submit" className="btn btn-default btn-wide btn-primary">
          Send
        </button>
      </form>
    );
  }
}

MessageForm.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default MessageForm;
